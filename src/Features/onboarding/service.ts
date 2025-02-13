import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance
import {
  FinancialInfoSchema,
  GoalsInfoSchema,
  KnowledgeInfoSchema,
  PersonalInfoSchema,
  RiskInfoSchema,
} from "./schema";
import camelToSnake from "@/utils/convertCamelCaseToSnakeCase";

export const savePersonalInfoApi = async (
  data: PersonalInfoSchema
): Promise<ApiResponse> => {
  const formData = new FormData();

  formData.append("prefix", data.prefix);
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append(
    "birthdate",
    new Date(
      Number(data.dob.year),
      Number(data.dob.month),
      Number(data.dob.day)
    ).toISOString()
  );
  formData.append("citizenship", data.citizenship);
  formData.append("dual_citizenship", data.dualCitizenship);
  formData.append("residing_country", data.residentCountry);
  formData.append("decisions_on_wealth", JSON.stringify(data.options));

  const response = await apiClient.post("/create/personal-info", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  await updateOnboardingProgressApi("financial");
  return response.data;
};

export const saveFinancialInfoApi = async (
  data: Partial<FinancialInfoSchema>
): Promise<ApiResponse> => {
  const financialInfoToBeSaved = {
    currency: data.currency,
    income: data.income,
    expense: data.annualExpenses,
    assets: data.assets,
    liabilities: data.liabilities,
    savings: data.savings,
    emergency_fund: {
      hasEmergencyFund: true,
      currentMonths: "6 Months",
      targetMonths: "14 Months",
    },
    retirement: data.retirement,
  };

  const response = await apiClient.post(
    "/create/financial-info",
    financialInfoToBeSaved
  );
  await updateOnboardingProgressApi("goals");

  return response.data;
};

export const saveGoalsInfoApi = async (
  data: GoalsInfoSchema
): Promise<ApiResponse> => {
  const goalsInfoToBeSaved = {
    has_investment: data.hasInvestments,
    investment_type: data.investmentType,
    financial_goal: data.primamryFinancialGoal,
    target_amount: data.targetAmount,
  };

  const response = await apiClient.post("/create/goals", goalsInfoToBeSaved);
  await updateOnboardingProgressApi("risk");
  return response.data;
};

export const saveRiskInfoApi = async (
  data: RiskInfoSchema
): Promise<ApiResponse> => {
  let riskInfoToBeSaved = {};
  if (data.userRiskTolerance?.title) {
    riskInfoToBeSaved = {
      user_risk_tolerance: data.userRiskTolerance?.title,
    };
  } else {
    riskInfoToBeSaved = {
      risk_reaction: data.riskReaction,
      risk_approach: data.riskApproach,
      investment_objective: data.investmentObjective,
      investment_horizon: data.investmentHorizon,
      illiquid_investment_percentage: data.illiquidInvestmentPercentage,
      risk_attitude: data.riskAttitude,
      risk_tolerance: data.riskTolerance,
    };
  }
  const response = await apiClient.post(
    "/create/risk-profile",
    riskInfoToBeSaved
  );
  await updateOnboardingProgressApi("knowledge");
  return response.data;
};

export const saveKnowledgeInfoApi = async (
  data: KnowledgeInfoSchema
): Promise<ApiResponse> => {
  let knowledgeInfoToBeSaved: any = {};
  if (data.knowledgeLevel) {
    knowledgeInfoToBeSaved = {
      user_financial_knowledge: data.knowledgeLevel || "",
    };
  } else {
    Object.keys(data).map((key) => {
      if (key !== "knowledgeLevel") {
        knowledgeInfoToBeSaved[camelToSnake(key)] = data[key];
      }
    });
  }

  const response = await apiClient.post(
    "/create/financial-knowledge",
    knowledgeInfoToBeSaved
  );
  await updateOnboardingProgressApi("completed");
  return response.data;
};

export const getPersonalInfoApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/personal-info");
  return response.data;
};

export const getFinancialInfoApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/financial-info");
  return response.data;
};

export const getGoalsApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/goals");
  return response.data;
};

export const getRiskProfileApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/risk-profile");
  return response.data;
};

export const getFinancialKnowledgeApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/financial-knowledge");
  return response.data;
};

export const getOnboardingProgressApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/onboarding-progress");
  return response.data;
};

export const updateOnboardingProgressApi = async (
  current_section: string
): Promise<ApiResponse> => {
  const response = await apiClient.post("/onboarding-progress", {
    current_section,
  });
  return response.data;
};
