# StreamPay Contract Deployment Guide

This guide will help you deploy the SubscriptionEscrow Stylus contract to Arbitrum.

## Prerequisites

✅ All tools are installed:
- Rust & Cargo
- cargo-stylus (v0.6.3)
- Foundry (cast)

## Network Options

### 1. Arbitrum Sepolia (Testnet) - Recommended for Testing
- **RPC URL**: https://sepolia-rollup.arbitrum.io/rpc
- **Chain ID**: 421614
- **Explorer**: https://sepolia.arbiscan.io
- **Faucet**: https://faucet.quicknode.com/arbitrum/sepolia

### 2. Arbitrum One (Mainnet)
- **RPC URL**: https://arb1.arbitrum.io/rpc
- **Chain ID**: 42161
- **Explorer**: https://arbiscan.io
- **Note**: Real ETH required

## Pre-Deployment Steps

### 1. Get Test ETH (for Sepolia)
Visit the faucet to get test ETH on Arbitrum Sepolia:
- https://faucet.quicknode.com/arbitrum/sepolia
- You'll need ETH to pay for deployment gas fees

### 2. Prepare Your Private Key
- Export your private key from MetaMask or your wallet
- **IMPORTANT**: Never commit your private key to git
- Keep it secure and never share it

### 3. Check Contract Compilation
```bash
cd smart-contract
cargo stylus check --endpoint=https://sepolia-rollup.arbitrum.io/rpc
```

## Deployment Commands

### Deploy to Arbitrum Sepolia (Testnet)
```bash
cd smart-contract
chmod +x deploy.sh
./deploy.sh YOUR_PRIVATE_KEY sepolia
```

### Deploy to Arbitrum One (Mainnet)
```bash
cd smart-contract
chmod +x deploy.sh
./deploy.sh YOUR_PRIVATE_KEY mainnet
```

## Alternative: Manual Deployment

If you prefer to deploy manually:

### Step 1: Compile and Check
```bash
cd smart-contract
cargo stylus check --endpoint=https://sepolia-rollup.arbitrum.io/rpc
```

### Step 2: Deploy
```bash
cargo stylus deploy \
  --endpoint=https://sepolia-rollup.arbitrum.io/rpc \
  --private-key=YOUR_PRIVATE_KEY \
  --no-verify
```

### Step 3: Export ABI
```bash
cargo stylus export-abi > abi.json
```

### Step 4: Initialize Contract
```bash
# Replace CONTRACT_ADDRESS with the deployed address
cast send CONTRACT_ADDRESS "initialize()" \
  --private-key YOUR_PRIVATE_KEY \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc
```

## Post-Deployment Steps

### 1. Update Frontend Configuration
Update `src/contracts/contractconfig.ts` with your new contract address:
```typescript
export const CONTRACT_ADDRESS = "0xYourNewContractAddress";
```

### 2. Update Subgraph Configuration
Update `subgraph/subgraph.yaml` with the new contract address and start block.

### 3. Test Contract Functions
```bash
# Test provider registration
cast send CONTRACT_ADDRESS "register_provider(string)" "My Service" \
  --private-key YOUR_PRIVATE_KEY \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc

# Check if registered
cast call CONTRACT_ADDRESS "is_registered_provider(address)" YOUR_ADDRESS \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc
```

### 4. Deploy Subgraph
Follow the instructions in `subgraph/DEPLOYMENT.md` to deploy your subgraph for analytics.

## Verification

After deployment, you can verify your contract on the explorer:
- Sepolia: https://sepolia.arbiscan.io/address/YOUR_CONTRACT_ADDRESS
- Mainnet: https://arbiscan.io/address/YOUR_CONTRACT_ADDRESS

## Common Issues

### Issue: "insufficient funds"
- Make sure you have enough ETH in your wallet for gas fees
- For Sepolia, get test ETH from the faucet

### Issue: "contract too large"
- The contract is optimized for size in Cargo.toml
- If issues persist, check the build configuration

### Issue: "initialization failed"
- Make sure you're using the correct contract address
- Verify the contract was deployed successfully
- Check that initialize() hasn't been called already

## Cost Estimates

### Arbitrum Sepolia (Testnet)
- Deployment: ~0.001 ETH (free test ETH)
- Initialization: ~0.0001 ETH

### Arbitrum One (Mainnet)
- Deployment: ~0.002-0.005 ETH (varies with gas prices)
- Initialization: ~0.0002 ETH

## Security Reminders

⚠️ **IMPORTANT**:
1. Never commit private keys to version control
2. Use environment variables or secure key management
3. Test thoroughly on Sepolia before deploying to mainnet
4. Consider using a hardware wallet for mainnet deployments
5. Audit your contract before mainnet deployment

## Support

If you encounter issues:
1. Check the error messages carefully
2. Verify your RPC endpoint is accessible
3. Ensure you have sufficient ETH for gas
4. Review the Stylus documentation: https://docs.arbitrum.io/stylus

## Next Steps After Successful Deployment

1. ✅ Copy the contract address
2. ✅ Update frontend configuration
3. ✅ Update subgraph configuration
4. ✅ Test all contract functions
5. ✅ Deploy subgraph
6. ✅ Test frontend integration
7. ✅ Monitor contract on explorer
