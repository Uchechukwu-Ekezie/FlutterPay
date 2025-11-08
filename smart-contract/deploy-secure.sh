#!/bin/bash

# Secure Deployment Script using .env file
# This prevents exposing private keys in command history

set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found"
    echo "Create a .env file with:"
    echo "PRIVATE_KEY=your_private_key_here"
    echo "NETWORK=sepolia"
    exit 1
fi

# Check if private key is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ PRIVATE_KEY not set in .env file"
    exit 1
fi

# Default to sepolia if not specified
NETWORK_TYPE=${NETWORK:-sepolia}

if [ "$NETWORK_TYPE" = "mainnet" ]; then
    NETWORK_URL="https://arb1.arbitrum.io/rpc"
    CHAIN_ID=42161
    EXPLORER="https://arbiscan.io"
    echo "⚠️  WARNING: Deploying to MAINNET with real ETH!"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        echo "Deployment cancelled"
        exit 0
    fi
elif [ "$NETWORK_TYPE" = "sepolia" ]; then
    NETWORK_URL="https://sepolia-rollup.arbitrum.io/rpc"
    CHAIN_ID=421614
    EXPLORER="https://sepolia.arbiscan.io"
else
    echo "❌ Invalid NETWORK in .env. Use 'sepolia' or 'mainnet'"
    exit 1
fi

echo "🚀 Deploying StreamPay to Arbitrum $NETWORK_TYPE"
echo "📍 Network: $NETWORK_URL"
echo "🆔 Chain ID: $CHAIN_ID"
echo ""

# Check contract
echo "🔍 Checking contract..."
cargo stylus check --endpoint=$NETWORK_URL

if [ $? -ne 0 ]; then
    echo "❌ Contract check failed"
    exit 1
fi

echo "✅ Contract check passed"
echo ""

# Deploy
echo "🚀 Deploying contract..."
DEPLOY_OUTPUT=$(cargo stylus deploy \
    --endpoint=$NETWORK_URL \
    --private-key=$PRIVATE_KEY \
    --no-verify 2>&1)

if [ $? -eq 0 ]; then
    CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -o '0x[a-fA-F0-9]\{40\}' | head -1)
    
    if [ -z "$CONTRACT_ADDRESS" ]; then
        echo "❌ Could not extract contract address"
        echo "$DEPLOY_OUTPUT"
        exit 1
    fi
    
    echo "✅ Contract deployed!"
    echo "📍 Address: $CONTRACT_ADDRESS"
    echo "🔍 Explorer: $EXPLORER/address/$CONTRACT_ADDRESS"
    echo ""
    
    # Export ABI
    echo "📄 Exporting ABI..."
    cargo stylus export-abi > abi.json
    echo "✅ ABI saved to abi.json"
    echo ""
    
    # Initialize contract
    echo "🔧 Initializing contract..."
    cast send $CONTRACT_ADDRESS "initialize()" \
        --private-key $PRIVATE_KEY \
        --rpc-url $NETWORK_URL
    
    if [ $? -eq 0 ]; then
        echo "✅ Contract initialized!"
        echo ""
        echo "🎉 Deployment Complete!"
        echo ""
        echo "📋 Contract Details:"
        echo "  Address: $CONTRACT_ADDRESS"
        echo "  Network: Arbitrum $NETWORK_TYPE"
        echo "  Chain ID: $CHAIN_ID"
        echo "  Explorer: $EXPLORER/address/$CONTRACT_ADDRESS"
        echo "  ABI: abi.json"
        echo ""
        echo "📝 Next Steps:"
        echo "1. Update src/contracts/contractconfig.ts with address: $CONTRACT_ADDRESS"
        echo "2. Update subgraph/subgraph.yaml with new contract address"
        echo "3. Test contract functions"
        echo "4. Deploy subgraph"
        echo ""
        
        # Save deployment info
        cat > deployment-info.json <<EOF
{
  "contractAddress": "$CONTRACT_ADDRESS",
  "network": "$NETWORK_TYPE",
  "chainId": $CHAIN_ID,
  "explorer": "$EXPLORER/address/$CONTRACT_ADDRESS",
  "deployedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
        echo "💾 Deployment info saved to deployment-info.json"
        
    else
        echo "❌ Contract initialization failed"
        exit 1
    fi
else
    echo "❌ Contract deployment failed"
    echo "$DEPLOY_OUTPUT"
    exit 1
fi
