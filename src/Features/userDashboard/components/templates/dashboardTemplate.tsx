'use client'
import React, { useState, useEffect } from 'react'
import { DashboardLayout } from './dashboardLayout'
import { MetricCard } from '../molecules/metricCard'
import { FinancialGoalsCard } from '../molecules/financialGoalsCard'
import BalanceOverviewCard from '../molecules/balanceOverview'
import AddFinancialGoalModal from '../molecules/addFinancialGoalModal'
import PortfolioRecommendationsModal from '../molecules/portfolioRecommendationModal'
import { DUMMY_DASHBOARD_DATA } from '../../constants'
import Link from 'next/link'
import {
  Wallet,
  PiggyBank,
  TrendingUp,
  TrendingDown,
  Banknote,
  User,
  Upload,
  MessageSquare,
  Bell,
  Search,
  Calendar,
} from 'lucide-react'
import type {
  AssetType,
  CountryType,
  ExpenseItem,
  FinancialPlan,
  EmergencyPlan,
  GeneratedBudget,
  IncomeItem,
  LiabilityItem,
  SubscriptionTier,
  FinancialGoal,
} from '../../types'
import EditAssetModal from '../molecules/editAssetModal'
import EditIncomeModal from '../molecules/editIncomeModal'
import EditExpenseModal from '../molecules/editExpenseModal'
import RiskAttitudeModal from '../molecules/riskAttitudeModal'
import InvestmentExperienceModal from '../molecules/investmentExperience'
import FinancialKnowledgeModal from '../molecules/financialknowledgeModal'
import EditDebtModal from '../molecules/editDebtModal'
import { useRouter } from 'next/navigation'
import DebtServicingModal from '../molecules/debtServicingModal'
import MiniIncomeStatementModal from '../molecules/miniIncomeStatementModal'
import CreateBudgetModal from '../molecules/createBudgetModal'
import GenerateBudgetModal from '../molecules/generateBudgetModal'
import EditLiabilitiesModal from '../molecules/editLiabilityModal'
import EmergencyFundModal from '../molecules/emergencyFundModal'
import { SubscriptionModal } from '../molecules/subscriptionModal'
import { useDashboardStore } from '../../state'

export const Dashboard: React.FC = () => {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false)
  const [isAddEmergencyModalOpen, setIsAddEmergencyModalOpen] = useState(false)
  const [financialPlans, setFinancialPlans] = useState<FinancialPlan[]>(
    DUMMY_DASHBOARD_DATA.financialPlans.map((plan) => ({
      ...plan,
      durationStart: '',
      durationEnd: '',
      durationLeft: 0,
    })),
  )
  const [emergencyPlans, setEmergencyPlans] = useState<EmergencyPlan[]>(
    DUMMY_DASHBOARD_DATA.emergencyPlans.map((plan) => ({
      ...plan,
      durationStart: '',
      durationEnd: '',
      durationLeft: 0,
    })),
  )
  const [selectedPlan, setSelectedPlan] = useState<FinancialGoal | null>()
  const [selectedEPlan, setSelectedEPlan] = useState<
    EmergencyPlan | undefined
  >()

  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(
    null,
  )
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false)

  const {
    populateDashboardData,
    data,
    populateFinancialGoals,
    populateBudget,
    financialGoals,
    populateSubscription,
    subscription
  } = useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    await populateDashboardData()
    await populateFinancialGoals()
    await populateBudget()
    await populateSubscription()
  }

  const handlePortfolioRecommendationClick = () => {
    setIsPortfolioModalOpen(true)
  }

  const handleAddGoal = (newGoal: FinancialPlan) => {
    if (selectedPlan) {
      // If modifying, update existing plan
      setFinancialPlans((prev) =>
        prev.map((plan) => (plan.name === newGoal.name ? newGoal : plan)),
      )
    } else {
      // If adding new plan
      setFinancialPlans((prev) => [...prev, newGoal])
    }
  }

  const handleModifyGoal = (goal: FinancialGoal) => {
    setSelectedPlan(goal)
    setIsAddGoalModalOpen(true)
  }

  const handleModifyEmergency = (plan: EmergencyPlan) => {
    setSelectedEPlan(plan)
    setIsAddEmergencyModalOpen(true)
  }

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isLiabilityModalOpen, setIsLiabilityModalOpen] = useState(false)
  const [isEditDebtModalOpen, setIsEditDebtModalOpen] = useState(false)
  const [incomeData, setIncomeData] = useState<IncomeItem[]>([
    {
      category: 'Dividends',
      amount: 18354.23,
      percentage: 30,
      color: '#8BA78D',
    },
    {
      category: 'Rental',
      amount: 12493.32,
      percentage: 28,
      color: '#1B1856',
    },
    {
      category: 'Interest Income',
      amount: 14245.21,
      percentage: 18,
      color: '#E15B2D',
    },
    {
      category: 'Other Income',
      amount: 9234.64,
      percentage: 24,
      color: '#383396',
    },
  ])

  const handleSaveIncome = (updatedIncome: IncomeItem[]) => {
    setIncomeData(updatedIncome)
  }
  const [liabilityData, setLiabilityData] = useState<LiabilityItem[]>([
    {
      category: 'Mortgages',
      amount: 33472.81,
      percentage: 31,
      color: '#8BA78D',
    },
    {
      category: 'Loans',
      amount: 25353.94,
      percentage: 23,
      color: '#383396',
    },
    {
      category: 'Credit Cards',
      amount: 23253.43,
      percentage: 20,
      color: '#E15B2D',
    },
    {
      category: 'Asset Finance',
      amount: 19343.65,
      percentage: 16,
      color: '#1B1856',
    },
    {
      category: 'Other Liabilities',
      amount: 14353.89,
      percentage: 10,
      color: '#6B7280',
    },
  ])
  const handleSaveLiability = (updatedLiability: LiabilityItem[]) => {
    setLiabilityData(updatedLiability)
  }

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true)
  }

  const openLiabilityModal = () => {
    setIsLiabilityModalOpen(true)
  }

  const openDebtModal = () => {
    setIsEditDebtModalOpen(true)
  }

  const handleSaveModifiedGoal = (modifiedGoal: FinancialPlan) => {
    setFinancialPlans((prev) =>
      prev.map((plan) =>
        plan.name === modifiedGoal.name ? modifiedGoal : plan,
      ),
    )
    setSelectedPlan(undefined)
  }

  const handleModifiedEmergency = (modifiedEmergency: EmergencyPlan) => {
    setEmergencyPlans((prev) =>
      prev.map((plan) =>
        plan.name === modifiedEmergency.name ? modifiedEmergency : plan,
      ),
    )
    setSelectedEPlan(undefined)
  }

  const [isEditAssetModalOpen, setIsEditAssetModalOpen] = useState(false)
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isViewRiskModal, setisViewRiskModal] = useState(false)
  const [isViewInvestModal, setisViewInvestModal] = useState(false)
  const [isViewFinancialModal, setisViewFinancialModal] = useState(false)
  const [userAssets, setUserAssets] = useState<AssetType[]>([])
  const [userLiabilities, setUserLiabilities] = useState<LiabilityItem[]>([])
  const [userLiabilitiesEstimation, setUserLiabilitiesEstimation] = useState<
    any
  >({
    servicingAmount: 0,
    servicingPeriod: 10,
  })

  const [userIncome, setUserIncome] = useState<IncomeItem[]>([])
  const [userExpense, setUserExpense] = useState<ExpenseItem[]>([])

  const [userCountries, setUserCountries] = useState<{ [key: string]: number }>(
    {},
  )

  const handleEditAssetClick = () => {
    setIsEditAssetModalOpen(true)
  }

  const handleViewRiskModal = () => {
    setisViewRiskModal(true)
  }

  const handleViewFinancialModal = () => {
    setisViewFinancialModal(true)
  }

  const handleViewInvestModal = () => {
    setisViewInvestModal(true)
  }

  const handleSaveAssets = (assets: AssetType[], countries: CountryType[]) => {
    // setUserAssets(assets)
    // setUserCountries(countries)
  }

  const [isGenBudgetModalOpen, setIsGenBudgetModalOpen] = useState(false)
  const [generatedBudget, setGeneratedBudget] = useState<
    GeneratedBudget | undefined
  >()

  const handleGenerateBudget = (budget: GeneratedBudget) => {
    setGeneratedBudget(budget)
    setIsGenBudgetModalOpen(false)
  }

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [expensesData, setExpensesData] = useState<ExpenseItem[]>([
    {
      category: 'Home',
      amount: 33472.81,
      percentage: 18,
      color: '#1B1856',
    },
    {
      category: 'Healthcare',
      amount: 25353.94,
      percentage: 8,
      color: '#D3D3D3',
    },
    {
      category: 'Education',
      amount: 14353.89,
      percentage: 23,
      color: '#FF69B4',
    },
    {
      category: 'Travel',
      amount: 23253.43,
      percentage: 15,
      color: '#E15B2D',
    },
    {
      category: 'Giving',
      amount: 19343.65,
      percentage: 13,
      color: '#383396',
    },
    {
      category: 'Childcare',
      amount: 14353.89,
      percentage: 20,
      color: '#8BA78D',
    },
  ])

  const handleSaveExpenses = (updatedExpenses: ExpenseItem[]) => {
    setExpensesData(updatedExpenses)
    setIsExpenseModalOpen(false)
  }

  const [
    isEditDebtServicingModalOpen,
    setIsEditDebtServicingModalOpen,
  ] = useState(false)

  // const handleUpdateDebtServicing = (amount: number) => {
  //   setDebtMetrics(prev => ({
  //     ...prev,
  //     estimatedDebtServicing: amount
  //   }));
  //   setIsEditDebtModalOpen(false);
  // };

  const openDebtServicingModal = () => {
    setIsEditDebtServicingModalOpen(true)
  }

  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false)

  // Handle statement download
  const handleStatementDownload = (duration: string) => {
    console.log(`Downloading statement for ${duration} months`)
  }

  const openStatementModal = () => {
    setIsStatementModalOpen(true)
  }

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)

  // Handle budget creation
  const handleCreateBudget = (duration: string, categories: any) => {
    console.log('Creating budget:', { duration, categories })
  }

  const openBudgetModal = () => {
    setIsBudgetModalOpen(true)
  }

  const handleSubscriptionSelect = (tier: SubscriptionTier) => {
    setSelectedTier(tier)
    setIsSubscriptionModalOpen(false)
    setIsPaymentModalOpen(true)
  }

  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true)
  }

  const router = useRouter()
  const handleAdvisors = () => {
    router.push('/advisors')
  }

  useEffect(() => {
    const assetColors = [
      '#1B1856',
      '#E15B2D',
      '#8BA78D',
      '#383396',
      '#6B7280',
      '#F56767',
    ]

    const assets = Object.keys(data?.assets || {}).map((key, index) => ({
      category: key
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()), // Capitalize first letter
      key,
      amount: data.assets[key].value,
      percentage: data.assets[key].percentage.toFixed(0),
      color: assetColors[index],
    }))
    setUserAssets(assets)

    const userCountries: any = {}

    ;(data?.assetCountries || []).map(
      (country: string, index: number) => (userCountries[country] = index + 1),
    )
    setUserCountries(userCountries)

    const liabilities = Object.keys(data?.liabilities || {}).map(
      (key, index) => ({
        category: key
          .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
          .replace(/^./, (str) => str.toUpperCase()), // Capitalize first letter
        key,
        amount: data.liabilities[key]?.value || 0,
        percentage: Number(data.liabilities[key]?.percentage || 0).toFixed(0),
        color: assetColors[index],
      }),
    )
    setUserLiabilities(liabilities)

    const income = Object.keys(data?.allIncome || {}).map((key, index) => ({
      category: key
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()), // Capitalize first letter
      key,
      amount: data.allIncome[key]?.value || 0,
      percentage: Number(data.allIncome[key]?.percentage || 0).toFixed(0),
      color: assetColors[index],
    }))
    setUserIncome(income)

    const expense = Object.keys(data?.expense || {}).map((key, index) => ({
      category: key
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()), // Capitalize first letter
      key,
      amount: data?.expense[key]?.value || 0,
      percentage: Number(data?.expense[key]?.percentage || 0).toFixed(0),
      color: assetColors[index],
    }))
    setUserExpense(expense)
  }, [data])

  const getCurrentDate = (): string => {
    const date = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return formatter.format(date)
  }

  return (
    <DashboardLayout onUpgradeClick={handleOpenSubscriptionModal}>
      <div className="max-w-7xl mx-auto px-3 pt-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-3">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-0">
            {/* Left Section */}
            <div className="space-y-2 w-full lg:w-auto">
              <h1 className="text-3xl lg:text-4xl text-center lg:text-start font-cirka tracking-tight">
                Welcome, {data?.userName || ''}!
              </h1>
              <div className="flex items-center text-center lg:text-start gap-1.5">
                <span className="text-sm text-center lg:text-start">
                  Premium Account
                </span>
                <span className="text-gray-400 text-sm hover:cursor-pointer">
                  ⓘ
                </span>
                <span className='bg-[#ECF4FF] text-[#0840D0] capitalize px-2 ml-1 rounded-sm'>{subscription?.plan || ''} User</span>
              </div>
              <p className="text-gray-400 text-center lg:text-start text-medium">
                Manage your money easily with Celerey.
              </p>
            </div>

            {/* <div className="flex flex-col items-start lg:items-center w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full lg:w-auto">
                <button className="flex items-center justify-center gap-2 px-3 py-3 bg-navy text-white rounded-full text-sm w-full sm:w-auto">
                  Book Virtual Consultation
                  <span className="text-sm">›</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-full text-sm w-full sm:w-auto">
                  View Advisors Recommendations
                  <span className="text-sm">›</span>
                </button>
              </div>
              <a href="#" className="text-navy text-sm underline">
                Upload Financial Documents
              </a>
            </div> */}

            {/* Right Section */}
            <div className="flex flex-col items-start lg:items-end gap-2 w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
                <div className='flex flex-col gap-y-2'>
                  <div className="flex items-center gap-2 px-2 py-2 bg-gray-50 rounded-xl text-gray-600 w-full sm:w-auto justify-center sm:justify-start">
                    <Calendar className="h-3 w-3" />
                    <span>{getCurrentDate()}</span>
                  </div>
                  <Link
                    href="/advisors"
                    passHref
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-navy text-white rounded-full text-sm w-full sm:w-auto"
                  >
                    Book Virtual Consultation
                    <span className="text-sm">›</span>
                  </Link>
                </div>
                {/* <button className="flex items-center gap-2 px-2 py-2 bg-navy text-white rounded-xl w-full sm:w-auto justify-center">
                  Export
                </button> */}
              </div>
              {/* <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start lg:justify-end">
                <button className="p-2 rounded-full border">
                  <Upload className="h-3 w-3 text-gray-600" />
                </button>
                <button className="p-2 rounded-full border relative">
                  <MessageSquare className="h-3 w-3 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 rounded-full border">
                  <Bell className="h-3 w-3 text-gray-600" />
                </button>
                <button className="p-2 rounded-full border">
                  <Search className="h-3 w-3 text-gray-600" />
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <MetricCard
            currency="usd"
            title="Net Worth"
            metric={{ value: data.netWorth, currency: data?.currency || 'usd' }}
            icon={<Wallet className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            currency={data?.currency || 'usd'}
            title="Balance"
            metric={{
              value: data?.totalIncome || 0 + data?.debt?.value || 0,
              currency: data?.currency || 'usd',
            }}
            icon={<PiggyBank className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            currency={data?.currency || 'usd'}
            title="Income"
            metric={{
              value: data?.income?.value || 0,
              currency: data?.currency || 'usd',
            }}
            icon={<TrendingUp className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            currency={data?.currency || 'usd'}
            title="Expenses"
            metric={{
              value: data.totalExpense,
              currency: data?.currency || 'usd',
            }}
            icon={<TrendingDown className="h-5 w-5 text-gray-400" />}
          />
          <MetricCard
            currency={data?.currency || 'usd'}
            title="Savings"
            metric={{ value: +data.savings, currency: data?.currency || 'usd' }}
            icon={<Banknote className="h-5 w-5 text-gray-400" />}
          />
        </div>

        {/* Financial Goals and Balance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FinancialGoalsCard
            currency={data?.currency || 'usd'}
            goals={financialGoals || []}
            onAddGoalClick={() => {
              setSelectedPlan(null)
              setIsAddGoalModalOpen(true)
            }}
            onModifyGoal={handleModifyGoal}
          />
          <BalanceOverviewCard
            currency={data?.currency || 'usd'}
            onPortfolioRecommendationClick={handlePortfolioRecommendationClick}
            onEditAssetClick={handleEditAssetClick}
            assets={userAssets}
            totalAssets={data.totalAssets || 0}
            countries={userCountries}
            incomes={userIncome}
            totalIncome={data.totalIncome}
            expenses={userExpense}
            totalExpense={data.totalExpense}
            liabilityData={userLiabilities}
            userLiabilitiesEstimation={userLiabilitiesEstimation}
            totalDebt={data?.debt || {}}
            income={data.income}
            incomeAndDebt={data.incomeAndDebt}
            totalIncomeFromExpense={data?.totalIncomeFromExpense}
            totalExpenseFromIncome={data?.totalExpenseFromIncome}
            openIncomeModal={openIncomeModal}
            openLiabilityModal={openLiabilityModal}
            onEditExpenseClick={() => setIsExpenseModalOpen(true)}
            openDebtModal={openDebtModal}
            openDebtServicingModal={openDebtServicingModal}
            openStatementModal={openStatementModal}
            openBudgetModal={openBudgetModal}
            openGenBudgetModal={() => setIsGenBudgetModalOpen(true)}
            generatedBudget={generatedBudget ?? undefined}
          />
        </div>

        {/* Financial Knowledge Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-baseline gap-x-3">
              <h3 className="font-medium font-cirka text-navy text-sm lg:text-base">
                Your Risk Attitude
              </h3>
              <span
                onClick={() => {
                  router.push('/questionnaire/risk')
                }}
                className="text-navyLight text-sm hover:cursor-pointer"
              >
                Take Assessment
              </span>
            </div>

            <button
              onClick={handleViewInvestModal}
              className="text-navyLight text-sm px-3 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            >
              View Details
            </button>
          </div>
          <p className="text-lg lg:text-xl font-bold font-cirka text-navy capitalize">
            {data?.calculatedRiskTolerance?.title ||
              data?.userRiskTolerance ||
              ''}
          </p>
        </div>

        {/* Financial Knowledge Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-baseline gap-x-3">
              <h3 className="font-medium font-cirka text-navy text-sm lg:text-base">
                Your Investment Experience
              </h3>
              <span
                onClick={() => {
                  router.push('/questionnaire/financial')
                }}
                className="text-navyLight text-sm hover:cursor-pointer"
              >
                Take Assessment
              </span>
            </div>

            <button
              onClick={handleViewInvestModal}
              className="text-navyLight text-sm px-3 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            >
              View Details
            </button>
          </div>
          <p className="text-lg lg:text-xl font-bold font-cirka text-navy capitalize">
            {data?.userFinancialKnowledge || ''}
          </p>
        </div>

        {/* Financial Knowledge Assessment Card */}
        {data?.calculatedFinancialKnowledge && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-medium font-cirka text-navy text-sm lg:text-base">
                Financial Knowledge Assessment
              </h3>
              <button
                onClick={handleViewFinancialModal}
                className="text-navyLight text-sm px-3 py-1.5 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
              >
                View Details
              </button>
            </div>
            <p className="text-lg lg:text-xl font-bold font-cirka text-navy">
              {data?.calculatedFinancialKnowledge}
            </p>
          </div>
        )}
      </div>

      {data?.calculatedRiskTolerance?.title &&
        data?.calculatedFinancialKnowledge && (
          <div className="bg-gray-50 p-4 rounded-lg mt-6 flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-6">
            <p className="text-gray-600 flex-grow text-sm lg:text-base leading-relaxed">
              You are a{' '}
              <span className="font-medium text-navy capitalize">
                {data?.calculatedRiskTolerance?.title}
              </span>{' '}
              risk taker with an{' '}
              <span className="font-medium text-navy capitalize">
                {data?.userFinancialKnowledge || ''}
              </span>{' '}
              investment experience. Notwithstanding this, your financial
              knowledge is{' '}
              <span className="font-medium text-navy capitalize">
                {data?.calculatedFinancialKnowledge}
              </span>
              . This means you have a fair grasp of finance. Although you are
              not an expert, you understand how macroeconomics works in relation
              to financial instruments. We can offer investment advice and
              assist you with proven risk management techniques to potentially
              improve your outcomes.
            </p>
            <button
              onClick={handleAdvisors}
              className="text-navyLight whitespace-nowrap hover:text-navy w-full lg:w-auto text-center lg:text-left py-3 lg:py-0 bg-gray-50 lg:bg-transparent rounded-lg lg:rounded-none transition-colors"
            >
              Speak to an Advisor
            </button>
          </div>
        )}

      <AddFinancialGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => {
          setIsAddGoalModalOpen(false)
          setSelectedPlan(undefined)
        }}
        initialData={selectedPlan}
        isModifying={!!selectedPlan}
      />

      <EmergencyFundModal
        isOpen={isAddEmergencyModalOpen}
        onClose={() => {
          setIsAddEmergencyModalOpen(false)
          setSelectedEPlan(undefined)
        }}
        onEditEmergency={handleModifiedEmergency}
        initialData={selectedEPlan}
      />

      <PortfolioRecommendationsModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
      />

      <EditAssetModal
        isOpen={isEditAssetModalOpen}
        onClose={() => setIsEditAssetModalOpen(false)}
        onSave={handleSaveAssets}
        initialAssets={userAssets}
        initialCountries={userCountries}
      />

      <EditIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onSave={handleSaveIncome}
        initialIncome={userIncome}
      />

      <EditLiabilitiesModal
        isOpen={isLiabilityModalOpen}
        onClose={() => setIsLiabilityModalOpen(false)}
        onSave={handleSaveLiability}
        initialLiabilities={userLiabilities}
        estimation={userLiabilitiesEstimation}
      />

      <EditExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSave={handleSaveExpenses}
        initialExpenses={userExpense}
      />

      <RiskAttitudeModal
        isOpen={isViewRiskModal}
        onClose={() => setisViewRiskModal(false)}
      />

      <InvestmentExperienceModal
        isOpen={isViewInvestModal}
        onClose={() => setisViewInvestModal(false)}
      />

      <FinancialKnowledgeModal
        isOpen={isViewFinancialModal}
        onClose={() => setisViewFinancialModal(false)}
      />
      <DebtServicingModal
        liabilities={userLiabilities}
        totalLiabilities={Number(data?.debt?.value) || 0}
        currentDebtAmount={userLiabilitiesEstimation?.servicingAmount || 0}
        isOpen={isEditDebtServicingModalOpen}
        onClose={() => setIsEditDebtServicingModalOpen(false)}
      />

      <MiniIncomeStatementModal
        isOpen={isStatementModalOpen}
        onClose={() => setIsStatementModalOpen(false)}
        onDownload={handleStatementDownload}
      />

      <EditDebtModal
        isOpen={isEditDebtModalOpen}
        onClose={() => setIsEditDebtModalOpen(false)}
        onSave={(updatedDebts) => {
          setIsEditDebtModalOpen(false)
        }}
      />

      <GenerateBudgetModal
        isOpen={isGenBudgetModalOpen}
        onClose={() => setIsGenBudgetModalOpen(false)}
        onGenerateBudget={handleGenerateBudget}
      />

      <CreateBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onCreateBudget={handleCreateBudget}
      />

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscriptionSelect={handleSubscriptionSelect}
      />
    </DashboardLayout>
  )
}

export default Dashboard
