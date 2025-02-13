'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/Features/onboarding/state'
import { SectionProgressBars } from '@/Features/onboarding/components/molecules/progressBar'
import { FinancialInfoSchema } from '@/Features/onboarding/schema'
import { OnboardingLayout } from '@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout'
import { CurrencyScreen } from '@/Features/onboarding/components/templates/financialInfoTemplates/currencyScreen'
import { FinancialDetailsScreen } from '@/Features/onboarding/components/templates/financialInfoTemplates/financialDetailsScreen'
import { SavingsDetailsScreen } from '@/Features/onboarding/components/templates/financialInfoTemplates/savingsDetailsScreen'
import { NetWorthScreen } from '@/Features/onboarding/components/templates/financialInfoTemplates/networthScreen'
import { useAuthStore } from '@/Features/auth/state'

export default function FinancialInfo() {
  const router = useRouter()
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
    populateFinancialInfo,
  } = useOnboardingStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      populateFinancialInfo()
    }
  }, [])

  useEffect(() => {
    // if (sections.personal && !sections.personal.isCompleted) {
    //   router.push('/personal-info')
    //   return
    // }

    if (currentSection !== 'financial') {
      setActiveSection('financial')
    }
  }, [sections.personal, currentSection, router, setActiveSection])

  const handleFormUpdate = useCallback(
    (updates: Partial<FinancialInfoSchema>) => {
      const updatedFinancialData = { ...formData.financial, ...updates }
      updateFormData('financial', updatedFinancialData)
    },
    [formData.financial, updateFormData],
  )

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep
    const data = formData.financial

    switch (currentStepIndex) {
      case 0: // Currency selection
        return !!data.currency
      case 1: // Income validation
        return (
          parseFloat(data.income.rentalIncome || '0') >= 0 &&
          parseFloat(data.income.dividends || '0') >= 0 &&
          parseFloat(data.income.interestIncome || '0') >= 0 &&
          parseFloat(data.income.otherIncome || '0') >= 0
        )
      case 2: // Annual expenses validation
        return (
          parseFloat(data.annualExpenses.home) >= 0 &&
          parseFloat(data.annualExpenses.childcare) >= 0 &&
          parseFloat(data.annualExpenses.education) >= 0 &&
          parseFloat(data.annualExpenses.healthcare) >= 0 &&
          parseFloat(data.annualExpenses.travel) >= 0 &&
          parseFloat(data.annualExpenses.giving) >= 0
        )
      case 3: // Assets validation
        return (
          parseFloat(data.assets.realEstate) >= 0 &&
          parseFloat(data.assets.cash) >= 0 &&
          parseFloat(data.assets.publicSecurities) >= 0 &&
          parseFloat(data.assets.privateSecurities) >= 0
        )
      case 4: // Liabilities validation
        return (
          parseFloat(data.liabilities.mortgages) >= 0 &&
          parseFloat(data.liabilities.loans) >= 0 &&
          parseFloat(data.liabilities.creditCards) >= 0 &&
          parseFloat(data.liabilities.assetFinance) >= 0 &&
          parseFloat(data.liabilities.otherLiabilities) >= 0
        )
      case 5:
        return (
          parseFloat(data.savings.currentSavings || '0') >= 0 &&
          parseFloat(data.savings.targetSavings || '0') >= 0
        )

      case 6:
        return (
          !data.emergencyFund ||
          (data.emergencyFund &&
            parseFloat(data.emergencyFund?.emergencyFundAmount || '0') >= 0)
        )
      case 7: // Retirement goals validation
        return (
          parseFloat(data.retirement.retirementAge || '0') > 0 &&
          parseFloat(data.retirement.targetRetirementIncome || '0') >= 0
        )
      case 8: // Net worth
        return true
      default:
        return true
    }
  }, [currentSection, sections, formData.financial])

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1
      updateSectionProgress(currentSection, newStep)
    } else {
      router.push('/personal-info')
    }
  }, [currentSection, sections, router, updateSectionProgress])

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1

    if (!validateCurrentStep()) {
      return
    }

    if (isLastStep) {
      completeSection('financial')
      router.push('/goals-info')
    } else {
      const newStep = currentStepIndex + 1
      updateSectionProgress(currentSection, newStep)
    }
  }, [
    currentSection,
    sections,
    validateCurrentStep,
    completeSection,
    router,
    updateSectionProgress,
  ])

  const renderStep = () => {
    const currentStepIndex = sections[currentSection]?.currentStep || 0
    const financialData = formData.financial || {}

    switch (currentStepIndex) {
      case 0:
        return (
          <CurrencyScreen
            value={financialData.currency || ''}
            onChange={(value) => handleFormUpdate({ currency: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )
      case 1:
        return (
          <FinancialDetailsScreen
            values={financialData}
            onChange={(
              section: keyof FinancialInfoSchema,
              field: string,
              value: string | number,
            ) => {
              const sectionData =
                (financialData[section] as Record<string, string | number>) ||
                {}
              handleFormUpdate({
                [section]: { ...sectionData, [field]: value },
              })
            }}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )
      case 2:
        return (
          <SavingsDetailsScreen
            values={financialData}
            onChange={(section, field, value) => {
              if (section !== field) {
                const sectionData = financialData[section] || {}
                handleFormUpdate({
                  [section]: { ...sectionData, [field]: value },
                })
              } else {
                handleFormUpdate({
                  ...financialData,
                  [field]: value,
                })
              }
            }}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )
      case 3:
        return (
          <NetWorthScreen onContinue={handleContinue} onBack={handleBack} />
        )
      default:
        return null
    }
  }

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <SectionProgressBars
          sections={sections}
          currentSection={currentSection}
        />
        <div className="mt-12">{renderStep()}</div>
      </div>
    </OnboardingLayout>
  )
}
