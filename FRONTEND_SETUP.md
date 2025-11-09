# FlutterPay Frontend Revamp - Setup Guide

This document describes the frontend updates made to FlutterPay, including the integration of Reown's AppKit for wallet connection and UI improvements.

## Changes Made

### 1. Wallet Connection - Reown AppKit Integration

**Removed:**

- `@pushchain/ui-kit`
- `@rainbow-me/rainbowkit`
- Custom ethers-based wallet connection

**Added:**

- `@reown/appkit` - Modern wallet connection modal
- `@reown/appkit-adapter-wagmi` - Wagmi adapter for AppKit
- Updated `wagmi` and `viem` to latest versions
- `@tanstack/react-query` for state management

**New Files:**

- `src/config/appkit.ts` - AppKit configuration with Arbitrum Sepolia network
- `.env.example` - Template for environment variables

### 2. Updated Components

#### App.tsx

- Replaced `PushUniversalWalletProvider` with `WagmiProvider` and `QueryClientProvider`
- Cleaner provider hierarchy

#### Layout.tsx

- Replaced `PushUniversalAccountButton` with `<appkit-button />`
- Modern header design with gradient logo
- Improved mobile menu
- Sticky header with backdrop blur

#### useWallet.ts

- Now uses wagmi hooks (`useAccount`, `useDisconnect`, `useAppKit`)
- Simpler and more reliable
- Auto-reconnection support

#### useContract.ts

- Migrated from ethers.js to wagmi hooks
- Uses `useWriteContract` for transactions
- Uses `useWaitForTransactionReceipt` for transaction confirmations
- Better error handling
- Network switching support with `useSwitchChain`

### 3. UI Improvements

#### Landing Page

- Modern hero section with animated gradient background
- Floating blob animations
- Stats section showing metrics
- Improved feature cards with gradients
- Better spacing and typography
- Responsive design

#### Marketplace Page

- Enhanced search bar with better styling
- Stats bar showing plan counts
- Improved empty states
- Better loading skeletons
- Connection notice banner

#### index.css

- Added custom animations (blob, gradient)
- Grid pattern background utility
- Animation delay utilities

## Setup Instructions

### 1. Get a Reown Project ID

1. Visit [https://cloud.reown.com](https://cloud.reown.com)
2. Create a new project
3. Copy your Project ID

### 2. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Reown Project ID:

```env
VITE_REOWN_PROJECT_ID=your_project_id_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Key Features

### Wallet Connection

- Multi-wallet support (MetaMask, WalletConnect, etc.)
- Network switching to Arbitrum Sepolia
- Auto-reconnection
- Clean disconnect functionality

### Contract Interactions

- Type-safe contract calls with wagmi
- Transaction status tracking
- Gas estimation
- Error handling with user-friendly messages

### UI/UX

- Modern gradient-based design
- Smooth animations
- Responsive layout
- Loading states
- Toast notifications

## Network Configuration

The app is configured for **Arbitrum Sepolia**:

- Chain ID: 421614
- RPC URL: https://sepolia-rollup.arbitrum.io/rpc
- Block Explorer: https://sepolia.arbiscan.io

## Components Structure

```
src/
├── config/
│   └── appkit.ts              # Reown AppKit configuration
├── hooks/
│   ├── useWallet.ts           # Wallet connection hook (wagmi)
│   └── useContract.ts         # Contract interaction hook (wagmi)
├── components/
│   ├── Layout.tsx             # Main layout with navigation
│   └── ui/                    # Reusable UI components
├── pages/
│   ├── Landing.tsx            # Landing page (revamped)
│   ├── Marketplace.tsx        # Marketplace (enhanced)
│   └── ...                    # Other pages
└── index.css                  # Global styles with animations
```

## Contract Functions

Available through `useStreamPayContract()` hook:

- `registerProvider(name)` - Register as a service provider
- `createPlan(price, interval, metadataHash)` - Create subscription plan
- `subscribe(planId, price)` - Subscribe to a plan
- `withdrawEarnings(amount)` - Withdraw provider earnings
- `Deposite(amount)` - Deposit funds
- `processPayments(subscriptionId)` - Process subscription payment

## Troubleshooting

### Wallet Not Connecting

1. Ensure you have a web3 wallet installed (MetaMask recommended)
2. Check that you're on Arbitrum Sepolia network
3. Verify your Reown Project ID is set correctly in `.env`

### Transactions Failing

1. Check you have sufficient ETH on Arbitrum Sepolia
2. Ensure you're connected to the correct network
3. Check the browser console for detailed error messages

### UI Not Loading Properly

1. Clear browser cache
2. Run `npm install` to ensure all dependencies are installed
3. Check for any console errors

## Future Improvements

- [ ] Add transaction history
- [ ] Implement dark mode
- [ ] Add more wallet connection options
- [ ] Improve mobile responsiveness
- [ ] Add subscription management features
- [ ] Implement real-time notifications

## Support

For issues or questions:

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure you're on the correct network
4. Check that the smart contract is deployed on Arbitrum Sepolia

---

**Built with:**

- React + TypeScript
- Vite
- TailwindCSS
- Wagmi v2
- Reown AppKit
- Viem
