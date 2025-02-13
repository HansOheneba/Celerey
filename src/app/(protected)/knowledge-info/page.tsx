'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { KnowledgeInfoSchema } from '@/Features/onboarding/schema'
import { useOnboardingStore } from '@/Features/onboarding/state'
import { SectionProgressBars } from '@/Features/onboarding/components/molecules/progressBar'
import { OnboardingLayout } from '@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout'
import { KnowledgeLevelScreen } from '@/Features/onboarding/components/templates/knowledgeInfoTemplates/knowledgeLevelScreen'
import { SubmitScreen } from '@/Features/onboarding/components/templates/knowledgeInfoTemplates/submitScreen'
import { useAuthStore } from '@/Features/auth/state'

export default function KnowledgeInfo() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const {
    sections,
    currentSection,
    formData,
    updateFormData,
    updateSectionProgress,
    completeSection,
    setActiveSection,
    populateKnowledgeInfo,
  } = useOnboardingStore()

  useEffect(() => {
    if (isAuthenticated) {
      populateKnowledgeInfo()
    }
  }, [])

  useEffect(() => {
    // if (!sections?.risk?.isCompleted) {
    //   router.push("/risk-info");
    //   return;
    // }

    if (currentSection !== 'knowledge') {
      setActiveSection('knowledge')
    }
  }, [sections, currentSection, router, setActiveSection])

  const handleFormUpdate = useCallback(
    (updates: Partial<KnowledgeInfoSchema>) => {
      updateFormData('knowledge', updates)
    },
    [updateFormData],
  )

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepIndex = sections[currentSection]?.currentStep
    const data = formData.knowledge

    if (!data) return false

    switch (currentStepIndex) {
      case 1:
        return !!data.knowledgeLevel.trim()
      default:
        return true
    }
  }, [currentSection, sections, formData])

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection]?.currentStep
    if (currentStepIndex > 0) {
      updateSectionProgress(currentSection, currentStepIndex - 1)
    } else {
      router.push('/risk-info')
    }
  }, [currentSection, sections, router, updateSectionProgress])

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection]?.currentStep
    const isLastStep =
      currentStepIndex === sections[currentSection]?.totalSteps - 1

    if (!validateCurrentStep()) {
      console.error('Validation failed on step:', currentStepIndex)
      return
    }

    if (isLastStep) {
      completeSection('knowledge')
      router.replace('/freebie')
    } else {
      updateSectionProgress(currentSection, currentStepIndex + 1)
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
    const knowledgeData = formData.knowledge || {}

    switch (currentStepIndex) {
      case 0:
        return (
          <KnowledgeLevelScreen
            value={knowledgeData.knowledgeLevel}
            onChange={(value: string) =>
              handleFormUpdate({ knowledgeLevel: value })
            }
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )
      case 1:
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
