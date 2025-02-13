import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeAddressScreenProps {
  values: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  // we can ad more countries...
];

export const HomeAddressScreen = ({
  values,
  onChange,
  onBack,
  onContinue,
}: HomeAddressScreenProps) => {
  const isComplete =
    values.line1 &&
    values.city &&
    values.state &&
    values.postalCode &&
    values.country;

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-12">
        What&apos;s your home address
      </h1>

      <div className="space-y-4 mb-12">
        <Input
          placeholder="Enter the 1st line of your address"
          value={values.line1}
          onChange={(e) => onChange("line1", e.target.value)}
          className="h-12"
        />
        <Input
          placeholder="Enter the 2nd line of your address"
          value={values.line2}
          onChange={(e) => onChange("line2", e.target.value)}
          className="h-12"
        />
        <Input
          placeholder="Enter the city"
          value={values.city}
          onChange={(e) => onChange("city", e.target.value)}
          className="h-12"
        />
        <Input
          placeholder="Enter the county or state"
          value={values.state}
          onChange={(e) => onChange("state", e.target.value)}
          className="h-12"
        />
        <Input
          placeholder="Enter your postal code"
          value={values.postalCode}
          onChange={(e) => onChange("postalCode", e.target.value)}
          className="h-12"
        />
        <Select
          value={values.country}
          onValueChange={(val) => onChange("country", val)}
        >
          <SelectTrigger className="w-full text-left h-12">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem
                key={country}
                value={country.toLowerCase()}
                className="cursor-pointer hover:bg-purple-50"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-navy hover:bg-navyLight text-white"
          disabled={!isComplete}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
