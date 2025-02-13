import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SavingsSection } from "./savingsSection";
import { EmergencyFundsSection } from "./emergencyFundsSection";
import { RetirementSection } from "./retirementSection";
import { FinancialInfoSchema } from "@/Features/onboarding/schema";
import { useOnboardingStore } from "@/Features/onboarding/state";
import Spinner from "@/components/ui/spinner";

interface SavingsDetailsScreenProps {
  values: any;
  onChange: (
    section: keyof FinancialInfoSchema,
    field: string,
    value: string
  ) => void;
  onBack: () => void;
  onContinue: () => void;
}

const SavingsDetailsScreen: React.FC<SavingsDetailsScreenProps> = ({
  values,
  onChange,
  onBack,
  onContinue,
}) => {
  const [localFormData, setLocalFormData] =
    useState<FinancialInfoSchema>(values);
  const { saveFinancialInfo, loading } = useOnboardingStore();

  // Track completion status for each section
  const [sectionCompletion, setSectionCompletion] = useState({
    savings: false,
    emergencyFund: false,
    retirement: false,
  });

  useEffect(() => {
    setLocalFormData(values);
  }, [values]);

  useEffect(() => {
    // Check if each section is complete
    const checkSectionComplete = () => {
      const { savings, emergencyFund, retirement } = localFormData;

      const isSavingsComplete = Object.values(savings || {}).every(
        (value) => value !== ""
      );
      const isEmergencyFundComplete =
        emergencyFund?.hasEmergencyFunds !== undefined;

      const isRetirementComplete =
        retirement?.retirementAge !== "" &&
        retirement?.targetRetirementIncome !== "";

      setSectionCompletion({
        savings: isSavingsComplete,
        emergencyFund: isEmergencyFundComplete,
        retirement: isRetirementComplete,
      });
    };

    checkSectionComplete();
  }, [localFormData]);

  const handleFormUpdate = (
    section: keyof FinancialInfoSchema,
    field: string,
    value: string
  ) => {
    if (typeof localFormData[section] === "object") {
      // Update sections like savings
      setLocalFormData((prev: any) => ({
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, string>),
          [field]: value,
        },
      }));
    } else {
      setLocalFormData((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    }

    onChange(section, field, value);
  };

  const handleContinue = async () => {
    await saveFinancialInfo();
    onContinue();
  };

  // Check if all sections are complete
  const isAllSectionsComplete = Object.values(sectionCompletion).every(
    (status) => status
  );

  return (
    <div className="font-helvetica max-w-xl mx-auto">
      <div className="text-center mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-cirka">Contingent Financial details</h1>
        <p className="text-gray-600">
          Fill the different forms that appear from the pop-ups
        </p>
      </div>
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Savings Section */}
        <div className="border-b pb-4">
          <SavingsSection
            values={localFormData.savings}
            onChange={(field, value) =>
              handleFormUpdate("savings", field, value)
            }
            isComplete={sectionCompletion.savings}
            isNextSectionComplete={sectionCompletion.emergencyFund}
          />
        </div>
        <div className="border-b pb-4">
          {/* Emergency Funds Section */}
          <EmergencyFundsSection
             values={localFormData.emergencyFund}
             onChange={(field, value) => {
               handleFormUpdate('emergencyFund', field, value)            
             }}
            isComplete={sectionCompletion.emergencyFund}
            isNextSectionComplete={sectionCompletion.retirement}
          />
        </div>

        {/* Retirement Section */}
        <div className="border-b pb-4">
          <RetirementSection
            values={localFormData.retirement}
            onChange={(field, value) =>
              handleFormUpdate("retirement", field, value)
            }
            isComplete={sectionCompletion.retirement}
            isNextSectionComplete={true}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className={`flex-1 bg-navy hover:bg-navyLight text-white ${
            !isAllSectionsComplete ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isAllSectionsComplete || loading}
        >
          {loading && <Spinner className="text-white" />} Continue
        </Button>
      </div>
    </div>
  );
};

export { SavingsDetailsScreen };
