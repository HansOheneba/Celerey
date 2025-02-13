import { persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import Cookies from "js-cookie";

import { AuthState } from "./types";
import { getUserApi, sendOtpApi, validateOtpApi } from "./service";
import { DEFAULT_AUTH_ERROR_MESSAGE } from "./constants";

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: "",

      setLoading : (status: boolean) => {
        set((state) => {
          state.loading = status;
        });
      },
      setError : (error: string) => {
        set((state) => {
          state.error = error;
        });
      },
      setUser: async () => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
          try {
            const response = await getUserApi();
            set((state) => {
              state.user = {
                email: response.data.email,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                role: response.data.role,
                userId: response.data.id,
              };
            });
          } catch (error) {
            if (error instanceof AxiosError) {
              throw error;
            }
          }
        }
      },
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set((state) => {
          state.isAuthenticated = isAuthenticated;
        }),

      sendOTP: async (email: string) => {
        try {
          set((state) => {
            state.loading = true;
          });
          await sendOtpApi(email);
          set((state) => {
            state.user = { email };
            state.loading = false;
          });
          return true;
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
            throw error;
          }
          return false;
        }
      },

      validateOTP: async (otp: string, type = "SIGN_IN") => {
        try {
          set((state) => {
            state.loading = true
            state.error = ''
          });
          const email = get().user?.email;
          if (!email) {
            set(
              (state) =>
                (state.error = "Please Enter Your Email in the Previous Step")
            );
            return false;
          } else {
            const { data } = await validateOtpApi(email, otp, type);

            if (!data) {
              set((state) => {
                state.loading = false;
                state.error = "Invalid OTP or Account doesn't exist"
              });
            }

            Cookies.set("accessToken", data.token, {
              expires: 1,
              secure: false,
              sameSite: "Strict",
            });
            await get().setUser();

            set((state) => {
              state.isAuthenticated = true;
              state.loading = false;
            });
            return true;
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            set((state) => {
              state.loading = false;
              state.error =
                error.response?.data.message || DEFAULT_AUTH_ERROR_MESSAGE;
            });
            throw error;
          }

          return false;
        }
      },

      logout: () => {
        set((state) => {
          state.isAuthenticated = false;
          state.user = null;
          Cookies.remove("accessToken");
        });
      },
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
