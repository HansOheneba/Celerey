import React from 'react'
import { Info } from 'lucide-react'
import Link from 'next/link'
import formatCurrency from '@/utils/formatCurrency'

interface DebtMetrics {
  totalDebt: number
  estimatedDebtServicing: number | null
  debtServicingPeriod: number
  netBalance: number
  incomePercentage: number
  amortizedDebtPercentage: number
  incomeAmount: number
  amortizedDebtAmount: number
}

const initialMetrics: DebtMetrics = {
  totalDebt: 8252124.24,
  estimatedDebtServicing: null,
  debtServicingPeriod: 10,
  netBalance: 52124.24,
  incomePercentage: 65,
  amortizedDebtPercentage: 35,
  incomeAmount: 33880.76,
  amortizedDebtAmount: 18243.48,
}

interface IncomeVsDebtProps {
  totalDebt: { value: number; percentage: number }
  income: { value: number; percentage: number }
  incomeAndDebt: number
  userLiabilitiesEstimation: any
  openDebtModal: () => void
  openDebtServicingModal: () => void
  currency: string
}

const IncomeVsDebtSection = ({
  totalDebt,
  income,
  incomeAndDebt,
  openDebtModal,
  openDebtServicingModal,
  userLiabilitiesEstimation,
  currency,
}: IncomeVsDebtProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*  Debt Information */}
        <div className="space-y-6">
          {/* Total Debt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Total Debt</span>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <button
                onClick={openDebtModal}
                className="text-navyLight text-sm hover:underline"
              >
                Modify
              </button>
            </div>
            <span className="text-red-500 text-2xl font-bold">
              {formatCurrency(String(totalDebt?.value || 0), currency)}
            </span>
          </div>

          {/* Estimated Debt Servicing Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Estimated Debt Servicing Amount
                </span>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <button
                onClick={openDebtServicingModal}
                className="text-navyLight text-sm hover:underline"
              >
                Modify
              </button>
            </div>
            <span className="text-[#1B1856] text-2xl font-bold">
              {formatCurrency(
                String(userLiabilitiesEstimation?.servicingAmount || 0),
                currency,
              )}
            </span>
          </div>

          {/* Estimated Debt Servicing Period */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Estimated Debt Servicing Period
                </span>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              {/* <button className="text-navyLight text-sm hover:underline">
                Modify
              </button> */}
            </div>
            <span className="text-[#1B1856] text-2xl font-bold">
              {userLiabilitiesEstimation?.servicingPeriod || 0} Years
            </span>
          </div>

          {/* Speak to an Advisor Link */}
          <div>
            <Link
              href="/advisors"
              className="text-navyLight text-sm hover:underline"
            >
              Speak to an Advisor
            </Link>
          </div>
        </div>

        {/* Net Balance and Distribution */}
        <div className="space-y-6">
          {/* Net Balance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Net Balance</span>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <div className="text-navyLight text-sm hover:underline"></div>
            </div>
            <span className="text-2xl font-bold">
              {formatCurrency(String(incomeAndDebt || 0), currency)}
            </span>
          </div>

          {/* Distribution Section */}
          <div className="space-y-4">
            <span className="text-sm text-gray-600">Distribution</span>

            {/* Progress Bars Container */}
            <div className="space-y-2">
              {/* Income Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>
                    Income ({Number(income?.percentage || 0).toFixed(0)}%)
                  </span>
                  <span>
                    {formatCurrency(String(income?.value || 0), currency)}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8BA78D] rounded-full transition-all duration-500"
                    style={{
                      width: `${Number(income?.percentage).toFixed(0)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Amortized Debt Progress Bar */}
              <div className="space-y-1">
                <div className="flex mt-5 justify-between text-xs text-gray-600">
                  <span>
                    Amortized Debt (
                    {Number(totalDebt?.percentage || 0).toFixed(0)}%)
                  </span>
                  <span>
                    {formatCurrency(String(totalDebt?.value || 0), currency)}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFA500] rounded-full transition-all duration-500"
                    style={{
                      width: `${Number(totalDebt?.percentage || 0).toFixed(
                        0,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Distribution Details */}
            <div className="space-y-4 mt-4">
              {/* Income */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#8BA78D]" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Income</span>
                    <span className="text-sm text-gray-600">
                      {Number(income?.percentage || 0).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <span className="font-bold">
                  {formatCurrency(String(income?.value || 0), currency)}
                </span>
              </div>

              {/* Amortized Debt */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FFA500]" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      Amortized Debt
                    </span>
                    <span className="text-sm text-gray-600">
                      {Number(totalDebt?.percentage || 0).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <span className="font-bold">
                  {formatCurrency(String(totalDebt?.value || 0), currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeVsDebtSection
