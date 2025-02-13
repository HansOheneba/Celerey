import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id:0,
    key: "10years-upwards",
    title: "",
    description: "More than 10 years",
  },
  {
    id:1,
    key: "5-10years",
    title: "",
    description: "5 to 10 years",
  },
  {
    id:2,
    key: "3-5years",
    title: "",
    description: "3 to 5 years",
  },
  {
    id:3,
    key: "less-than-3years",
    title: "",
    description: "Less than 3 years",
  },
];

export const InvestmentHorizonScreen: React.FC<RiskOptionsScreenProps> = ({
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
        What is your time horizon to achieve your investment objectives?
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
