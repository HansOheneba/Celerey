import { ApiResponse } from "@/types/common";
import apiClient from "../../lib/axios"; // Reuse Axios instance

export const getUserApi = async (): Promise<ApiResponse> => {
  const response = await apiClient.get("/user");
  return response.data;
};

export const validateOtpApi = async (
  email: string,
  otp: string,
  type: string
): Promise<ApiResponse> => {
  const response = await apiClient.post("/auth/validate-otp", {
    email,
    otp,
    type,
  });
  return response.data;
};

export const sendOtpApi = async (email: string): Promise<ApiResponse> => {
  const response = await apiClient.post("/auth/send-otp", {
    email,
  });
  return response.data;
};

