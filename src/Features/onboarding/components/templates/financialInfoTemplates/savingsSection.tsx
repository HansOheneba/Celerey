import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SavingsSectionProps {
  values: {
    currentSavings: string;
    targetSavings: string;
  };
  onChange: (field: string, value: string) => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const SavingsSection: React.FC<SavingsSectionProps> = ({ values, onChange, isNextSectionComplete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
  values &&
    values?.currentSavings !== "" &&
    values?.targetSavings !== "";

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full ${
              isComplete
                ? "bg-blue-900 text-white"
                : "bg-white border-blue-900 border text-blue-900"
            }`}
          >
            1
          </div>
          <h3 className="font-medium">Savings</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-800 text-sm font-semibold"
        >
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="What is your annual savings"
        description="Please enter your savings details below."
        // sectionNumber={1}
        sectionTitle="Savings"
        nextSectionTitle="Emergency Fund"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Current Savings</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.currentSavings || ""}
              onChange={(e) =>
                handleInputChange("currentSavings", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Target Savings</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.targetSavings || ""}
              onChange={(e) =>
                handleInputChange("targetSavings", e.target.value)
              }
            />
          </div>
        </div>
        {/* <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="flex-1 bg-navy hover:bg-navyLight text-white"
            disabled={!isComplete}
          >
            Continue
          </Button>
        </div> */}
      </Modal>
    </div>
  );
};

export { SavingsSection };