import React, { useState, useEffect } from "react";
import { Search, Filter, Sparkles, Info } from "lucide-react";
import { PlanCard } from "../components/PlanCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useStreamPayContract } from "../hooks/useContract";
import { mockApi } from "../services/mockApi";
import { Plan } from "../types";
import { useWallet } from "../hooks/useWallet";

export const Marketplace: React.FC = () => {
  const { subscribe, isLoading } = useStreamPayContract();
  const { isConnected } = useWallet();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const allPlans = await mockApi.getPlans();
        const activePlans = allPlans.filter((plan) => plan.isActive);
        setPlans(activePlans);
        setFilteredPlans(activePlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const filtered = plans.filter(
      (plan) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlans(filtered);
  }, [searchTerm, plans]);

  const handleSubscribe = async (planId: string) => {
    if (!isConnected) {
      // This will now be handled by the UI, but keeping for safety
      return;
    }

    try {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        const result = await subscribe(planId, plan.price);
        console.log("Subscription result:", result);
        if (result.subscriptionId) {
          localStorage.setItem(`subscription_${planId}`, result.subscriptionId);
        }
      }
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-accent rounded-xl mb-4 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900">
            Explore the Marketplace
          </h1>
          <p className="text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover and subscribe to amazing Web3 services and dApps.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-card/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-border">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name, provider, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base bg-white/50 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 border-gray-200 hover:bg-gray-50/80"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Connection Notice */}
        {!isConnected && (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 mb-8 flex items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-0.5">
                Connect Your Wallet
              </h3>
              <p className="text-blue-800/80 text-sm">
                To subscribe to plans, please connect your wallet first.
              </p>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border shadow-sm">
            <p className="text-sm text-gray-600">Total Plans</p>
            <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border shadow-sm">
            <p className="text-sm text-gray-600">Providers</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(plans.map((p) => p.providerId)).size}
            </p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border shadow-sm">
            <p className="text-sm text-gray-600">Showing</p>
            <p className="text-2xl font-bold text-gray-900">
              {filteredPlans.length}
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        {loadingPlans ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-card/50 h-80 rounded-2xl shadow-md"
              />
            ))}
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-center py-20 bg-card/70 backdrop-blur-md rounded-2xl border border-border shadow-lg">
            <div className="w-16 h-16 bg-gray-100/80 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No Plans Found" : "No Plans Available"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {searchTerm
                ? "Your search did not match any plans. Try a different keyword."
                : "The marketplace is currently empty. Please check back later!"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscribe}
                isLoading={isLoading}
                isConnected={isConnected}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
