'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SectionId, useOnboardingStore } from '@/Features/onboarding/state'
import { RiskInfoSchema } from '@/Features/onboarding/schema'
import { WelcomeScreen } from '@/Features/onboarding/components/templates/riskInfoTemplates/welcomeScreen'
import { RiskToleranceScreen } from '@/Features/onboarding/components/templates/riskInfoTemplates/riskToleranceScreen'
import { SubmitScreen } from '@/Features/onboarding/components/templates/riskInfoTemplates/submitScreen'
import { OnboardingLayout } from '@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout'
import { SectionProgressBars } from '@/Features/onboarding/components/molecules/progressBar'
import { useAuthStore } from '@/Features/auth/state'
import { Option } from '@/Features/onboarding/types'

export default function RiskInfo() {
  const router = useRouter()
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
    populateRiskInfo,
  } = useOnboardingStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      populateRiskInfo()
    }
  }, [])

  useEffect(() => {
    // if (!sections.goals.isCompleted) {
    //   router.push('/goals-info')
    //   return
    // }

    if (currentSection !== 'risk') {
      setActiveSection('risk')
    }
  }, [sections.goals.isCompleted, currentSection, router, setActiveSection])

  const handleFormUpdate = useCallback(
    (updates: Partial<RiskInfoSchema>) => {
      updateFormData('risk', updates)
    },
    [updateFormData],
  )

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection].currentStep
    const data = formData.risk

    switch (currentStepIndex) {
      case 1:
        return !!data.userRiskTolerance?.title?.trim()
      default:
        return true
    }
  }, [currentSection, sections, formData.risk])

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1
      updateSectionProgress(currentSection, newStep)
    } else {
      router.push('/goals-info')
    }
  }, [currentSection, sections, router, updateSectionProgress])

  const getNextSection = useCallback(
    (currentSectionId: SectionId): SectionId | null => {
      const sectionOrder: SectionId[] = [
        'personal',
        'financial',
        'goals',
        'risk',
        'knowledge',
      ]
      const currentIndex = sectionOrder.indexOf(currentSectionId)
      return currentIndex < sectionOrder.length - 1
        ? sectionOrder[currentIndex + 1]
        : null
    },
    [],
  )

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep
    const isLastStep =
      currentStepIndex === sections[currentSection].totalSteps - 1

    if (!validateCurrentStep()) {
      return
    }

    if (isLastStep) {
      completeSection(currentSection)
      const nextSection = getNextSection(currentSection)
      if (nextSection) {
        setActiveSection(nextSection)
        router.push(`/${nextSection}-info`)
      }
    } else {
      const newStep = currentStepIndex + 1
      updateSectionProgress(currentSection, newStep)
    }
  }, [
    currentSection,
    sections,
    validateCurrentStep,
    completeSection,
    getNextSection,
    setActiveSection,
    router,
    updateSectionProgress,
  ])

  const renderStep = () => {
    const currentStepIndex = sections[currentSection].currentStep
    const riskData = formData.risk

    switch (currentStepIndex) {
      case 0:
        return <WelcomeScreen onContinue={handleContinue} onBack={handleBack} />
      case 1:
        return (
          <RiskToleranceScreen
            value={riskData.userRiskTolerance}
            onChange={(value: Option) =>
              handleFormUpdate({ userRiskTolerance: value })
            }
            enableBack={true}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )
      case 2:
        return <SubmitScreen onContinue={handleContinue} onBack={handleBack} />

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
