import { useState } from "react";
import toast from "react-hot-toast";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useSwitchChain,
} from "wagmi";
import { parseEther } from "viem";
import {
  CONTRACT_CONFIG,
  CONTRACT_FUNCTIONS,
  CONTRACT_ERRORS,
} from "../contracts/contractconfig";

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useStreamPayContract = () => {
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTxHash, setPendingTxHash] = useState<
    `0x${string}` | undefined
  >();

  const { writeContractAsync } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: pendingTxHash,
    });

  // Helper to ensure correct network
  const ensureCorrectNetwork = async () => {
    if (!isConnected) {
      toast.error(CONTRACT_ERRORS.Unauthorized);
      throw new Error(CONTRACT_ERRORS.Unauthorized);
    }

    if (chain?.id !== CONTRACT_CONFIG.NETWORK_ID) {
      console.log("� Wrong network detected, switching...");
      try {
        await switchChain({ chainId: CONTRACT_CONFIG.NETWORK_ID });
        console.log("✅ Network switched successfully");
      } catch (error: any) {
        console.error("❌ Failed to switch network:", error);
        toast.error(`Please switch to ${CONTRACT_CONFIG.NETWORK_NAME}`);
        throw error;
      }
    }
  };

  // Register a provider on-chain
  const registerProvider = async (name: string) => {
    setIsLoading(true);
    try {
      await ensureCorrectNetwork();

      console.log("📤 Sending registration transaction...");
      const hash = await writeContractAsync({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.CONTRACT_ABI,
        functionName: CONTRACT_FUNCTIONS.ProviderRegister,
        args: [name],
      });

      setPendingTxHash(hash);
      console.log("✅ Transaction sent:", hash);
      toast.success("Provider registered successfully!");

      return hash;
    } catch (error: any) {
      console.error("❌ Provider registration failed:", error);
      let errorMessage = "Failed to register provider";
      if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction rejected by user";
      } else if (error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a plan on-chain
  const createPlan = async (
    price: string,
    interval: number,
    metadataHash: string
  ) => {
    setIsLoading(true);
    try {
      await ensureCorrectNetwork();

      const priceWei = parseEther(price);
      console.log("� Sending plan creation transaction...");
      console.log("  - Price (ETH):", price);
      console.log("  - Interval (seconds):", interval);
      console.log("  - Metadata hash:", metadataHash);

      const hash = await writeContractAsync({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.CONTRACT_ABI,
        functionName: CONTRACT_FUNCTIONS.CreatePlan,
        args: [priceWei, interval, metadataHash],
      });

      setPendingTxHash(hash);
      console.log("✅ Transaction sent:", hash);
      toast.success("Plan created successfully!");

      return hash;
    } catch (error: any) {
      console.error("❌ Plan creation failed:", error);
      let errorMessage = "Failed to create plan";
      if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction rejected by user";
      } else if (error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to a plan
  const subscribe = async (planId: string, price: string) => {
    setIsLoading(true);
    try {
      await ensureCorrectNetwork();

      console.log("🎯 Starting subscription process...");
      console.log("Plan ID:", planId, "Price:", price);

      const hash = await writeContractAsync({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.CONTRACT_ABI,
        functionName: CONTRACT_FUNCTIONS.Subscribe,
        args: [planId],
        value: parseEther(price),
      });

      setPendingTxHash(hash);
      console.log("✅ Transaction sent:", hash);

      // Generate temporary subscription ID
      const subscriptionId = "pending_" + Date.now().toString().slice(-6);
      toast.success(`Subscribed successfully! TX: ${hash.slice(0, 10)}...`);

      return { tx: hash, subscriptionId, receipt: null };
    } catch (error: any) {
      console.error("❌ Subscription failed:", error);
      let errorMessage = "Failed to subscribe";
      if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds";
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction rejected by user";
      } else if (error.shortMessage) {
        errorMessage = error.shortMessage;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Withdraw earnings
  const withdrawEarnings = async (amount: string) => {
    setIsLoading(true);
    try {
      await ensureCorrectNetwork();

      const amountWei = parseEther(amount);
      const hash = await writeContractAsync({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.CONTRACT_ABI,
        functionName: CONTRACT_FUNCTIONS.WithdrawBalance,
        args: [amountWei],
      });

      setPendingTxHash(hash);
      toast.success("Withdraw successful!");
      return hash;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.shortMessage || "Failed to withdraw");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get user balance - Note: this should be used with useReadContract in components
  const getUserBalance = async () => {
    try {
      if (!address) return "0";
      // This is a placeholder - in components, use useReadContract hook directly
      console.log(
        "getUserBalance - use useReadContract hook in components instead"
      );
      return "0";
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch balance");
      throw error;
    }
  };

  // Process subscription payments (only for admin/provider)
  const processPayments = async (subscriptionId: string) => {
    setIsLoading(true);
    try {
      await ensureCorrectNetwork();

      const hash = await writeContractAsync({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.CONTRACT_ABI,
        functionName: CONTRACT_FUNCTIONS.ProcessPayments,
        args: [subscriptionId],
      });

      setPendingTxHash(hash);
      toast.success("Payment processed successfully!");
      return hash;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.shortMessage || "Failed to process payment");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const Deposite = async (amount: string) => {
    setIsLoading(true);
    try {
      await ensureCorrectNetwork();

      const hash = await writeContractAsync({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.CONTRACT_ABI,
        functionName: CONTRACT_FUNCTIONS.Deposite,
        args: [],
        value: parseEther(amount),
      });

      setPendingTxHash(hash);
      toast.success("Deposit successful!");
      return hash;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.shortMessage || "Failed to deposit");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all plans - Note: use useReadContract in components
  const getAllPlans = async () => {
    try {
      console.log(
        "getAllPlans - use useReadContract hook in components instead"
      );
      return [];
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch plans");
      throw error;
    }
  };

  // Check if current address is a registered provider - Note: use useReadContract in components
  const isProviderRegistered = async (_providerAddress?: string) => {
    try {
      console.log(
        "isProviderRegistered - use useReadContract hook in components instead"
      );
      return false;
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };

  // Get plan details by ID - Note: use useReadContract in components
  const getPlanDetails = async (planId: string) => {
    try {
      console.log("Getting plan details for:", planId);
      console.log(
        "getPlanDetails - use useReadContract hook in components instead"
      );
      return null;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };

  return {
    registerProvider,
    createPlan,
    subscribe,
    withdrawEarnings,
    getUserBalance,
    processPayments,
    getAllPlans,
    Deposite,
    isProviderRegistered,
    getPlanDetails,
    isLoading: isLoading || isConfirming,
    isConfirmed,
  };
};
