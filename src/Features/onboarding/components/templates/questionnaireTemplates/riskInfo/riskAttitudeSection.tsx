import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id:0,
    key: "cautious",
    title: "Cautious",
    description:
      "Investors prioritizing capital preservation over high returns",
  },
  { id:1,
    key: "moderate",
    title: "Moderate",
    description: "Investors seeking a balance between risk and return",
  },
  {
    id:2,
    key: "somwhat-aggressive",
    title: "Somewhat Aggressive",
    description: "Investors willing to take on more risk for higher returns",
  },
  {
    id:3,
    key: "aggressive",
    title: "Aggressive",
    description: "Investors with high risk, focused on high returns",
  },
  {
    id:4,
    key: "very-aggressive",
    title: "Very Aggressive",
    description:
      "Investors with highest tolerance for risk, in for the highest possible returns",
  },
];

export const RiskAttitudeScreen: React.FC<RiskOptionsScreenProps> = ({
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
        How do you describe your attitude towards risk?
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
