"use client";

import React, { useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { OccupationScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/personalInfo/occupationSection";
import { MaritalStatusScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/personalInfo/maritalStatusSection";
import { IdentificationScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/personalInfo/identificationSection";
import { DependentsScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/personalInfo/dependentsSection";
import { HomeAddressScreen } from "@/Features/onboarding/components/templates/questionnaireTemplates/personalInfo/homeAddressSection";
import {
  PersonalInfoFormData,
  IdentificationDocument,
  Address,
} from "@/Features/onboarding/types";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { OnboardingLayout } from "@/Features/onboarding/components/templates/sharedTemplates/onboardingLayout";

const PersonalInfoScreen: React.FC = () => {
  const router = useRouter();
  const {
    formData,
    updateFormData,
    sections,
    currentSection,
    updateSectionProgress,
    completeSection,
  } = useOnboardingStore();

  const [localFormData, setLocalFormData] = useState<PersonalInfoFormData>(
    formData.personal
  );

  // Step management
  const steps = [
    "occupation",
    "homeAddress",
    "dependents",
    "maritalStatus",
    "identification",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  }, [currentStep, router]);

  const handleContinue = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSection("personal");
      router.push("/questionnaire/financial");
    }
  }, [currentStep, steps.length, completeSection, router]);

  const handleSimpleUpdate = (
    section: keyof PersonalInfoFormData,
    value: string
  ) => {
    const updatedFormData = {
      ...localFormData,
      [section]: value,
    };
    setLocalFormData(updatedFormData);
    updateFormData("personal", updatedFormData);
  };

  const handleAddressUpdate = (field: keyof Address, value: string) => {
    const updatedAddress = {
      ...localFormData.address,
      [field]: value,
    };
    const updatedFormData = {
      ...localFormData,
      address: updatedAddress,
    };
    setLocalFormData(updatedFormData);
    updateFormData("personal", updatedFormData);
  };

  const handleIdentificationUpdate = (
    updatedIdentification: IdentificationDocument
  ) => {
    const updatedFormData = {
      ...localFormData,
      identification: updatedIdentification,
    };
    setLocalFormData(updatedFormData);
    updateFormData("personal", updatedFormData);
  };
   const handleFormUpdate = (updatedFields: Partial<PersonalInfoFormData>) => {
     const updatedFormData = {
       ...localFormData,
       ...updatedFields,
     };
     setLocalFormData(updatedFormData);
     updateFormData("personal", updatedFormData);
   };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "occupation":
        return (
          <OccupationScreen
            value={localFormData.occupation}
            onChange={(value) => handleSimpleUpdate("occupation", value)}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );

      case "homeAddress":
        return (
          <HomeAddressScreen
            values={localFormData.address}
            onChange={(field, value) =>
              handleAddressUpdate(field as keyof Address, value)
            }
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case "maritalStatus":
        return (
          <MaritalStatusScreen
            value={localFormData.maritalStatus}
            onChange={(value) => handleSimpleUpdate("maritalStatus", value)}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );
      case "dependents":
        return (
          <DependentsScreen
            value={localFormData.dependents}
            onChange={(value) => handleFormUpdate({ dependents: value })}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        );

      case "identification":
        return (
          <IdentificationScreen
            value={localFormData.identification}
            onChange={handleIdentificationUpdate}
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
        <div className="font-helvetica max-w-xl mx-auto">
          
          <div className="space-y-4 max-w-md mx-auto">{renderStep()}</div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PersonalInfoScreen;
