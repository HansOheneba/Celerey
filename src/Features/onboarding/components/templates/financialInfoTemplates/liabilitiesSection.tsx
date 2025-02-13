import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LiabilitiesSectionProps {
  values: {
    mortgages: string;
    loans: string;
    creditCards: string;
    assetFinance: string;
    otherLiabilities: string;
  };
  onChange: (field: string, value: string) => void;
  onContinue: () => void;
  isComplete: boolean;
  isAssetsComplete: boolean;
}

const LiabilitiesSection: React.FC<LiabilitiesSectionProps> = ({
  values,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const isComplete =
  values &&
    values?.mortgages !== "" &&
    values?.loans !== "" &&
    values?.creditCards !== "" &&
    values?.assetFinance !== "" &&
    values?.otherLiabilities !== "";

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
            4
          </div>
          <h3 className="font-medium">Liabilities</h3>
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
        title="What are your liabilities?"
        description="Enter your liabilities"
        // sectionNumber={4}
        sectionTitle="Liabilities"
        isSectionComplete={isComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Mortgages</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.mortgages || ""}
              onChange={(e) => handleInputChange("mortgages", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Loans</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.loans || ""}
              onChange={(e) => handleInputChange("loans", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Credit Cards</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.creditCards || ""}
              onChange={(e) => handleInputChange("creditCards", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Asset Finance</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.assetFinance || ""}
              onChange={(e) =>
                handleInputChange("assetFinance", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Other Liabilities</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.otherLiabilities || ""}
              onChange={(e) =>
                handleInputChange("otherLiabilities", e.target.value)
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

export { LiabilitiesSection };
