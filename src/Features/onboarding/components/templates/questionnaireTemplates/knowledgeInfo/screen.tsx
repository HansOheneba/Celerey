import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Page1 } from "./page1";
import { Page2 } from "./page2";
import { Page3 } from "./page3";
import { Page4 } from "./page4";
import { Page5 } from "./page5";
import { KnowledgeInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";

const KnowledgeInfoScreen: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData, sections, currentSection, updateSectionProgress, completeSection } = useOnboardingStore();
  const [localFormData, setLocalFormData] = useState<KnowledgeInfoSchema>(formData.knowledge);
  const [isSectionComplete, setIsSectionComplete] = useState(false);

  useEffect(() => {
    setLocalFormData(formData.knowledge);
  }, [formData.knowledge]);

  useEffect(() => {
    const checkSectionComplete = () => {
      const isComplete = Object.values(localFormData).every(value => value !== "");
      setIsSectionComplete(isComplete);
    };

    checkSectionComplete();
  }, [localFormData]);

  const handleFormUpdate = (updates: Partial<KnowledgeInfoSchema>) => {
    const updatedFormData = {
      ...localFormData,
      ...updates,
    };

    setLocalFormData(updatedFormData);
    updateFormData("knowledge", updatedFormData);
  };

  const handleBack = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    if (currentStepIndex > 0) {
      const newStep = currentStepIndex - 1;
      updateSectionProgress(currentSection, newStep);
    } else {
      router.push("/previous-page");
    }
  }, [currentSection, sections, router, updateSectionProgress]);

  const handleContinue = useCallback(() => {
    const currentStepIndex = sections[currentSection].currentStep;
    const isLastStep = currentStepIndex === sections[currentSection].totalSteps - 1;

    if (!isSectionComplete) {
      alert("Please fill in all the information in the section before continuing.");
      return;
    }

    if (isLastStep) {
      // completeSection("knowledge");
      // router.push("/next-page");
    } else {
      const newStep = currentStepIndex + 1;
      updateSectionProgress(currentSection, newStep);
    }
  }, [currentSection, sections, isSectionComplete, completeSection, router, updateSectionProgress]);

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-cirka">Please provide your financial knowledge and experience</h1>
        <p className="text-gray-600">Fill the different forms that appear from the pop-ups</p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="border-b pb-4">
          <Page1
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            enableBack={false}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <Page2
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <Page3
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <Page4
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
        <div className="border-b pb-4">
          <Page5
            value={localFormData}
            onChange={handleFormUpdate}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className={`flex-1 bg-navy hover:bg-navyLight text-white ${
            !isSectionComplete ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isSectionComplete}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export { KnowledgeInfoScreen };
