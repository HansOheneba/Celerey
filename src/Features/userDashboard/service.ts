import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance

export const getDashboardDataApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user/dashboard");
  return response.data;
};

export const getFinancialGoalsApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/financial-goal");
  return response.data;
};

export const createFinancialGoalsApi = async (
  payload: any
): Promise<ApiResponse> => {
  const response = await apiClient.post("/financial-goal", payload);
  return response.data;
};

export const updateFinancialGoalsApi = async (
  payload: any,
  id: string
): Promise<ApiResponse> => {
  const response = await apiClient.put(`/financial-goal/${id}`, payload);
  return response.data;
};

export const createSubscriptionApi = async (
  payload: any
): Promise<ApiResponse> => {
  const response = await apiClient.post("/subscription", payload);
  return response.data;
};

/***
 * {
      subscription_id: subscriptionId,
      new_price_id: newPriceId,
      prorate: true, // Apply prorated charges
    }
 */
export const changeSubscriptionApi = async (
  payload: any
): Promise<ApiResponse> => {
  const response = await apiClient.post("/subscription/change", payload);
  return response.data;
};

export const getSubscriptionStatusApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get(`/subscription/status`);
  return response.data;
};

export const saveBudgetApi = async (payload: any): Promise<ApiResponse> => {
  const response = await apiClient.post("/budget", payload);
  return response.data;
};

export const getBudgetApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/budget");
  return response.data;
};
