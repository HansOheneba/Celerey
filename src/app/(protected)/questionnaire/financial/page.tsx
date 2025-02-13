"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Page1 } from "@/Features/onboarding/components/templates/questionnaireTemplates/knowledgeInfo/page1";
import { Page2 } from "@/Features/onboarding/components/templates/questionnaireTemplates/knowledgeInfo/page2";
import { Page3 } from "@/Features/onboarding/components/templates/questionnaireTemplates/knowledgeInfo/page3";
import { Page4 } from "@/Features/onboarding/components/templates/questionnaireTemplates/knowledgeInfo/page4";
import { Page5 } from "@/Features/onboarding/components/templates/questionnaireTemplates/knowledgeInfo/page5";
import { KnowledgeInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";

const FinancialPage: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, completeSection } = useOnboardingStore();

  const [localFormData, setLocalFormData] = useState<KnowledgeInfoSchema>(
    formData.knowledge
  );

  // Step management
  const steps = ["page1", "page2", "page3", "page4", "page5"];
  const [currentStep, setCurrentStep] = useState(0);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/questionnaire/financial");
    }
  }, [currentStep, router]);

  const handleContinue = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // completeSection("knowledge");
      // router.push("/questionnaire/");
    }
  }, [currentStep, steps.length, completeSection, router]);

  const handleFormUpdate = (updates: Partial<KnowledgeInfoSchema>) => {
    const updatedFormData = {
      ...localFormData,
      ...updates,
    };
    setLocalFormData(updatedFormData);
    updateFormData("knowledge", updatedFormData);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "page1":
        return (
          <Page1
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
            enableBack={false}
          />
        );
      case "page2":
        return (
          <Page2
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case "page3":
        return (
          <Page3
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case "page4":
        return (
          <Page4
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case "page5":
        return (
          <Page5
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="font-helvetica max-w-3xl mx-auto">
         
          <div className="space-y-4 max-w-3xl mx-auto">{renderStep()}</div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FinancialPage;
