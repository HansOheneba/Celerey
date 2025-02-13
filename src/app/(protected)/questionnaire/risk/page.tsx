'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { RiskToleranceScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/riskToleranceSection'
import { RiskReactionScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/riskReactionSection'
import { RiskAttitudeScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/riskAttitudeSection'
import { RiskApproachScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/riskApproachSection'
import { InvestmentObjectiveScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/investmentObjectiveSection'
import { InvestmentHorizonScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/investmentHorizonSection'
import { IlliquidInvestmentScreen } from '@/Features/onboarding/components/templates/questionnaireTemplates/riskInfo/illiquidInvestmentSection'
import { RiskInfoSchema } from '@/Features/onboarding/schema'
import { useOnboardingStore } from '@/Features/onboarding/state'
import { OnboardingLayout } from '@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout'
const RiskPage: React.FC = () => {
  const router = useRouter()
  const {
    formData,
    updateFormData,
    completeSection,
  } = useOnboardingStore()

  const [localFormData, setLocalFormData] = useState<RiskInfoSchema>(
    formData.risk,
  )

  // Step management
  const steps = [
    'riskTolerance',
    'riskReaction',
    'riskAttitude',
    'riskApproach',
    'investmentObjective',
    'investmentHorizon',
    'illiquidInvestment',
  ]
  const [currentStep, setCurrentStep] = useState(0)

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/questionnaire/financial')
    }
  }, [currentStep, router])

  const handleContinue = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, steps.length, completeSection, router])

  const handleFormUpdate = (updates: Partial<RiskInfoSchema>) => {
    const updatedFormData = {
      ...localFormData,
      ...updates,
    }
    setLocalFormData(updatedFormData)
    updateFormData('risk', updatedFormData)
  }

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'riskTolerance':
        return (
          <RiskToleranceScreen
            value={localFormData.riskTolerance}
            onChange={(value) => handleFormUpdate({ riskTolerance: value })}
            onBack={handleBack}
            enableBack={false}
            onContinue={handleContinue}
          />
        )
      case 'riskReaction':
        return (
          <RiskReactionScreen
            value={localFormData.riskReaction}
            onChange={(value) => handleFormUpdate({ riskReaction: value })}
            onBack={handleBack}
            enableBack={true}
            onContinue={handleContinue}
          />
        )
      case 'riskAttitude':
        return (
          <RiskAttitudeScreen
            value={localFormData.riskAttitude}
            onChange={(value) => handleFormUpdate({ riskAttitude: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}

          />
        )
      case 'riskApproach':
        return (
          <RiskApproachScreen
            value={localFormData.riskApproach}
            onChange={(value) => handleFormUpdate({ riskApproach: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}

          />
        )
      case 'investmentObjective':
        return (
          <InvestmentObjectiveScreen
            value={localFormData.investmentObjective}
            onChange={(value) =>
              handleFormUpdate({ investmentObjective: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}

          />
        )
      case 'investmentHorizon':
        return (
          <InvestmentHorizonScreen
            value={localFormData.investmentHorizon}
            onChange={(value) => handleFormUpdate({ investmentHorizon: value })}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}

          />
        )
      case 'illiquidInvestment':
        return (
          <IlliquidInvestmentScreen
            value={localFormData.illiquidInvestmentPercentage}
            onChange={(value) =>
              handleFormUpdate({ illiquidInvestmentPercentage: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={true}

          />
        )
      default:
        return null
    }
  }

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="font-helvetica max-w-xl mx-auto">
          <div className="space-y-4 max-w-3xl mx-auto">{renderStep()}</div>
        </div>
      </div>
    </OnboardingLayout>
  )
}

export default RiskPage
