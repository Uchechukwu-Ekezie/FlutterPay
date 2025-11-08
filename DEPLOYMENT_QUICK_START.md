# 🚀 Quick Start: Deploy StreamPay to Arbitrum

## ✅ Prerequisites Verified
- ✅ Rust & Cargo installed
- ✅ cargo-stylus v0.6.3 installed
- ✅ Foundry (cast) installed
- ✅ Contract compiled successfully (23.7 KiB)

## 📋 Deployment Checklist

### 1. Get Testnet ETH (Required)
You need ~0.001 ETH on Arbitrum Sepolia for deployment.

**Get free test ETH:**
- Visit: https://faucet.quicknode.com/arbitrum/sepolia
- Or: https://www.alchemy.com/faucets/arbitrum-sepolia

### 2. Export Your Private Key
From MetaMask:
1. Click the three dots menu
2. Select "Account details"
3. Click "Show private key"
4. Enter your password
5. Copy the private key

⚠️ **NEVER share your private key or commit it to git!**

### 3. Deploy to Arbitrum Sepolia

**Option A: Using the deployment script (Recommended)**
```bash
cd smart-contract
chmod +x deploy.sh
./deploy.sh YOUR_PRIVATE_KEY sepolia
```

**Option B: Manual deployment**
```bash
cd smart-contract

# Deploy
cargo stylus deploy \
  --endpoint=https://sepolia-rollup.arbitrum.io/rpc \
  --private-key=YOUR_PRIVATE_KEY

# The output will show your contract address
# Copy it and initialize:

cast send YOUR_CONTRACT_ADDRESS "initialize()" \
  --private-key YOUR_PRIVATE_KEY \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc
```

### 4. Export ABI
```bash
cd smart-contract
cargo stylus export-abi > abi.json
```

## 📍 After Deployment

Once deployed, you'll receive a contract address like: `0x1234...5678`

### Update Frontend Configuration
Edit `src/contracts/contractconfig.ts`:
```typescript
export const CONTRACT_ADDRESS = "0xYourNewAddress";
export const CHAIN_ID = 421614; // Arbitrum Sepolia
```

### Test Your Contract
```bash
# Test provider registration
cast send YOUR_CONTRACT_ADDRESS \
  "register_provider(string)" "My Service Name" \
  --private-key YOUR_PRIVATE_KEY \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc

# Verify registration
cast call YOUR_CONTRACT_ADDRESS \
  "is_registered_provider(address)" YOUR_WALLET_ADDRESS \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc
```

## 🌐 Network Information

### Arbitrum Sepolia (Testnet)
- **RPC**: https://sepolia-rollup.arbitrum.io/rpc
- **Chain ID**: 421614
- **Explorer**: https://sepolia.arbiscan.io
- **Currency**: ETH (testnet)

### Arbitrum One (Mainnet) - For Production
- **RPC**: https://arb1.arbitrum.io/rpc
- **Chain ID**: 42161
- **Explorer**: https://arbiscan.io
- **Currency**: ETH (real)

## 💰 Cost Estimates

### Arbitrum Sepolia (Testnet)
- Deployment: ~0.000144 ETH (free from faucet)
- Initialization: ~0.0001 ETH
- **Total**: ~0.00025 ETH

### Arbitrum One (Mainnet)
- Deployment: ~0.002-0.005 ETH
- Initialization: ~0.0002 ETH
- **Note**: Always test on Sepolia first!

## ❓ Troubleshooting

### "insufficient funds for gas"
- Get more ETH from the faucet
- Check your wallet balance: `cast balance YOUR_ADDRESS --rpc-url https://sepolia-rollup.arbitrum.io/rpc`

### "contract already initialized"
- Skip the initialization step
- Your contract is ready to use

### "connection timeout"
- Try a different RPC endpoint
- Check your internet connection

## 📚 Additional Resources

- [Full Deployment Guide](smart-contract/DEPLOYMENT_GUIDE.md)
- [Stylus Documentation](https://docs.arbitrum.io/stylus)
- [Arbitrum Bridge](https://bridge.arbitrum.io)

## 🎯 Next Steps

After successful deployment:

1. ✅ Save your contract address
2. ✅ Update frontend configuration
3. ✅ Update subgraph configuration (subgraph/subgraph.yaml)
4. ✅ Test all contract functions
5. ✅ Deploy your subgraph
6. ✅ Test the full application

## 🆘 Need Help?

Check the detailed guide: `smart-contract/DEPLOYMENT_GUIDE.md`
