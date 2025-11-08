import CONTRACT_ABI_JSON from "../../complete-abi.json" assert { type: "json" };

export const CONTRACT_CONFIG = {
  CONTRACT_ADDRESS: "0x31bf0d589e1c2f459f9e635d60430903eaf68053",
  CONTRACT_ABI: CONTRACT_ABI_JSON,
  NETWORK_ID: 421614,
  NETWORK_NAME: "Arbitrum Sepolia",
  NETWORK_RPC_URL: "https://sepolia-rollup.arbitrum.io/rpc",
};

export const CONTRACT_FUNCTIONS = {
  ProviderRegister: "registerProvider",
  CreatePlan: "createPlan",
  Subscribe: "subscribe",
  ProcessPayments: "processSubscriptionPayment",
  UserBalance: "getUserBalance",
  WithdrawBalance: "withdraw",
  AllPlans: "getPlans",
  Deposite: "deposit",
};

export const CONTRACT_ERRORS = {
  Unauthorized: "Unauthorized",
  InvalidInput: "InvalidInput",
  InsufficientFunds: "InsufficientFunds",
  NotFound: "NotFound",
};
