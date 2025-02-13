import React from "react";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, HelpCircle } from "lucide-react";
import formatCurrency from "@/utils/formatCurrency";

interface FinancialData {
  netBalance: number;
  income: {
    amount: number;
    percentage: number;
  };
  debt: {
    amount: number;
    percentage: number;
  };
  currency: string
}

// interface IncomeVsDebtProps {}

export const IncomeVsDebt = ({income, debt, incomeAndDebt, onAddExpense, currency}: any) => {
  const financialData: FinancialData = {
    netBalance: incomeAndDebt,
    income: {
      amount: income?.value || 0,
      percentage: income?.percentage?.toFixed(2) || 0,
    },
    debt: {
      amount: debt?.value || 0,
      percentage: debt?.percentage?.toFixed(2) || 0,
    },
    currency
  };


  return (
    <Card className="p-6 w-full max-w-md bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy">Income Vs Debt</h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-y-2 gap-1">
          <span className="text-sm text-gray-600">Net Balance</span>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </div>
        <div onClick={onAddExpense} className="text-[#2117DC] text-sm hover:cursor-pointer">
          Add expense
        </div>
      </div>

      {/* Net Balance Amount */}
      <div className="mb-4">
        <div className="text-3xl font-normal mb-4">
          {formatCurrency(financialData?.netBalance?.toString() || '0', currency)}
        </div>

        <div className="text-xs text-gray-500 mb-4">Distribution</div>
      </div>

      {/* Income Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-sm font-medium">Income</span>
          </div>
          <span className="text-sm font-medium">
          {formatCurrency(financialData?.income?.amount?.toString() || '0', currency)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${financialData.income.percentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 min-w-[32px]">
            {financialData.income.percentage}%
          </span>
        </div>
      </div>

      {/* Debt Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-sm font-medium">Debt</span>
          </div>
          <span className="text-sm font-medium">
          {formatCurrency(financialData?.debt?.amount?.toString() || '0', currency)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${financialData.debt.percentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 min-w-[32px]">
            {financialData.debt.percentage}%
          </span>
        </div>
      </div>
      {/* Bottom Border */}
      <div className="border-b border-gray-200 mt-5 p-4 mb-10" />
    </Card>
  );
};
