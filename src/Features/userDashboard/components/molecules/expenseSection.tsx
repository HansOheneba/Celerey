import React from 'react'
import { Info } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ExpenseItem } from '../../types'
import formatCurrency from '@/utils/formatCurrency'
import { useDashboardStore } from '../../state'

interface ExpenseSectionProps {
  onEditClick: () => void
  expenses: ExpenseItem[]
  totalExpense: number
  currency: string
  openBudgetModal: () => void
}

const colors = [
  '#1B1856',
  '#E15B2D',
  '#8BA78D',
  '#383396',
  '#6B7280',
  '#F56767',
]

const ExpensesSection = ({
  onEditClick,
  expenses,
  totalExpense,
  currency,
  openBudgetModal,
}: ExpenseSectionProps) => {
  // Transform expenses data for the pie chart visualization
  const pieChartData = expenses.map((item) => ({
    name: item.category,
    value: Number(item.percentage),
    fill: item.color,
  }))

  const { budget } = useDashboardStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Budget Visualization Section */}
      {budget && (
        <div className="col-span-full bg-gray-50 p-6 rounded-lg mb-4 border">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-baseline gap-3">
              <h3 className="text-lg font-bold">Created Budget</h3>
              <span
                onClick={openBudgetModal}
                className="text-navyLight text-sm hover:cursor-pointer"
              >
                Modify
              </span>
            </div>

            <span className="text-sm text-gray-600">
              {budget?.duration || 0} Months
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Donut Chart */}
            {budget?.categories && (
              <div className="w-full aspect-square max-w-[250px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budget?.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="100%"
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {budget?.categories.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index]}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Budget Areas Breakdown */}
            <div className="space-y-4">
              {budget?.categories.map((category: any, index: number) => (
                <div key={category.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">
                      {category?.name || ''}
                    </span>
                    <span className="text-gray-900">
                      {Number(category?.percentage).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Number(category?.percentage).toFixed(0)}%`,
                          backgroundColor: colors[index] || '',
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {formatCurrency(
                        (category?.amount || 0).toString(),
                        currency,
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Description and Buttons */}
      {!budget?.categories && (
        <div className="flex flex-col">
          <p className="text-sm text-gray-600 mb-6">
            Managing your personal finances start from having full control of
            where your money is going. We recommend creating a budget either
            manually or allowing us to create one for you so we can make your
            personal finance journey as smooth as possible.
          </p>
          <div className="flex gap-4">
            <button
              onClick={openBudgetModal}
              className="bg-[#1B1856] text-white px-6 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors"
            >
              Create a Budget
            </button>
            {/* <button
            onClick={openGenBudgetModal}
            className="border border-[#1B1856] text-[#1B1856] px-6 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
          >
            Generate my Budget
          </button> */}
          </div>
        </div>
      )}

      {/* Expenses Overview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Expenses</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span
            onClick={onEditClick}
            className="text-navyLight text-sm hover:cursor-pointer"
          >
            Edit Category
          </span>
        </div>

        {/* Donut Chart */}
        <div className="w-full aspect-square max-w-[180px] mx-auto mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={expenses[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Annual Expenses</span>
            <span className="text-lg font-bold">
              {formatCurrency((totalExpense || 0).toString(), currency)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Expenses Categories</span>
            <span className="text-sm font-bold">{expenses?.length || 0}</span>
          </div>
        </div>

        {/* Expenses Breakdown with Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {expenses.map((expense) => (
            <div key={expense.category} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{expense.category}</span>
                <span className="text-gray-900">{expense.percentage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${expense.percentage}%`,
                      backgroundColor: expense.color,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {formatCurrency((expense?.amount || 0).toString(), currency)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpensesSection
