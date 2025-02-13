import { Button } from "@/components/ui/button";
import RadioGroupButton from "../../../molecules/radioGroupButton";
import { OccupationScreenProps } from "../../../../types";

export const OccupationScreen: React.FC<OccupationScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const options = [
    { value: "student", label: "Student" },
    { value: "business", label: "Business" },
    { value: "retired", label: "Retired" },
    { value: "employed", label: "Employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "homemaker", label: "Homemaker" },
  ];

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-12">What&apos;s your occupation</h1>

      <RadioGroupButton
        options={options}
        value={value}
        onChange={onChange}
        name="occupation"
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
