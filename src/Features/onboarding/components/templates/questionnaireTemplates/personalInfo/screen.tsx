import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OccupationScreen } from "./occupationSection";
import { MaritalStatusScreen } from "./maritalStatusSection";
import { IdentificationScreen } from "./identificationSection";
import { HomeAddressScreen } from "./homeAddressSection";
import {
  PersonalInfoFormData,
  IdentificationDocument,
  Address,
} from "../../../../types";
import { useOnboardingStore } from "@/Features/onboarding/state";

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
    "maritalStatus",
    "identification",
    "homeAddress",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/previous-page");
    }
  }, [currentStep, router]);

  const handleContinue = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSection("personal");
      router.push("/next-page");
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
      case "maritalStatus":
        return (
          <MaritalStatusScreen
            value={localFormData.maritalStatus}
            onChange={(value) => handleSimpleUpdate("maritalStatus", value)}
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
      default:
        return null;
    }
  };

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-cirka">
          Please provide your personal information
        </h1>
        <p className="text-gray-600">
          Fill the different forms that appear from the pop-ups
        </p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">{renderStep()}</div>
      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className={`flex-1 bg-navy hover:bg-navyLight text-white`}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export { PersonalInfoScreen };
