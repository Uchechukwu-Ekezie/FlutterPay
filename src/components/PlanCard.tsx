import React from "react";
import { Calendar, Users, Zap } from "lucide-react";
import { Plan } from "../types";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button";
import { useAppKit } from "@reown/appkit/react";

interface PlanCardProps {
  plan: Plan;
  onSubscribe?: (planId: string) => void;
  onDeactivate?: (planId: string) => void;
  isProvider?: boolean;
  isLoading?: boolean;
  isConnected: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onSubscribe,
  onDeactivate,
  isProvider = false,
  isLoading = false,
  isConnected,
}) => {
  const { open } = useAppKit();
  const formatPrice = (price: string) => `${price} ETH`;

  const formatInterval = (interval: string) =>
    interval === "monthly" ? "per month" : "per year";

  const handleAction = () => {
    if (isProvider) {
      onDeactivate?.(plan.id);
    } else {
      if (isConnected) {
        onSubscribe?.(plan.id);
      } else {
        open();
      }
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (isProvider) return plan.isActive ? "Deactivate" : "Deactivated";
    if (!plan.isActive) return "Unavailable";
    return isConnected ? "Subscribe" : "Connect to Subscribe";
  };

  return (
    <Card className="h-full flex flex-col bg-white/60 backdrop-blur-sm border-gray-200/60 shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex-1 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-xl text-gray-900 mb-1">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              by {plan.providerName}
            </p>
          </div>
          {!plan.isActive && (
            <span className="px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
              Inactive
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2 h-10">
          {plan.description}
        </p>

        <div className="bg-gray-50/70 rounded-lg p-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(plan.price)}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {formatInterval(plan.interval)}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2 border-t border-gray-200/80">
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4" />
              <span>{plan.subscriberCount} subscribers</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4" />
              <span>Billed {plan.interval}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full group"
          onClick={handleAction}
          disabled={(!plan.isActive && !isProvider) || isLoading}
          variant={!isConnected && !isProvider ? "outline" : "default"}
        >
          {getButtonText()}
          {!isProvider && (
            <Zap className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
