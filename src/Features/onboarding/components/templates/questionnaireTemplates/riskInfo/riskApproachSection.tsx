import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id:0,
    key: "high",
    title: "High risk",
    description: "I take high risks",
  },
  {
    id:1,
    key: "open-to-high",
    title: "Open to high risk",
    description: "I am willing to take high risks to earn more",
  },
  {
    id:2,
    key: "limited",
    title: "Limited risk",
    description: "A limited amount of risk is acceptable",
  },
  {
    id:3,
    key: "little",
    title: "Little risk",
    description: "I want as little risk as possible",
  },
];

export const RiskApproachScreen: React.FC<RiskOptionsScreenProps> = ({
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
        How do you approach investment risks?
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
