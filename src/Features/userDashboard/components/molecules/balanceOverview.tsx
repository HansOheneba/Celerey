import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Info, MoreHorizontal, ChevronDown } from 'lucide-react'
import { worldMill } from '@react-jvectormap/world'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import IncomeSection from './incomeSection'
import ExpensesSection from './expenseSection'
import IncomeVsDebtSection from './incomeVsDebtSection'
import IncomeVsExpenditure from './incomeVsExpenditure'
import {
  AssetType,
  CountryType,
  ExpenseItem,
  GeneratedBudget,
  IncomeItem,
  LiabilityItem,
} from '../../types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { countries as countiesWithCode } from '@/Features/onboarding/countries'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import formatCurrency from '@/utils/formatCurrency'

const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((mod) => mod.VectorMap),
  { ssr: false },
)

const tabs = [
  'Assets',
  'Liabilities',
  'Income',
  'Expenses',
  'Income Vs Debt',
  'Income Vs Expenditure',
]

interface LiabilitiesProps {
  liabilityData: LiabilityItem[]
  totalDebt: { value: number; percentage: number }
  openLiabilityModal: () => void
  currency: string
}

// Component for the Liabilities Content
const LiabilitiesContent = ({
  liabilityData,
  openLiabilityModal,
  totalDebt,
  currency
}: LiabilitiesProps) => {
  const pieChartData = (liabilityData || []).map((item) => ({
    name: item.category,
    value: Number(item?.percentage || 0),
  }))

  const router = useRouter()
  const handleAdvisors = () => {
    router.push('/advisors')
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex flex-col">
          <h3 className="text-sm text-gray-600 mb-4">
            We can help you get a better grip of your liabilities. We can offer
            expert advise and help you structure an appropriate payment plan to
            service most of these liabilities efficiently while maintaining your
            financial goals.
          </h3>
          <button
            onClick={handleAdvisors}
            className="text-navyLight border border-navyLight rounded-md px-4 py-2 w-fit text-sm hover:bg-indigo-50 transition-colors"
          >
            Speak to an Advisor
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Liabilities</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span
            onClick={openLiabilityModal}
            className="text-navyLight text-sm hover:cursor-pointer"
          >
            Edit Category
          </span>
        </div>

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
                    fill={liabilityData[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Liabilities</span>
            <span className="text-lg font-bold">
            {formatCurrency((totalDebt?.value || 0).toString(), currency)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Liabilities Categories
            </span>
            <span className="text-sm font-bold">
              {liabilityData?.length || 0}
            </span>
          </div>
        </div>

        {liabilityData.map((liability) => (
          <div key={liability.category} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{liability.category}</span>
              <span className="text-gray-900">{liability.percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${liability.percentage}%`,
                    backgroundColor: liability.color,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {formatCurrency((liability?.amount || 0).toString(), currency)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface BalanceOverviewProps {
  onPortfolioRecommendationClick: () => void
  onEditAssetClick: () => void
  assets: AssetType[]
  totalAssets: any
  totalIncome: number
  totalExpense: number
  countries: { [key: string]: number }
  incomes: IncomeItem[]
  openIncomeModal: () => void
  onEditExpenseClick: () => void
  expenses: ExpenseItem[]
  openDebtModal: () => void
  openDebtServicingModal: () => void
  openStatementModal: () => void
  openBudgetModal: () => void
  openGenBudgetModal: () => void
  openLiabilityModal: () => void
  generatedBudget?: GeneratedBudget
  liabilityData: LiabilityItem[]
  totalDebt: { value: number; percentage: number }
  income: { value: number; percentage: number }
  incomeAndDebt: number
  totalIncomeFromExpense: { value: number; percentage: number }
  totalExpenseFromIncome: { value: number; percentage: number }
  userLiabilitiesEstimation: any
  currency: string
}

export default function BalanceOverview({
  onPortfolioRecommendationClick,
  onEditAssetClick,
  income,
  openIncomeModal,
  onEditExpenseClick,
  expenses,
  openDebtModal,
  openDebtServicingModal,
  openStatementModal,
  openBudgetModal,
  openGenBudgetModal,
  generatedBudget,
  liabilityData,
  openLiabilityModal,
  assets,
  countries,
  totalAssets,
  totalIncome,
  totalDebt,
  totalExpense,
  incomeAndDebt,
  incomes,
  totalIncomeFromExpense,
  totalExpenseFromIncome,
  userLiabilitiesEstimation,
  currency,
}: BalanceOverviewProps) {
  const [activeTab, setActiveTab] = useState('Assets')

  const handlePortfolioRecommendationClick = () => {
    onPortfolioRecommendationClick()
  }

  const colorScale = {
    min: 1,
    max: 4,
    values: countries,
    scale: ['#FF1493', '#0f0251', '#DB00FF', '#E15B2D'],
  }

  const pieChartData = (assets || []).map((item) => ({
    name: item.category,
    value: Number(item?.percentage || 0),
  }))

  const [isOpen, setIsOpen] = useState(false)

  const findCountry = (code: string) => {
    return countiesWithCode.find((country) => country.code === code)
  }

  const AssetsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Geographic Spread Section */}
      <div>
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-sm text-navy">
            Geographical Spread of Assets
            <Info className="inline-block ml-1 h-3 w-3 text-gray-400" />
          </h3>
          <span
            className="text-navyLight text-sm hover:cursor-pointer"
            onClick={handlePortfolioRecommendationClick}
          >
            Portfolio Recommendation
          </span>
        </div>

        <div className="h-[280px] relative mb-4">
          <VectorMap
            map={worldMill}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
            regionStyle={{
              initial: {
                fill: '#F3F4F6',
                stroke: '#E5E7EB',
                strokeWidth: 0.5,
                fillOpacity: 1,
              },
              hover: {
                fillOpacity: 0.8,
              },
            }}
            series={{
              regions: [
                {
                  scale: colorScale.scale,
                  values: colorScale.values,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  min: colorScale.min,
                  max: colorScale.max,
                  normalizeFunction: 'polynomial',
                },
              ],
            }}
            onRegionTipShow={() => false}
          />
        </div>
        <div className="flex justify-start gap-x-4 flex-wrap">
          {Object.keys(countries).map((key: string, index) => (
            <div key={index} className="flex items-center">
              <div
                style={{ background: colorScale.scale[index] }}
                className={`w-2.5 h-2.5 rounded-full  mr-2`}
              />
              <span className="text-sm text-gray-600">
                {findCountry(key)?.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Assets Overview Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-600">Assets</h3>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <span
            onClick={onEditAssetClick}
            className="text-navyLight text-sm hover:cursor-pointer"
          >
            Edit Assets
          </span>
        </div>

        <div className="w-full aspect-square max-w-[180px] mx-auto mb-3">
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
                    fill={assets[index].color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Assets</span>
            <span className="text-lg font-bold">
              ${(totalAssets || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Asset spread</span>
            <span className="text-sm font-bold">
              {Object.keys(countries || {})?.length || 0} countries
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Asset Locations</span>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Ghana, UK</p>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="text-navyLight text-sm px-2 py-1 hover:bg-gray-50 rounded-md flex items-center gap-1 transition-colors">
                    more
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 bg-white rounded-lg shadow-lg"
                >
                  <div className="space-y-1">
                    {Object.keys(countries).map((key: string, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          style={{ background: colorScale.scale[index] }}
                          className={`w-2.5 h-2.5 rounded-full  mr-2`}
                        />
                        <span className="text-sm text-gray-600">
                          {findCountry(key)?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {assets?.length &&
          assets.map((asset) => (
            <div key={asset.category} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{asset.category}</span>
                <span className="text-gray-900">{asset.percentage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-full h-1 bg-gray-100 rounded-full mr-4">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${asset.percentage}%`,
                      backgroundColor: asset.color,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  ${(asset?.amount || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  return (
    <Card className="bg-white p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-navy font-cirka">
            Balance Overview
          </h2>
          <Info className="h-3 w-3 text-gray-400" />
        </div>
        <MoreHorizontal className="h-3 w-3 text-gray-400" />
      </div>

      {/* Tabs */}
      <div className="bg-gray-50 rounded-lg p-1 mb-6">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                activeTab === tab
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="transition-all duration-300 ease-in-out">
        {activeTab === 'Assets' && <AssetsContent />}
        {activeTab === 'Liabilities' && (
          <LiabilitiesContent
            currency={currency}
            liabilityData={liabilityData}
            openLiabilityModal={openLiabilityModal}
            totalDebt={totalDebt}
          />
        )}
        {activeTab === 'Income' && (
          <IncomeSection
            currency={currency}
            income={incomes}
            totalIncome={totalIncome}
            openIncomeModal={openIncomeModal}
            openBudgetModal={openBudgetModal}
            openGenBudgetModal={openGenBudgetModal}
            generatedBudget={generatedBudget}
          />
        )}
        {activeTab === 'Expenses' && (
          <ExpensesSection
            currency={currency}
            onEditClick={onEditExpenseClick}
            expenses={expenses}
            openBudgetModal={openBudgetModal}
            totalExpense={totalExpense}
          />
        )}
        {activeTab === 'Income Vs Debt' && (
          <IncomeVsDebtSection
            currency={currency}
            totalDebt={totalDebt}
            income={income}
            userLiabilitiesEstimation={userLiabilitiesEstimation}
            incomeAndDebt={incomeAndDebt}
            openDebtModal={openLiabilityModal}
            openDebtServicingModal={openDebtServicingModal}
          />
        )}
        {activeTab === 'Income Vs Expenditure' && (
          <IncomeVsExpenditure
            currency={currency}
            totalIncome={totalIncome}
            totalIncomeFromExpense={totalIncomeFromExpense}
            totalExpenseFromIncome={totalExpenseFromIncome}
            openStatementModal={openStatementModal}
          />
        )}
      </div>
    </Card>
  )
}
