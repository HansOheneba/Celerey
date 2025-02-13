import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartType, TimeframeKey } from "../../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import formatCurrency from "@/utils/formatCurrency";

interface BalanceOverviewProps {
  Chart: ChartType;
  timeframe: TimeframeKey;
  onTimeframeChange: (timeframe: TimeframeKey) => void;
  assets: any;
  liabilities: any;
  income: any;
  expense: any;
  currency: string;
  onAddCategory: () => void;
  // annualIncome: {
  //   Rental: number;
  //   Dividends: number;
  //   "Interest Income": number;
  //   "Other Income": number;
  // };
  // annualExpenditure: {
  //   Home: number;
  //   Childcare: number;
  //   Education: number;
  //   Healthcare: number;
  //   Travel: number;
  //   Giving: number;
  // };
}

type IncomeCategory =
  | "Dividends"
  | "Rental"
  | "Interest Income"
  | "Other Income";
type ExpenditureCategory =
  | "Education"
  | "Childcare"
  | "Home"
  | "Travel"
  | "Healthcare"
  | "Giving";

interface DataItem {
  name: IncomeCategory | ExpenditureCategory;
  value: number;
  percentage?: number;
  height: string;
}

interface ColorMappings {
  [key: string]: string;
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  assets,
  liabilities,
  expense,
  income,
  onAddCategory,
  currency = "usd",
}) => {
  // Dummy data
  const realEstate = {
    percentage: assets.realEstate.percentage,
    value: assets.realEstate.value,
  };
  const privateSecurities = {
    percentage: assets.privateSecurities.percentage,
    value: assets.privateSecurities.value,
  };
  const publicSecurities = {
    percentage: assets.publicSecurities.percentage,
    value: assets.publicSecurities.value,
  };
  const cash = {
    percentage: assets.cash.percentage,
    value: assets.cash.value,
  };

  // =====

  const mortgages = {
    percentage: liabilities.mortgages?.percentage,
    value: liabilities.mortgages?.value,
  };
  const creditCards = {
    percentage: liabilities.creditCards?.percentage,
    value: liabilities.creditCards?.value,
  };
  const loans = {
    percentage: liabilities.loans?.percentage,
    value: liabilities.loans?.value,
  };
  const assetFinance = {
    percentage: liabilities.assetFinance?.percentage,
    value: liabilities.assetFinance?.value,
  };
  const otherLiability = {
    percentage: liabilities.otherLiabilities?.percentage,
    value: liabilities.otherLiabilities?.value,
  };

  const liabilityData = [
    { name: "Mortgages", value: mortgages.percentage },
    { name: "Credit Cards", value: creditCards.percentage },
    { name: "Loans", value: loans.percentage },
    { name: "Asset Finance", value: assetFinance.percentage },
    { name: "Other Liability", value: otherLiability.percentage },
  ];

  const assetData = [
    { name: "Real Estate", value: realEstate.percentage },
    { name: "Private Securities", value: privateSecurities.percentage },
    { name: "Public Securities", value: publicSecurities.percentage },
    { name: "Cash", value: cash.percentage },
  ];

  const assetCOLORS = ["#1B1856", "#8BA78D", "#E15B2D", "#383396"];
  const liabilityCOLORS = [
    "#1B1856",
    "#8BA78D",
    "#E15B2D",
    "#383396",
    "#AAAAAA",
  ];

  const dummyAnnualIncome = {
    Rental: income.rentalIncome,
    Dividends: income.dividends,
    "Interest Income": income.interestIncome,
    "Other Income": income.otherIncome,
  };

  const dummyAnnualExpenditure = {
    Home: expense.home,
    Childcare: expense.childcare,
    Education: expense.education,
    Healthcare: expense.healthcare,
    Travel: expense.travel,
    Giving: expense.giving,
  };

  const incomeData = Object.entries(dummyAnnualIncome).map(([name, value]) => ({
    name,
    value: value?.value || 0,
  }));
  const expenditureData = Object.entries(dummyAnnualExpenditure).map(
    ([name, value]) => ({ name, value: value?.value || 0 })
  );

  const incomeColors: Record<IncomeCategory, string> = {
    Dividends: "#4A1D96",
    Rental: "#F65A3B",
    "Interest Income": "#8BA78D",
    "Other Income": "#383396",
  };

  const expenditureColors: Record<ExpenditureCategory, string> = {
    Education: "#FF6B6B",
    Childcare: "#8BA78D",
    Home: "#1B1856",
    Travel: "#E15B2D",
    Healthcare: "#AAAAAA",
    Giving: "#383396",
  };

  // Transform and sort income data
  const sortedIncomeData = Object.entries(dummyAnnualIncome)
    .map(([name, value]) => ({
      name: name as IncomeCategory,
      value: value?.value || 0,
    }))
    .sort((a, b) => b.value - a.value);

  const totalIncome = sortedIncomeData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Calculate percentages and heights for income bars
  const incomeWithHeights: DataItem[] = sortedIncomeData.map((item) => ({
    ...item,
    percentage: (item.value / totalIncome) * 100,
    height: `${(item.value / totalIncome) * 100}%`,
  }));

  // Transform and sort expenditure data
  const sortedExpenditureData = Object.entries(dummyAnnualExpenditure)
    .map(([name, value]) => ({
      name: name as ExpenditureCategory,
      value: value?.value || 0,
    }))
    .sort((a, b) => b.value - a.value);

  const totalExpenditure = sortedExpenditureData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Calculate percentages and heights for expenditure bars
  const expenditureWithHeights: DataItem[] = sortedExpenditureData.map(
    (item) => ({
      ...item,
      percentage: (item.value / totalExpenditure) * 100,
      height: `${(item.value / totalExpenditure) * 100}%`,
    })
  );

  // Function to get color
  const getIncomeColor = (category: IncomeCategory): string =>
    incomeColors[category];
  const getExpenditureColor = (category: ExpenditureCategory): string =>
    expenditureColors[category];

  return (
    <Card className="bg-white p-4 w-full">
      {/* Header */}
      <div className="flex justify-between p-2 items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-xl font-cirka text-navy md:text-2xl">
          Balance Overview
        </h2>
        <MoreHorizontal className="h-6 w-6 text-gray-400 cursor-pointer" />
      </div>

      <CardContent>
        {/* Assets Section */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-gray-700 font-cirka text-xl">Assets</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>

          <div onClick={onAddCategory}>
            <p className="text-[#2117DC] hover:cursor-pointer">Edit category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-b border-[#AAAAAA]">
          {/* Pie Chart  */}
          <div className="flex justify-center md:block">
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={assetCOLORS[index % assetCOLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            {/* Real Estate */}
            <div>
              <div className="mb-2">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Real Estate</span>
                  <span>{realEstate.percentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#1B1856] rounded-full"
                    style={{ width: `${realEstate.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(realEstate.value, currency)}
                </div>
              </div>

              {/* Private Securities */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Private Securities</span>
                  <span>{privateSecurities.percentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#8BA78D] rounded-full"
                    style={{ width: `${privateSecurities.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(privateSecurities.value, currency)}
                </div>
              </div>
            </div>

            {/* Cash and Public Securities */}
            <div>
              {/* Cash */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Cash</span>
                  <span>{cash.percentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#383396] rounded-full"
                    style={{ width: `${cash.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  ${cash.value.toLocaleString()}
                </div>
              </div>

              {/* Public Securities */}
              <div className="mb-6">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Public Securities</span>
                  <span>{publicSecurities.percentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#E15B2D] rounded-full"
                    style={{ width: `${publicSecurities.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(publicSecurities.value, currency)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Liabilities Section */}
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-gray-700 font-cirka text-xl">Liabilities</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>

          <div onClick={onAddCategory}>
            <p className="text-[#2117DC] hover:cursor-pointer">Edit category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-b border-[#AAAAAA]">
          {/* Pie Chart */}
          <div className="flex justify-center md:block">
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie
                  data={liabilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {liabilityData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={liabilityCOLORS[index % liabilityCOLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Liability Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            {/* Mortgages and Credit Cards */}
            <div>
              {/* Mortgages */}
              <div className="mb-2">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Mortgages</span>
                  <span>{mortgages.percentage?.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#1B1856] rounded-full"
                    style={{ width: `${mortgages.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(mortgages.value, currency)}
                </div>
              </div>

              {/* Credit Cards */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Credit Cards</span>
                  <span>{creditCards.percentage?.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#8BA78D] rounded-full"
                    style={{ width: `${creditCards.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(creditCards.value, currency)}
                </div>
              </div>
            </div>

            {/* Asset Finance and Loans */}
            <div>
              {/* Asset Finance */}
              <div>
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Asset Finance</span>
                  <span>{assetFinance.percentage?.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#383396] rounded-full"
                    style={{ width: `${assetFinance.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(assetFinance.value, currency)}
                </div>
              </div>

              {/* Loans */}
              <div className="mb-6">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Loans</span>
                  <span>{loans.percentage?.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#E15B2D] rounded-full"
                    style={{ width: `${loans.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(loans.value, currency)}
                </div>
              </div>

              {/* Loans */}
              <div className="mb-6">
                <div className="flex justify-between text-gray-700 font-medium mb-2">
                  <span>Other Liabilities</span>
                  <span>{otherLiability.percentage?.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#AAAAAA] rounded-full"
                    style={{ width: `${otherLiability.percentage}%` }}
                  ></div>
                </div>
                <div className="text-left text-gray-700 mb-3 mt-2">
                  {formatCurrency(otherLiability.value, currency)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Income and Expenditure Section */}
      <CardContent className="border-b border-[#AAAAAA]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Annual Income */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-gray-700 font-cirka text-xl">
                Annual Income
              </h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
            <div className="flex space-x-8">
              {/* Stacked Bar */}
              <div className="w-16 h-64 bg-gray-100 relative">
                {incomeWithHeights.map((item, index) => (
                  <div
                    key={item.name}
                    className="absolute bottom-0 w-full"
                    style={{
                      height: item.height,
                      backgroundColor: getIncomeColor(
                        item.name as IncomeCategory
                      ),
                      top: `${incomeWithHeights
                        .slice(0, index)
                        .reduce((sum, i) => sum + (i.percentage || 0), 0)}%`,
                    }}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="flex flex-col justify-center space-y-2">
                {incomeWithHeights.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3"
                      style={{
                        backgroundColor: getIncomeColor(
                          item.name as IncomeCategory
                        ),
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          item.value,
                          currency
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Annual Expenditure */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-gray-700 font-cirka text-xl">
                Annual Expenditure
              </h3>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
            <div className="flex space-x-8">
              {/* Stacked Bar */}
              <div className="w-16 h-64 bg-gray-100 relative">
                {expenditureWithHeights.map((item, index) => (
                  <div
                    key={item.name}
                    className="absolute bottom-0 w-full"
                    style={{
                      height: item.height,
                      backgroundColor: getExpenditureColor(
                        item.name as ExpenditureCategory
                      ),
                      top: `${expenditureWithHeights
                        .slice(0, index)
                        .reduce((sum, i) => sum + (i.percentage || 0), 0)}%`,
                    }}
                  />
                ))}
              </div>
              {/* Legend */}
              <div className="flex flex-col justify-center space-y-2">
                {expenditureWithHeights.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3"
                      style={{
                        backgroundColor: getExpenditureColor(
                          item.name as ExpenditureCategory
                        ),
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          item.value,
                          currency
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2">
        <div className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
          <div className="font-helvetica text-medium pr-2 text-center sm:text-left">
            Need Help?
          </div>
          <div className="text-xs font-helvetica text-gray-300 text-center sm:text-left sm:w-[140px]">
            Get Financial advice on maximizing the returns on your money.
          </div>
        </div>
        <div
          onClick={onAddCategory}
          className="font-bold text-sm text-[#E15B2D] text-center sm:text-right hover:underline cursor-pointer"
        >
          Request Advisory Service
        </div>
      </div>
    </Card>
  );
};

export default BalanceOverview;
