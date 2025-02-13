import React from 'react'
import { Card } from '@/components/ui/card'
import { MoreHorizontal, HelpCircle } from 'lucide-react'
import { ChartType } from '../../types'
import formatCurrency from '@/utils/formatCurrency'

interface IncomeAndExpenditureProps {
  Chart: ChartType
  totalIncome: string | number | object
  totalExpense: string | number | object
  totalExpenseFromIncome: {
    value: number
    percentage: number
  }
  totalIncomeFromExpense: {
    value: number
    percentage: number
  }
  currency: string
}

export const IncomeAndExpenditure: React.FC<IncomeAndExpenditureProps> = ({
  totalIncome,
  totalExpense,
  totalExpenseFromIncome,
  totalIncomeFromExpense,
  currency,
}) => {
  return (
    <Card className="p-4 sm:p-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-lg sm:text-xl font-cirka text-navy">
          Income And Expenditure
        </h2>
        <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col mb-4">
        {/*  Monthly Income and Expenditure Labels */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-600">
              Annual Income
            </span>
            <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-600">
              Annual Expenditure
            </span>
            <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          </div>
        </div>

        {/* Amount Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl sm:text-3xl font-bold text-green-800">
            {formatCurrency(totalIncome?.toString() || '0', currency)}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-red-800">
            {formatCurrency(totalExpense?.toString() || '0', currency)}
          </div>
        </div>

        {/* Income and Expenditure Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-[70px]">
          {/* Income Section */}
          <div className="relative mb-6 sm:mb-0">
            {/* Vertical Line - Adjust for mobile */}
            <div
              className="absolute left-0 w-[2px] bg-green-800 hidden sm:block"
              style={{
                height: 'calc(150% - 7rem)',
                top: '1rem',
              }}
            />
            <div className="sm:ml-2">
              <div className="text-xl sm:text-2xl font-normal">
                {formatCurrency(
                  totalIncomeFromExpense?.value?.toString() || '0',
                  currency,
                )}
              </div>
              <div className="text-sm text-gray-600">Income</div>
            </div>
            <div className="mt-2 text-green-800 font-medium">
              {totalIncomeFromExpense?.percentage?.toFixed(0)}%
            </div>
            <div className="h-2 bg-green-800 rounded-full w-full mt-2" />
          </div>

          {/* Expenditure Section */}
          <div className="relative">
            {/* Vertical Line - Adjust for mobile */}
            <div
              className="absolute left-0 w-[2px] bg-red-800 hidden sm:block"
              style={{
                height: 'calc(150% - 7rem)',
                top: '1rem',
              }}
            />
            <div className="sm:ml-2">
              <div className="text-xl sm:text-2xl font-normal">
                {formatCurrency(
                  totalExpenseFromIncome?.value?.toString() || '0',
                  currency,
                )}
              </div>
              <div className="text-sm text-gray-600">Expenditure</div>
            </div>
            <div className="mt-2 text-red-800 font-medium">
              {totalExpenseFromIncome?.percentage?.toFixed(0)}%
            </div>
            <div className="h-2 bg-red-800 rounded-full w-full sm:w-[69.2%] mt-2" />
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-b border-gray-200 mt-3 p-2 mb-5" />
    </Card>
  )
}

export default IncomeAndExpenditure
