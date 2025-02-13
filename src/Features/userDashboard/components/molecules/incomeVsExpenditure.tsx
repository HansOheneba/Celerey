import React from 'react'
import { HelpCircle } from 'lucide-react'
import formatCurrency from '@/utils/formatCurrency'

interface IncomeVsExpenditureProps {
  openStatementModal: () => void
  totalIncome: number
  totalExpenseFromIncome: { value: number; percentage: number }
  totalIncomeFromExpense: { value: number; percentage: number }
  currency: string
}

const IncomeVsExpenditure = ({
  openStatementModal,
  totalIncome,
  totalExpenseFromIncome,
  totalIncomeFromExpense,
  currency,
}: IncomeVsExpenditureProps) => {
  const data = {
    profitability: 72,
    annualRevenue: totalIncome || 0,
    annualIncome: Number(totalIncomeFromExpense?.value || 0),
    incomePercentage: Number(totalIncomeFromExpense?.percentage || 0).toFixed(
      0,
    ),
    annualExpenditure: Number(totalExpenseFromIncome?.value || 0),
    expenditurePercentage: Number(
      totalExpenseFromIncome?.percentage || 0,
    ).toFixed(0),
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Profitability Section */}
      <div className="flex gap-8 items-start">
        <div className="relative w-32 h-32">
          {/* Circle progress indicator */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="54"
              className="stroke-[8] fill-none stroke-gray-200"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              className="stroke-[8] fill-none stroke-green-500"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${
                2 * Math.PI * 54 * (1 - data.profitability / 100)
              }`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
            {data.profitability}%
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">Profitability</h3>
          </div>
          <p className="text-gray-600">
            Profitability allows us to gauge your financial wellbeing at a
            snapshot. Think of this percentage as an indicator of how well you
            are managing your income based on the revenue you are generating.
          </p>
        </div>
      </div>

      {/* Revenue and Expenditure Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Annual Revenue */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg">Annual Revenue</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-4xl font-bold text-green-500 mb-4">
            {formatCurrency(String(data?.annualRevenue || 0), currency)}
          </div>
          <div className="mb-2">
            <div className="text-xl">
            {formatCurrency(String(data?.annualIncome || 0), currency)}
            </div>
            <div className="text-gray-600">Annual income</div>
          </div>
          <div className="relative pt-2">
            <div className="text-green-500 font-medium">
              {data.incomePercentage}%
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${data.incomePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Annual Expenditure */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg">Annual Expenditure</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-4xl font-bold text-red-500 mb-4">
          {formatCurrency(String(data?.annualExpenditure || 0), currency)}
          </div>
          <div className="mb-2">
            <div className="text-xl">
            {formatCurrency(String(data?.annualExpenditure || 0), currency)}
            </div>
            <div className="text-gray-600">Annual expenditure</div>
          </div>
          <div className="relative pt-2">
            <div className="text-red-500 font-medium">
              {data.expenditurePercentage}%
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${data.expenditurePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">
          Income statements allow you to evaluate your financial health and make
          business decisions. We can generate a mini-income statement to give
          you a high-level perspective of how well you are doing financially.
        </p>
        {/* <button
          onClick={openStatementModal}
          className="mt-4 px-6 py-2 border border-navyLight text-navyLight rounded-md hover:bg-indigo-50 transition-colors"
        >
          Generate Mini Income Statement
        </button> */}
      </div>
    </div>
  )
}

export default IncomeVsExpenditure
