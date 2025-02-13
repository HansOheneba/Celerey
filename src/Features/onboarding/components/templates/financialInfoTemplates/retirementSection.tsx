import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RetirementSectionProps {
  values: {
    retirementAge: string;
    targetRetirementIncome: string;
    pensionFund: string;
  };
  onChange: (field: string, value: string) => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const RetirementSection: React.FC<RetirementSectionProps> = ({
  values,
  onChange,
  isNextSectionComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
    values &&
    values.retirementAge !== "" &&
    values.targetRetirementIncome !== "" &&
    values.pensionFund !== "";

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
            3
          </div>
          <h3 className="font-medium">Retirement</h3>
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
        title="What are your goals for retirement"
        description="Please fill in your retirement details below."
        // sectionNumber={3}
        sectionTitle="Retirement"
        nextSectionTitle=""
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">What age would you like to retire?</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.retirementAge || ""}
              onChange={(e) =>
                handleInputChange("retirementAge", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">
              How much do you have in your pension fund now?
            </label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.targetRetirementIncome || ""}
              onChange={(e) =>
                handleInputChange("targetRetirementIncome", e.target.value)
              }
            />
          </div>
          {/* New Input Field */}
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">
              What is your desired Annual Retirement Income
            </label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values.pensionFund || ""}
              onChange={(e) => handleInputChange("pensionFund", e.target.value)}
            />
          </div>
        </div>
        {/* <div className="flex gap-4 mt-10">
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

export { RetirementSection };
