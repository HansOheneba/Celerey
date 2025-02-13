export interface AssetAllocationProps {
  userName: string;
  riskAttitude: string;
  netWorth: number;
  investmentExperience: string;
  riskAllocation: {
    low: number;
    medium: number;
    high: number;
  };
}

export type SubscriptionInterval = "yearly";

export type SubscriptionTier = {
  id: string;
  name: string;
  price: number;
  pricePerMonth: number;
  interval: SubscriptionInterval;
  description: string;
  idealCustomer: string;
  features: string[];
  intro: string;
  buttonText: string;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
};
