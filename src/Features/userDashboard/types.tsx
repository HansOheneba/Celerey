import { ApexOptions } from "apexcharts";

export interface FinancialMetric {
  value: number;
  currency: string;
}

export interface ChartComponentProps {
  options: ApexOptions;
  series: ApexAxisChartSeries | number[];
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
  height?: string | number;
  width?: string | number;
}

export type ChartType = React.ComponentType<ChartComponentProps>;

export interface FinancialPlan {
  id?: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  durationStart: string;
  durationEnd: string;
  goalDuration: number;
  durationLeft: number;
}

export interface AssetAllocation {
  category: string;
  amount: number;
  percentage: number;
}

export interface GeographicalData {
  country: string;
  amount: number;
  coordinates: [number, number];
}

export interface RiskProfile {
  riskAttitude: string;
  investmentExperience: string;
  financialKnowledge: string;
  description: string;
}

export interface DashboardData {
  netWorth: FinancialMetric;
  balance: FinancialMetric;
  income: FinancialMetric;
  expenses: FinancialMetric;
  savings: FinancialMetric;
  financialPlans: FinancialPlan[];
  emergencyPlans: EmergencyPlan[];
  assetAllocation: AssetAllocation[];
  geographicalSpread: GeographicalData[];
  riskProfile: RiskProfile;
  expensesData: ExpenseItem[];
}

export interface FinancialPlan {
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  durationStart: string;
  durationEnd: string;
  goalDuration: number;
  durationLeft: number;
}
export interface EmergencyPlan {
  name: string;
  duration: number;
  targetDuration: number;
  progress: number;
  durationStart: string;
  durationEnd: string;
  goalDuration: number;
  durationLeft: number;
}

export enum ProgressStatus {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface FinancialGoalsCardProps {
  plans: FinancialGoal[];
  onAddGoalClick: () => void;
  onModifyGoal: (plan: FinancialGoal) => void;
}

export interface AddFinancialGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FinancialGoal | null;
  isModifying?: boolean;
}

export interface GoalFormData {
  name: string;
  targetAmount: string;
  currentAmount: string;
  goalDuration: string;
  durationStart: string;
  durationEnd: string;
  durationLeft: string;
}

export interface PortfolioRecommendation {
  title: string;
  description: string;
  percentage: number;
}

export interface PortfolioRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type AssetType = {
  id?: string;
  category?: string;
  amount?: number;
  key?: string;
  percentage?: string | number;
  color?: string;
};

export type CountryType = {
  id: string;
  name: string;
};

export interface IncomeItem {
  id?: string;
  category?: string;
  amount?: number;
  key?: string;
  percentage?: string | number;
  color?: string;
}

export interface ExpenseItem {
  id?: string;
  category?: string;
  amount?: number;
  key?: string;
  percentage?: string | number;
  color?: string;
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

export interface Advisor {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  googleCalendarUrl: string;
}

export interface LiabilityItem {
  id?: string;
  category?: string;
  amount?: number;
  key?: string;
  percentage?: string | number;
  color?: string;
}

export interface BudgetArea {
  name: string;
  percentage?: number;
  amount?: number;
  color?: string;
}

export interface GeneratedBudget {
  duration: string;
  areas: BudgetArea[];
  totalBudget: number;
}

export interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateBudget: (budget: GeneratedBudget) => void;
}

export interface FinancialGoal {
  id?: string;
  name: string;
  percentage: number;
  currentValue: string;
  targetValue: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  duration?: string;
  durationLeft?: string;
}
