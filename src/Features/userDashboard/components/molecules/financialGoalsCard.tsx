import React, { useEffect, useState } from 'react'
import { CircleDollarSign, Shield, Heart } from 'lucide-react'
import { FinancialPlan, EmergencyPlan, FinancialGoal } from '../../types'
import { differenceInMonths, parseISO, format } from 'date-fns'
import formatCurrency from '@/utils/formatCurrency'

interface FinancialGoalItemProps {
  goal: FinancialGoal
  className?: string
  onModifyGoal: (goal: FinancialGoal) => void
  currency: string
}

interface FinancialGoalsCardProps {
  goals: FinancialGoal[]
  onAddGoalClick: () => void
  onModifyGoal: (goal: FinancialGoal) => void
  currency: string
}

const isEmergencyGoal = (goal: FinancialGoal) => {
  return goal?.type === 'emergency'
}

// Helper function to get the appropriate icon based on plan name
const getIcon = (name: string) => {
  switch (name) {
    case 'savings':
      return <CircleDollarSign className="w-5 h-5" />
    case 'emergency':
      return <Shield className="w-5 h-5" />
    case 'retirement':
      return <Heart className="w-5 h-5" />
    default:
      return <CircleDollarSign className="w-5 h-5" />
  }
}

// Helper function to determine progress bar color
const getProgressBarColor = (progress: number): string => {
  if (progress < 30) return 'bg-red-500'
  if (progress < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const FinancialPlanItem: React.FC<FinancialGoalItemProps> = ({
  goal,
  className = '',
  onModifyGoal,
  currency
}) => {
  const handleModifyClick = () => {
    onModifyGoal(goal)
  }
  const getMonthsBetweenDates = (
    startDate: string,
    endDate: string,
  ): number => {
    if (!startDate || !endDate) return 0
    return differenceInMonths(parseISO(endDate), parseISO(startDate))
  }



  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMM yyyy')
  }

  const getCurrentAmountLabel = (): string => {
    if (isEmergencyGoal(goal)) {
      return 'Duration'
    }
    return goal.type === 'retirement' ? 'Current Amount' : 'Current Savings'
  }

  const getCurrentAmountDisplay = (): string => {
    if (isEmergencyGoal(goal)) {
      return `${goal?.currentValue || 0}`
    }
    return formatCurrency(String(goal?.currentValue || '0'), currency).toString()
  }

  const getTargetAmountDisplay = (): string => {
    if (isEmergencyGoal(goal)) {
      return `${goal?.targetValue || 0}`
    }
    return formatCurrency(String(goal?.targetValue || '0'),currency).toString()
  }

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

  return (
    <div className={`relative w-full ${className}`}>
      {/* Progress bar section */}
      <div className="mb-3 sm:mb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor(
              goal?.percentage || 0,
            )} transition-all duration-300`}
            style={{ width: `${goal?.percentage || 0}%` }}
          />
        </div>
        <p className="text-lg sm:text-xl font-bold mt-2">
          {Number(goal?.percentage || 0).toFixed(1)}%
        </p>
      </div>

      {/* Plan details card */}
      <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {getIcon(goal?.type || '')}
            <span className="font-medium text-gray-900 text-sm sm:text-base">
              {goal.name}
            </span>
          </div>
          <button
            onClick={handleModifyClick}
            className="text-navy text-sm hover:text-navy transition-colors px-2 py-1 sm:p-0"
          >
            Modify
          </button>
        </div>

        {/* Plan details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-2 text-sm">
          <div>
            <p className="text-gray-600">
              {getCurrentValueLabel(goal?.type || '')}
            </p>
            <p className="font-medium text-gray-900">
              {getCurrentAmountDisplay()}
            </p>
          </div>

          <div>
            <p className="text-gray-600">Duration Start</p>
            <div className="flex items-center justify-between">
              <p className="text-green-600 font-medium">
                {goal?.startDate ? formatDate(goal.startDate) : 'Not Set'}
              </p>
              {!goal?.startDate && (
                <button
                  onClick={handleModifyClick}
                  className="text-navy text-xs font-bold hover:text-navyLight"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-600">
              {getTargetValueLabel(goal?.type || '')}
            </p>
            <p className="text-gray-400">{getTargetAmountDisplay()}</p>
          </div>

          <div>
            <p className="text-gray-600">Duration End</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                {' '}
                {goal?.endDate ? formatDate(goal.endDate) : 'Not Set'}
              </p>
              {!goal?.endDate && (
                <button
                  onClick={handleModifyClick}
                  className="text-navy text-xs font-bold hover:text-navyLight"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-600">Goal Duration</p>
            <p className="font-medium text-gray-900">
              {getMonthsBetweenDates(
                goal?.startDate || '',
                goal?.endDate || '',
              )}{' '}
              Months
            </p>
          </div>

          <div>
            <p className="text-gray-600">Duration Left</p>
            <p className="text-red-500 font-medium">
              {getMonthsBetweenDates(
                new Date().toISOString(),
                goal?.endDate || '',
              )}{' '}
              Months
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FinancialGoalsCard: React.FC<FinancialGoalsCardProps> = ({
  goals,
  onAddGoalClick,
  onModifyGoal,
  currency
}) => {
  const [currentPage, setCurrentPage] = React.useState(0)
  const [plansPerPage, setPlansPerPage] = useState(4)
  const totalPages = Math.ceil((goals.length + 1) / plansPerPage)
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      setPlansPerPage(window.innerWidth < 640 ? 2 : 4);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Get plans for current page
  const getCurrentPagePlans = () => {
    const startIdx = currentPage * plansPerPage
    let endIdx = startIdx + plansPerPage

    // Show all types of plans on the first page
    if (currentPage === 0) {
      endIdx = plansPerPage - 1
      return goals.slice(startIdx, endIdx)
    }

    // Show remaining plans on subsequent pages
    return goals.slice(startIdx - 1, endIdx - 1)
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <h2 className="text-lg sm:text-xl font-cirka text-navy font-medium">
            Financial & Emergency Goals
          </h2>
          <span className="text-sm text-gray-500 hover:cursor-pointer">ⓘ</span>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {goals.length} plans
      </h3>

      {/* plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        <div className="hidden sm:block absolute right-1/2 top-0 bottom-0 border-l border-dashed border-gray-200 -ml-3" />
        <div className="hidden sm:block absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-200" />

        {getCurrentPagePlans().map((goal, index: number) => (
          <FinancialPlanItem
            key={goal?.id || index}
            goal={goal}
            onModifyGoal={onModifyGoal}
            className="relative"
            currency={currency}
          />
        ))}

        {/* Add Goal button on first page */}
        {currentPage === 0 && (
          <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px] border rounded-lg border-dashed border-gray-300">
            <button
              onClick={onAddGoalClick}
              className="text-navy text-sm hover:text-navyLight font-medium transition-colors px-4 py-2 sm:p-0"
            >
              Add Goal
            </button>
          </div>
        )}
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === idx ? 'bg-navy' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FinancialGoalsCard
