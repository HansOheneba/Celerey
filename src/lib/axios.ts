import { useAuthStore } from "@/Features/auth/state";
import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from "axios";
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {

    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {

      useAuthStore.getState().logout()
      window.location.href = "/auth/signin";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
