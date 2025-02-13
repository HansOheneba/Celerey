import { Button } from "@/components/ui/button";
import { OptionCard } from "../../molecules/goalsOptionCard";

interface InvestmentScreenProps {
  value: {
    hasInvestments?: string;
    investmentType?: string;
  };
  onChange: (value: InvestmentScreenProps["value"]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const INVESTMENT_OPTIONS = [
  { id: "stocks", title: "Stocks", description: "Investing in stocks" },
  { id: "bonds", title: "Bonds", description: "Investing in bonds" },
  {
    id: "realEstate",
    title: "Real Estate",
    description: "Investing in real estate",
  },
  {
    id: "mutualFunds",
    title: "Mutual Funds",
    description: "Investing in mutual funds",
  },
  { id: "other", title: "Other", description: "Other types of investments" },
];

export const InvestmentScreen: React.FC<InvestmentScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect = (optionId: string) => {
    onChange({ ...value, investmentType: optionId });
  };

  const handleHasInvestmentsChange = (hasInvestments: string) => {
    onChange({ ...value, hasInvestments, investmentType: hasInvestments === "no" ? "" : value.investmentType });
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-12">
        Do you currently invest in stocks, bonds, or any other investment
        vehicles
      </h1>
      <p className="text-gray-600">Do you hold any investment vehicles?</p>

      <p className="text-gray-600 mb-6">Select an option below.</p>

      <div className="flex justify-center items-center gap-6 mb-8">
        <button
          className={`px-6 py-2 rounded-md font-medium ${
            value.hasInvestments === "no"
              ? "bg-navy text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleHasInvestmentsChange("no")}
        >
          No
        </button>
        <button
          className={`px-6 py-2 rounded-md font-medium ${
            value.hasInvestments === "yes"
              ? "bg-navy text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleHasInvestmentsChange("yes")}
        >
          Yes
        </button>
      </div>

      {value.hasInvestments === "yes" && (
        <div className="space-y-4 mb-8">
          {INVESTMENT_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={value.investmentType === option.id}
              onClick={() => handleOptionSelect(option.id)}
            />
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-8 w-full max-w-md mx-auto">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={value.hasInvestments === "yes" && !value.investmentType}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
