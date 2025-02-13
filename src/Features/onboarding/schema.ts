import { Option } from "./types";

export interface PersonalInfoSchema {
  prefix: string;
  firstName: string;
  lastName: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  citizenship: string;
  dualCitizenship: string;
  residentCountry: string;
  options: string[];

  dependents: {
    hasDependents: string;
    numberOfDependents: string;
    agesOfDependents: string;
  };
  maritalStatus: string;
  occupation: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  identification: {
    type: string;
    file: File | null;
    fileName: string;
    uploadStatus: "idle" | "uploading" | "completed" | "error";
  };
}

export interface FinancialInfoSchema {
  netWorth?: string;
  currency: string;
  income: {
    rentalIncome: string;
    dividends: string;
    interestIncome: string;
    otherIncome: string;
  };
  annualExpenses: {
    home: string;
    childcare: string;
    education: string;
    healthcare: string;
    travel: string;
    giving: string;
  };
  assets: {
    realEstate: string;
    cash: string;
    publicSecurities: string;
    privateSecurities: string;
    assetCountries: string[];
  };
  liabilities: {
    mortgages: string;
    loans: string;
    creditCards: string;
    assetFinance: string;
    otherLiabilities: string;
  };

  savings: {
    currentSavings: string;
    targetSavings: string;
  };
  emergencyFund: {
    hasEmergencyFunds: string;
    emergencyFundAmount: string;
    targetMonths: string;
  };

  retirement: {
    retirementAge: string;
    targetRetirementIncome: string;
    pensionFund: string;
  };
}

export interface GoalsInfoSchema {
  primamryFinancialGoal: string;
  targetAmount: string;
  hasInvestments: string;
  investmentType: string;
}

export interface RiskInfoSchema {
  userRiskTolerance: Option,
  riskTolerance: Option;
  riskAttitude: Option;
  riskReaction: Option;
  riskApproach: Option;
  investmentObjective: Option;
  investmentHorizon: Option;
  illiquidInvestmentPercentage: Option;
}

export interface KnowledgeInfoSchema {
  knowledgeLevel: string;

  cashKnowledge?: string;
  investingExperience?: string;
  publicSharesKnowledge?: string;
  publicSharesExperience?: string;
  investmentGradeBondsKnowledge?: string;
  investmentGradeBondsExperience?: string;
  nonInvestmentGradeBondsKnowledge?: string;
  nonInvestmentGradeBondsExperience?: string;
  collectiveInvestmentsInstrumentsKnowledge?: string;
  collectiveInvestmentsInstrumentsExperience?: string;
  derivativesKnowledge?: string;
  derivativesExperience?: string;
  forexKnowledge?: string;
  commoditiesKnowledge?: string;
  commoditiesExperience?: string;
  hybridInvestmentsKnowledge?: string;
  privateMarketInstrumentsKnowledge?: string;
  privateMarketInstrumentsExperience?: string;
  realEstateKnowledge?: string;
  realEstateExperience?: string;
  altAssetsKnowledge?: string;
  leveragedInstrumentsKnowledge?: string;
  leveragedInstrumentsExperience?: string;
  privateCreditKnowledge?: string;

  [key: string]: string | undefined;
}

export interface OnboardingFormData {
  personal: PersonalInfoSchema;
  financial: FinancialInfoSchema;
  goals: GoalsInfoSchema;
  risk: RiskInfoSchema;
  knowledge: KnowledgeInfoSchema;
}
