export interface ChartData {
  timestamp: string;
  value: number;
}

export interface PortfolioData {
  dailyData: ChartData[];
  weeklyData: ChartData[];
  monthlyData: ChartData[];
  quarterlyData: ChartData[];
  yearlyData: ChartData[];
}

export interface DashboardProps {
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
  portfolioData: PortfolioData;
  goals: Goal[];
}

export interface ChartData {
  timestamp: string;
  value: number;
}

export interface PortfolioData {
  daily: ChartData[];
  weekly: ChartData[];
  monthly: ChartData[];
  quarterly: ChartData[];
  yearly: ChartData[];
}

import { ApexOptions } from "apexcharts";

export type TimeframeKey = "1D" | "1W" | "1M" | "3M" | "1Y";

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

export interface Advisor {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  googleCalendarUrl: string;
}

export interface Goal {
  name: string;
  progress: number;
  amount: number;
  targetAmount: number;
  lastUpdated: string;
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
