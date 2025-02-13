import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id:0,
    key: "compound",
    title: "Compound",
    description: "Significant increase in capital",
  },
  {
    id:1,
    key: "accumulate",
    title: "Accumulate",
    description: "Accumulation of capital",
  },
  {
    id:2,
    key: "grow",
    title: "Grow",
    description: "Moderate growth in capital",
  },
  {
    id:3,
    key: "protect",
    title: "Protect",
    description: "Protection of capital",
  },
];

export const InvestmentObjectiveScreen: React.FC<RiskOptionsScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect = (option: Option) => {
    onChange(option);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        What is your main objective for investing?
      </h1>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value.key === option.key}
            onClick={() => handleOptionSelect(option)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!value}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
