import { Button } from "@/components/ui/button";
import { Option } from "../../../types";
import { RiskOptionsScreenProps } from "../../../types";
import { OptionCard } from "../../molecules/riskOptionCard";


const OPTIONS: Option[] = [
  {
    id:0,
    key: "low",
    title: "Low",
    description: "Investers prioritizing capital preservation over high returns",
  },
  {
    id:2,
    key: "medium",
    title: "Medium",
    description: "Investers willing to take on more risk for higher returns",
  },
  {
    id:2,
    key: "high",
    title: "High",
    description: "Investers highest highest tolerance for risk, in for highest possible returns",
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