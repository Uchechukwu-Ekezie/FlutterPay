# FlutterPay - Quick Start Guide

## 🏃 Get Started in 3 Minutes

### Step 1: Get Reown Project ID (2 minutes)

1. Go to https://cloud.reown.com
2. Sign up or log in
3. Click "Create Project"
4. Copy your **Project ID**

### Step 2: Configure Environment (30 seconds)

```bash
# Create .env file
echo "VITE_REOWN_PROJECT_ID=paste_your_project_id_here" > .env
```

### Step 3: Install & Run (30 seconds)

```bash
npm install
npm run dev
```

**Done! 🎉** Open http://localhost:5173

---

## 🧪 Quick Testing

### Test Wallet Connection

1. Click the colorful button in the header
2. Select your wallet (MetaMask recommended)
3. Approve the connection
4. ✅ You're connected!

### Test the UI

- **Landing Page**: Smooth animations and gradients
- **Marketplace**: Browse subscription plans
- **Provider Dashboard**: For service providers

---

## 📝 Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check for errors

# Troubleshooting
rm -rf node_modules package-lock.json && npm install  # Fresh install
```

---

## 🎨 What's New?

### Visual

- ✨ Animated gradient backgrounds
- 🎭 Floating blob animations
- 🌈 Modern color palette (Indigo/Purple/Pink)
- 📱 Fully responsive design

### Technical

- ⚡ Reown AppKit for wallet connection
- 🔗 Wagmi hooks for blockchain
- 🎯 TypeScript throughout
- 🚀 Optimized bundle size

---

## 🔑 Key Files

```
src/
├── config/appkit.ts          # Wallet configuration
├── hooks/
│   ├── useWallet.ts          # Wallet connection
│   └── useContract.ts        # Smart contract calls
├── pages/
│   ├── Landing.tsx           # Home page (NEW!)
│   └── Marketplace.tsx       # Browse plans (NEW!)
└── components/
    └── Layout.tsx            # Navigation (NEW!)
```

---

## 🆘 Common Issues

**"Please switch to Arbitrum Sepolia"**
→ Click the network button in the wallet modal

**"Module not found"**
→ Run `npm install` again

**Wallet won't connect**
→ Check your Project ID in .env

**Styles look broken**
→ Make sure Tailwind is working: `npm run dev`

---

## 📚 Learn More

- [Full Setup Guide](./FRONTEND_SETUP.md)
- [Complete Summary](./FRONTEND_REVAMP_SUMMARY.md)
- [Next Steps](./NEXT_STEPS.md)

---

**Need Help?**
Check the browser console (F12) for detailed error messages.

**Everything working?**
Great! Read [NEXT_STEPS.md](./NEXT_STEPS.md) for what to do next.

---

Made with ❤️ for FlutterPay
