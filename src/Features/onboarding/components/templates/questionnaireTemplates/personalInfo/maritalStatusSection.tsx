import { Button } from "@/components/ui/button";
import RadioGroupButton from "../../../molecules/radioGroupButton";
import { MaritalStatusScreenProps } from "../../../../types";

export const MaritalStatusScreen: React.FC<MaritalStatusScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const options = [
    { value: "married", label: "Married" },
    { value: "unmarried", label: "Unmarried" },
    { value: "single", label: "Single" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" },
    { value: "divorced", label: "Divorced" },
  ];

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-12">
        What&apos;s your marital status
      </h1>

      <RadioGroupButton
        options={options}
        value={value}
        onChange={onChange}
        name="maritalStatus"
      />

      <div className="flex gap-4 mt-8">
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
