import { SubscriptionTier } from "./types";

export const riskCategories = {
  high: [
    "Public Shares Of listed Companies",
    "Private Equity (Growth Stage Businesses)",
    "Venture Capital (Early Stage Business)",
    "Alternative Assets Such As Crypto",
    "Hedge Funds",
  ],
  medium: [
    "Publicly Listed Large Companies",
    "Mutual Funds (Equity Or Bonds)",
    "Listed Collective Investment Schemes",
    "Low Volatility Commodities",
    "Structured Products",
  ],
  low: [
    "US Government Securities",
    "Other US Government Securities",
    "Investment Grade Corporate Bonds",
    "Listed Notes Such As S&P 500",
    "Developed Prime Real Estate",
    "Cash Equivalents",
  ],
};

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "standard",
    name: "Standard",
    price: 299,
    pricePerMonth: Math.round(299 / 12),
    interval: "yearly",
    description:
      "Expert guidance and smart financial management for individuals starting their wealth journey.",
    idealCustomer:
      "Ideal for individuals who want expert guidance and smart, data-driven financial management with occasional expert check-ins.",
    intro: "Standard plan includes:",
    features: [
      "Celerey financial dashboard with personalized financial insights and goal tracking",
      "Two (2) private sessions per year with a Celerey wealth advisor",
      "Expert financial content on personal finance, market reports, research and other educational resources",
      "Discounted access to Celerey's community events, curated services and key offerings",
    ],
    buttonText: "Upgrade to Standard",
    isCurrentPlan: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1499,
    pricePerMonth: Math.round(1499 / 12),
    interval: "yearly",
    description:
      "Advanced features and personalized guidance for active wealth builders.",
    idealCustomer:
      "Designed for wealth developers who are actively growing and refining their wealth strategy. Celerey Pro provides deeper expert engagement, proactive strategy sessions and goal execution support.",
    intro: "All Celerey Standard features plus:",
    features: [
      "Celerey financial dashboard with advanced investment analyses and insights tailored to specific financial profile",
      "Four (4) private advisory sessions per year with fully loaded flexibility",
      "Priority access to Celerey's community events, curated financial workshops, webinars and other services",
      "Complimentary admittance to Celerey's high-net-worth networking events",
      "Access to emerging investment opportunities across markets",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 4999,
    pricePerMonth: Math.round(4999 / 12),
    interval: "yearly",
    description:
      "Premium service with exclusive benefits for high-net-worth individuals.",
    idealCustomer:
      "Perfect for high-net-worth individuals who require elite advisory, premium networking, and hands-on financial strategy services.",
    intro: "All Celerey Pro features plus:",
    features: [
      "Five (5) private fully loaded advisory sessions per year with top-tier financial experts with in-person optionality",
      "Exclusive invitations to Celerey's high-net-worth networking events with discounted matching services",
      "VIP insights into emerging investment opportunities and private markets",
      "Dedicated concierge financial advisory support",
    ],
    buttonText: "Upgrade to Elite",
  },
];
