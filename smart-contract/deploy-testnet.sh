#!/bin/bash

# Deploy to Arbitrum Sepolia Testnet
# Make sure you have set up your .env file first!

set -e  # Exit on error

echo "🚀 Deploying to Arbitrum Sepolia Testnet..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy .env.example to .env and add your private key:"
    echo "  cp .env.example .env"
    echo "  nano .env  # Edit and add your private key"
    exit 1
fi

# Source the .env file
source .env

# Check if private key is set
if [ -z "$PRIVATE_KEY" ] || [ "$PRIVATE_KEY" = "your_private_key_here" ]; then
    echo "❌ Error: PRIVATE_KEY not set in .env file!"
    echo "Please add your private key to the .env file"
    exit 1
fi

# Network settings
RPC_URL="https://sepolia-rollup.arbitrum.io/rpc"
NETWORK_NAME="Arbitrum Sepolia"

echo "📋 Deployment Details:"
echo "  Network: $NETWORK_NAME"
echo "  RPC: $RPC_URL"
echo ""

# Check contract size first
echo "🔍 Checking contract..."
cargo stylus check --endpoint="$RPC_URL"
echo ""

# Deploy the contract
echo "🚢 Deploying contract..."
cargo stylus deploy \
    --private-key="$PRIVATE_KEY" \
    --endpoint="$RPC_URL"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Save the contract address from above"
echo "  2. Activate the contract (if needed)"
echo "  3. Verify on Arbiscan: https://sepolia.arbiscan.io/"
echo ""
echo "💡 To check your contract balance:"
echo "   cargo stylus check --endpoint=$RPC_URL"
