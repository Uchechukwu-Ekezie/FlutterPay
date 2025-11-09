import React from "react";
import { Loader2, LogOut } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

const WalletButton: React.FC = () => {
  const {
    isConnected,
    address,
    isConnecting,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const truncated = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const handleClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isConnecting}
      className={cn(
        "h-10 px-5 text-sm font-semibold rounded-full transition-all shadow",
        isConnected
          ? "bg-muted hover:bg-muted/80 text-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isConnected ? (
        <span className="flex items-center gap-2">
          {truncated}
          <LogOut className="w-3.5 h-3.5" />
        </span>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
};

export default WalletButton;
