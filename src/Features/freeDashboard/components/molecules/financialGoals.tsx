import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Info, MoreHorizontal } from 'lucide-react'
import { ChartType } from '../../types'
import { FinancialGoal } from '@/Features/userDashboard/types'
import formatCurrency from '@/utils/formatCurrency'

interface Goal {
  name: string
  progress: number
  amount: number
  targetAmount: number
  lastUpdated: string
}

interface FinancialGoalsProps {
  Chart: ChartType
  financialGoals: FinancialGoal[]
  onModify?: () => void;
  currency: string

}

export const FinancialGoals: React.FC<FinancialGoalsProps> = ({
  Chart,
  financialGoals,
  onModify,
  currency
}) => {
  const goalColors = ['#0b026aFF', '#8A4FFF', '#FF6B6B', '#4ECB71']

  const [activeSlide, setActiveSlide] = useState(0)

  const sampleGoals: Goal[] = [
    {
      name: 'Family Holiday',
      progress: 72,
      amount: 21234.35,
      targetAmount: 30000,
      lastUpdated: '29.12.24',
    },
    {
      name: 'Pension Boost',
      progress: 45,
      amount: 15221.0,
      targetAmount: 35000,
      lastUpdated: '13.09.24',
    },
    {
      name: 'Debt Reduction',
      progress: 20,
      amount: 1001.23,
      targetAmount: 5000,
      lastUpdated: '03.10.24',
    },
    {
      name: 'Emergency Fund',
      progress: 65,
      amount: 12345.67,
      targetAmount: 20000,
      lastUpdated: '19.05.24',
    },
  ]

  const getCurrentValueLabel = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'Emergency Duration'
      case 'retirement':
        return 'Current Pension'
      case 'saving':
        return 'Current Savings'
      default:
        return 'Current Amount'
    }
  }

  const getTargetValueLabel = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'Target Duration'
      case 'retirement':
        return 'Target Pension'
      case 'saving':
        return 'Target Savings'
      default:
        return 'Target Amount'
    }
  }

  const renderGoalCard = (goal: FinancialGoal, color: string) => {
    return (
      <div className="bg-white sm:p-2 border-b border-[#AAAAAA] mt-4 mb-6 w-full">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <span className="text-base sm:text-lg font-helvatica">
              {goal.name}
            </span>
            <Info className="h-3 w-3 ml-2 text-gray-400" />
          </div>
          <p onClick={onModify} className="text-[#2117DC] font-bold hover:cursor-pointer text-sm sm:text-base">
            Modify
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          <div className="w-full sm:w-auto flex justify-center">
            <div className="w-24 h-24 sm:w-30 sm:h-32">
              <Chart
                type="radialBar"
                series={[goal.percentage]}
                options={{
                  chart: {
                    sparkline: { enabled: true },
                  },
                  colors: [color],
                  plotOptions: {
                    radialBar: {
                      hollow: { size: '55%' },
                      track: { background: '#E5E7EB' },
                      dataLabels: {
                        name: { show: false },
                        value: {
                          fontSize: '14px',
                          fontWeight: '500',
                          formatter: (val) => `${val}%`,
                          color: '#1C1F33',
                        },
                      },
                    },
                  },
                }}
                height={120}
                width={120}
              />
            </div>
          </div>

          <div className="text-center sm:text-left w-full sm:w-auto">
            <p className="font-helvatica font-bold text-sm sm:text-base">
              {getCurrentValueLabel(goal?.type || '')}
            </p>
            <div className="text-xl sm:text-2xl font-medium text-[#4F028F]">
            {goal?.type !== 'emergency'
                ? formatCurrency(goal.currentValue, currency)
                : goal.currentValue}
            </div>
            <div className="text-gray-500 mt-1 text-xs sm:text-sm">out of</div>
            <div className="text-helvatica mt-1 text-sm sm:text-base">
              {getTargetValueLabel(goal?.type || '')}
            </div>
            <div className="text-gray-500 text-helvatica text-base sm:text-xl mt-1">
              {goal?.type !== 'emergency'
                ? formatCurrency(goal.targetValue, currency)
                : goal.targetValue}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="p-3 sm:p-5 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-[#AAAAAA] pb-2">
        <h2 className="text-lg sm:text-xl font-cirka text-navy">
          Financial Goals
        </h2>
        <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 cursor-pointer" />
      </div>
      <CardContent>
        <div className="space-y-6">
          {[...financialGoals]
            .slice(activeSlide * 2, activeSlide * 2 + 2)
            .map((goal, index) => (
              <div key={`${goal.name}-${index}`}>
                {renderGoalCard(goal, goalColors[index])}
              </div>
            ))}
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(Math.ceil(sampleGoals.length / 2))].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                activeSlide === index ? 'bg-[#1C1F33]' : 'bg-gray-300'
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default FinancialGoals
