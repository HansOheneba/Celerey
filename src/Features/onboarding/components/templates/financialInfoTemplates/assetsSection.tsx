import React, { useState } from "react";
import { Modal } from "@/Features/onboarding/components/molecules/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { countries } from "@/Features/onboarding/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
interface AssetsSectionProps {
  values: {
    realEstate: string;
    cash: string;
    publicSecurities: string;
    privateSecurities: string;
    assetCountries: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
  onContinue: () => void;
  isComplete: boolean;
  isNextSectionComplete: boolean;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ values, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundColors = [
    "rgba(56, 51, 150, 0.05)", 
    "rgba(225, 91, 45, 0.05)", 
    "rgba(27, 24, 86, 0.05)", 
    "rgba(139, 167, 141, 0.05)", 
    "rgba(170, 170, 170, 0.05)", 
  ];

  const handleInputChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      onChange(field, value);
    }
  };

  const handleAddCountry = () => {
    if (selectedCountry && !values?.assetCountries?.includes(selectedCountry)) {
      const updatedCountries = values?.assetCountries ? [...values?.assetCountries, selectedCountry] : [selectedCountry];
      onChange("assetCountries", updatedCountries);
      setSelectedCountry("");
      setBgIndex((bgIndex + 1) % backgroundColors.length); // Rotate to the next color
    }
  };

  const handleRemoveCountry = (countryToRemove: string) => {
    const updatedCountries = values.assetCountries.filter(
      (country) => country !== countryToRemove
    );
    onChange("assetCountries", updatedCountries);
  };

  const isComplete =
    values?.realEstate !== "" &&
    values?.cash !== "" &&
    values?.publicSecurities !== "" &&
    values?.privateSecurities !== "" &&
    values?.assetCountries?.length > 0;

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
            3
          </div>
          <h3 className="font-medium">Assets</h3>
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
        title="What assets do you have?"
        description="Enter your asset details below."
        // sectionNumber={3}
        sectionTitle="Assets"
        nextSectionTitle="Liabilities"
        isSectionComplete={isComplete}
        isNextSectionComplete={isComplete}
      >
        <div className="space-y-2">
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Real Estate</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.realEstate || ""}
              onChange={(e) => handleInputChange("realEstate", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Cash</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.cash || ""}
              onChange={(e) => handleInputChange("cash", e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Public Securities</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.publicSecurities || ""}
              onChange={(e) =>
                handleInputChange("publicSecurities", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">Private Securities</label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="flex-1 appearance-none"
              value={values?.privateSecurities || ""}
              onChange={(e) =>
                handleInputChange("privateSecurities", e.target.value)
              }
            />
          </div>
          <div className="flex border-b border-gray-300 pb-2 items-center">
            <label className="flex-1">
              In which country(ies) are your assets
            </label>
            <div className="flex-1 flex gap-2">
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-navy"
                onClick={handleAddCountry}
                disabled={!selectedCountry}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {values?.assetCountries?.map((country, index) => {
              const bgColor = backgroundColors[index % backgroundColors.length]; 
              return (
                <div
                  key={index}
                  style={{ backgroundColor: bgColor }}
                  className="text-xs px-2 py-1 rounded flex items-center gap-1"
                >
                  {country}
                  <button
                    onClick={() => handleRemoveCountry(country)}
                    className="hover:text-gray-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
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

export { AssetsSection };
