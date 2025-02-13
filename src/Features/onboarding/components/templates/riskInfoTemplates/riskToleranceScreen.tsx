import { Button } from "@/components/ui/button";
import { Option } from "../../../types";
import { RiskOptionsScreenProps } from "../../../types";
import { OptionCard } from "../../molecules/riskOptionCard";


const OPTIONS: Option[] = [
  {
    id: 1,
    key: "low",
    title: "I prefer stability over surprises",
    description:
      "You’d rather have steady, predictable growth, even if it means missing out on big opportunities.",
  },
  {
    id: 2,
    key: "medium",
    title: "I’m open to calculated risks",
    description:
      "You’re willing to take some chances for better returns, but you still like a balance between safety and opportunity.",
  },
  {
    id: 3,
    key: "high",
    title: "I chase big wins, even if it means big swings",
    description:
      "You’re comfortable with volatility and willing to accept significant ups and downs in pursuit of higher rewards.",
  },
];

export const RiskToleranceScreen: React.FC<RiskOptionsScreenProps> = ({
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
       Which of the following statement best
        describes your risk tolerance?
      </h1>
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option, index) => (
          <OptionCard
            key={index}
            title={option.title}
            description={option.description}
            selected={value?.key === option?.key}
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