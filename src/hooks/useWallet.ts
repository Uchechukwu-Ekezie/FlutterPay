import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

// Modern wallet hook using wagmi and Reown AppKit
export const useWallet = () => {
  const { address, isConnected, isConnecting, isReconnecting, chain } =
    useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const connectWallet = async () => {
    await open();
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    isConnected,
    address: address || null,
    isConnecting: isConnecting || isReconnecting,
    connectWallet,
    disconnectWallet,
    chain,
  };
};
