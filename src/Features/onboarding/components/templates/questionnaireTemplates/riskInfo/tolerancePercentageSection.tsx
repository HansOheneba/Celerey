import { Button } from "@/components/ui/button";
import { Option } from "@/Features/onboarding/types";
import { RiskOptionsScreenProps } from "@/Features/onboarding/types";  
import { OptionCard } from "@/Features/onboarding/components/molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id:0,
    key: "20-up",
    title: "",
    description: "-20% or more",
  },
  {id:1,
    key: "10-20",
    title: "",
    description: "-10% to -20%",
  },
  {id:2,
    key: "5-10",
    title: "",
    description: "-5% to -10%",
  },
  {id:3,
    key: "0-5",
    title: "",
    description: "0% to -5%",
  },
];

export const TolerancePercentageScreen: React.FC<any> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect: any = (optionId: string) => {
    onChange(optionId);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        What decrease, as a percentage of the invested amounts, can you
        tolerate?
      </h1>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value === option.id}
            onClick={() => handleOptionSelect(option.id)}
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
