import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrumSepolia } from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";

// 1. Get a project ID at https://cloud.reown.com
export const projectId =
  import.meta.env.VITE_REOWN_PROJECT_ID || "YOUR_PROJECT_ID";

// 2. Set up Wagmi adapter
export const networks = [arbitrumSepolia] as const;

export const wagmiAdapter = new WagmiAdapter({
  networks: [arbitrumSepolia],
  projectId,
  ssr: false,
});

// 3. Create modal
export const metadata = {
  name: "FlutterPay",
  description: "Decentralized Subscription Payments on Blockchain",
  url: "https://flutterpay.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 4. Create a new QueryClient
export const queryClient = new QueryClient();

// 5. Create the AppKit instance
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [arbitrumSepolia],
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
    emailShowWallets: true,
  },
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#4F46E5",
    "--w3m-border-radius-master": "8px",
  },
});
