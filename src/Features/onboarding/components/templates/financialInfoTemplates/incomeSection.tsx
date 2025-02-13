import React, { useState, useEffect } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IncomeSectionProps {
  values: {
    rentalIncome: string;
    dividends: string;
    interestIncome: string;
    otherIncome: string;
  };
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const IncomeSection: React.FC<IncomeSectionProps> = ({
  values,
  onChange,
  isComplete,
  isNextSectionComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  useEffect(() => {
    if (isComplete && isNextSectionComplete) {
    }
  }, [isComplete, isNextSectionComplete]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`text-xs mr-2 flex items-center justify-center w-6 h-6 rounded-full ${
              isComplete
                ? "bg-blue-900 text-white"
                : "bg-white border-blue-900 border text-blue-900"
            }`}
          >
            1
          </div>

          <h3 className="font-medium">Income</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-900 text-sm font-semibold"
        >
          {isComplete ? "Edit" : "Fill Details"}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="What is your annual passive income?"
        description="Enter your annual passive income details below."
        // sectionNumber={1}
        sectionTitle="Income"
        nextSectionTitle="Expenses"
        isSectionComplete={isComplete}
        isNextSectionComplete={isNextSectionComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Rental Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.rentalIncome || ""}
              onChange={(e) =>
                handleInputChange("rentalIncome", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Dividends</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.dividends || ""}
              onChange={(e) => handleInputChange("dividends", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Interest Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.interestIncome || ""}
              onChange={(e) =>
                handleInputChange("interestIncome", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Other Income</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.otherIncome || ""}
              onChange={(e) => handleInputChange("otherIncome", e.target.value)}
            />
          </div>
        </div>
        {/* <div className="flex gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
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

export { IncomeSection };
