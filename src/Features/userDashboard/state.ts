import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import {
  createFinancialGoalsApi,
  getBudgetApi,
  getDashboardDataApi,
  getFinancialGoalsApi,
  getSubscriptionStatusApi,
  saveBudgetApi,
  updateFinancialGoalsApi,
} from "./service";
import { AssetType, FinancialGoal } from "./types";
import { PersonalInfoSchema } from "../onboarding/schema";
import { saveFinancialInfoApi } from "../onboarding/service";

interface DashboardState {
  data: {
    userName: string;
    assetCountries: string[];
    netWorth: number;
    totalAssets: number;
    totalLiabilities: number;
    totalIncome: number;
    incomeAndDebt: number;
    expense: {
      [key: string]: {
        value: number;
        percentage: number;
      };
    };
    allIncome: {
      [key: string]: {
        value: number;
        percentage: number;
      };
    };
    totalExpense: number;
    totalExpenseFromIncome: {
      value: number;
      percentage: number;
    };
    totalIncomeFromExpense: {
      value: number;
      percentage: number;
    };
    income: {
      value: number;
      percentage: number;
    };
    debt: {
      value: number;
      percentage: number;
    };
    assets: {
      [key: string]: {
        value: number;
        percentage: number;
      };
      cash: {
        value: number;
        percentage: number;
      };
      realEstate: {
        value: number;
        percentage: number;
      };
      publicSecurities: {
        value: number;
        percentage: number;
      };
      privateSecurities: {
        value: number;
        percentage: number;
      };
    };
    liabilities: {
      [key: string]: {
        value: number;
        percentage: number;
      };
      loans: {
        value: number;
        percentage: number;
      };
      mortgages: {
        value: number;
        percentage: number;
      };
      creditCards: {
        value: number;
        percentage: number;
      };
      assetFinance: {
        value: number;
        percentage: number;
      };
      otherLiabilities: {
        value: number;
        percentage: number;
      };
    };
    userFinancialKnowledge: string;
    calculatedFinancialKnowledge: string;
    calculatedRiskTolerance: {
      title: string;
      score: number;
      summary: string;
    };
    userRiskTolerance: string;
    currency: string;
    savings: string;
    liabilitiesEstimation: any;
  };
  financialGoals: FinancialGoal[];
  subscription: {
    isSubscribed: boolean;
    plan: string;
    billing_interval: string;
    status: string;
    start_date: string;
    end_date: string;
  };
  budget: any;
  error: string;
  loading: boolean;
}

// the various actions we can perform
interface DashboardStore extends DashboardState {
  populateDashboardData: () => Promise<void>;
  populateFinancialGoals: () => Promise<void>;
  populateSubscription: () => Promise<any>;
  populateBudget: () => Promise<void>;
  updateAssets: (assets: AssetType[], assetCountries: string[]) => void;
  updateBalance: (
    balance: AssetType[],
    key: string,
    additionalItems?: any
  ) => void;
  updateFinancialGoal: (goal: any, id: string) => void;
  createFinancialGoal: (goal: any) => void;
  saveBudget: (budget: any) => void;
  reset: () => void;
  setLoading: (status: boolean) => void;
}

const DEFAULT_SUBSCRIPTION = {
  isSubscribed: false,
  plan: "",
  billing_interval: "",
  status: "inactive",
  start_date: "",
  end_date: "",
};

const DEFAULT_BUDGET = {};
const DEFAULT_DATA = {
  userName: "",
  assetCountries: [],
  netWorth: 0,
  totalAssets: 0,
  totalLiabilities: 0,
  totalIncome: 0,
  incomeAndDebt: 0,
  currency: "",
  expense: {},
  allIncome: {},
  income: {
    value: 0,
    percentage: 0,
  },
  debt: {
    value: 0,
    percentage: 0,
  },
  assets: {
    cash: {
      value: 0,
      percentage: 0,
    },
    realEstate: {
      value: 0,
      percentage: 0,
    },
    publicSecurities: {
      value: 0,
      percentage: 0,
    },
    privateSecurities: {
      value: 0,
      percentage: 0,
    },
  },
  totalExpense: 0,
  totalExpenseFromIncome: {
    value: 0,
    percentage: 0,
  },
  totalIncomeFromExpense: {
    value: 0,
    percentage: 0,
  },
  liabilities: {
    loans: {
      value: 0,
      percentage: 0,
    },
    mortgages: {
      value: 0,
      percentage: 0,
    },
    creditCards: {
      value: 0,
      percentage: 0,
    },
    assetFinance: {
      value: 0,
      percentage: 0,
    },
    otherLiabilities: {
      value: 0,
      percentage: 0,
    },
  },
  userFinancialKnowledge: "",
  calculatedRiskTolerance: {
    title: "",
    score: 0,
    summary: "",
  },
  calculatedFinancialKnowledge: "",
  userRiskTolerance: "",
  savings: "",
  liabilitiesEstimation: {
    servicingAmount: 0,
    servicingPeriod: 0,
  },
};
const DEFAULT_FINANCIAL_GOALS: any[] = [];

export const useDashboardStore = create<DashboardStore>()(
  immer((set, get) => ({
    subscription: DEFAULT_SUBSCRIPTION,
    budget: DEFAULT_BUDGET,
    data: DEFAULT_DATA,
    financialGoals: DEFAULT_FINANCIAL_GOALS,
    loading: true,
    error: "",

    setLoading: (status: boolean) => {
      set((state) => {
        state.loading = status;
      });
    },
    reset: () => {
      set((state) => {
        state.loading = false;
        state.subscription = DEFAULT_SUBSCRIPTION;
        state.budget = DEFAULT_BUDGET;
        state.data = DEFAULT_DATA;
        state.financialGoals = DEFAULT_FINANCIAL_GOALS;
      });
    },
    populateDashboardData: async () => {
      set((state) => {
        state.loading = true;
      });
      const response = await getDashboardDataApi();
      if (response.data) {
        set((state) => {
          state.data = {
            savings: response.data.savings,
            expense: response.data.expense,
            userName: response.data.user_name,
            assetCountries: response.data.asset_countries,
            netWorth: response.data.net_worth,
            totalAssets: response.data.total_assets,
            totalLiabilities: response.data.total_liabilities,
            totalIncome: response.data.total_income,
            incomeAndDebt: response.data.income_and_debt,
            income: response.data.income,
            debt: response.data.debt,
            assets: response.data.assets,
            liabilities: response.data.liabilities,
            currency: response.data.currency,
            userFinancialKnowledge: response.data.user_financial_knowledge,
            userRiskTolerance: response.data.user_risk_tolerance,
            allIncome: response.data.all_income,
            totalExpense: response.data.total_expense,
            totalExpenseFromIncome: response.data.total_expense_from_income,
            totalIncomeFromExpense: response.data.total_income_from_expense,
            liabilitiesEstimation: response.data.liabilities_estimation,
            calculatedFinancialKnowledge:
              response.data.calculated_financial_knowledge,
            calculatedRiskTolerance:
              typeof response.data.calculated_risk_tolerance === "string"
                ? JSON.parse(response?.data?.calculated_risk_tolerance || "{}")
                : response?.data?.calculated_risk_tolerance,
          };
        });
      }

      set((state) => {
        state.loading = false;
      });
    },
    populateFinancialGoals: async () => {
      set((state) => {
        state.loading = true;
      });
      const response = await getFinancialGoalsApi();
      if (response?.data?.data) {
        set((state) => {
          state.financialGoals = response.data.data;
        });
      }

      set((state) => {
        state.loading = false;
      });
    },
    populateSubscription: async () => {
      set((state) => {
        state.loading = true;
      });
      const response = await getSubscriptionStatusApi();
      if (response?.data) {
        set((state) => {
          state.subscription = response.data;
        });
      }
      set((state) => {
        state.loading = false;
      });
      return response.data;
    },
    populateBudget: async () => {
      set((state) => {
        state.loading = true;
      });
      const response = await getBudgetApi();
      if (response?.data) {
        set((state) => {
          if (response?.data?.categories) {
            const categories = response.data.categories.map(
              (category: any) => ({
                ...category,
                percentage:
                  (category.amount / response.data.total_amount) * 100,
              })
            );
            state.budget = {
              name: response.data?.name || "",
              categories,
              duration: response.data?.duration || "0",
            };
          } else {
            state.budget = null;
          }
        });
      }
      set((state) => {
        state.loading = false;
      });
    },
    updateAssets: async (assets: AssetType[], assetCountries: string[]) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const updatedAssets: any = {};
        assets.map((asset) => {
          if (asset?.key) {
            updatedAssets[asset.key] = asset.amount;
          }
        });
        updatedAssets["assetCountries"] = assetCountries;
        await saveFinancialInfoApi({ assets: updatedAssets });
        await get().populateDashboardData();
        set((state) => {
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
      }
    },
    updateBalance: async (
      balance: AssetType[],
      key: string,
      additionalItems: any = {}
    ) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const updatedAssets: any = {};
        balance.map((item) => {
          if (item?.key) {
            updatedAssets[item.key] = item.amount;
          }
        });

        Object.keys(additionalItems).map(
          (key) => (updatedAssets[key] = additionalItems[key])
        );

        await saveFinancialInfoApi({ [key]: updatedAssets });
        await get().populateDashboardData();
        set((state) => {
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
      }
    },
    updateFinancialGoal: async (goal: any, id: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await updateFinancialGoalsApi(goal, id);
        await get().populateFinancialGoals();
        set((state) => {
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createFinancialGoal: async (goal: any) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await createFinancialGoalsApi(goal);
        await get().populateFinancialGoals();
        set((state) => {
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
      }
    },
    saveBudget: async (budget: any) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await saveBudgetApi(budget);
        await get().populateBudget();
        set((state) => {
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
      }
    },
  }))
);
