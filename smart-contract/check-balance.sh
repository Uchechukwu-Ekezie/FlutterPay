#!/bin/bash

# Check wallet balance on Arbitrum Sepolia

set -e

# Source the .env file
if [ -f .env ]; then
    source .env
else
    echo "❌ .env file not found!"
    exit 1
fi

# Extract address from private key using cast
if command -v cast &> /dev/null; then
    ADDRESS=$(cast wallet address --private-key "$PRIVATE_KEY")
    echo "🔍 Checking balance for: $ADDRESS"
    echo ""
    
    # Check balance
    BALANCE=$(cast balance "$ADDRESS" --rpc-url "https://sepolia-rollup.arbitrum.io/rpc")
    
    echo "💰 Balance: $BALANCE wei"
    
    # Convert to ETH
    BALANCE_ETH=$(cast to-unit "$BALANCE" ether)
    echo "💰 Balance: $BALANCE_ETH ETH"
    echo ""
    
    # Check if sufficient
    if (( $(echo "$BALANCE > 143475602427921" | bc -l) )); then
        echo "✅ Sufficient balance for deployment!"
    else
        echo "❌ Insufficient balance. Need at least 0.000143 ETH"
        echo ""
        echo "Get testnet funds from:"
        echo "  https://faucet.quicknode.com/arbitrum/sepolia"
    fi
else
    echo "⚠️  'cast' command not found. Install foundry to check balance."
    echo "Your address: 0xCcad7cEe6F98729EAD546fE8dC8a9B77d458F42b"
fi
