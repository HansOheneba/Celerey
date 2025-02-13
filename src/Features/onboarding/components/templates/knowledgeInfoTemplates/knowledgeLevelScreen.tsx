import { Button } from "@/components/ui/button";
import { Option, RiskOptionsScreenProps } from "../../../types";
import { OptionCard } from "../../molecules/riskOptionCard";

const OPTIONS: Option[] = [
  {
    id:0,
    key: "beginner",
    title: "Beginner,",
    description: "I have a fair idea oh how finances work",
  },
  {
    id:1,
    key: "intermediate",
    title: "Intermediate,",
    description: "I have a fair idea about asset management",
  },
  {
    id:2,
    key: "advanced",
    title: "Advanced,",
    description: "i understand how to manage passice and active incomes",
  },
];

export const KnowledgeLevelScreen: React.FC<any> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const handleOptionSelect:any = (optionId: string) => {
    onChange(optionId);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="mb-4">
        <h1 className="text-4xl font-cirka mb-4">
          How would you rate your financial knowledge?
        </h1>
        <p>What is your financial knowledge level?</p>
      </div>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            selected={value === option.key}
            onClick={() => handleOptionSelect(option.key)}
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
