import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IdentificationScreenProps } from "../../../types";
import { FileUpload } from "../../molecules/fileUpload";

export const IdentificationScreen: React.FC<IdentificationScreenProps> = ({
  value,
  onChange,
  onBack,
  onContinue,
}) => {
  const identificationTypes = [
    { value: "drivers-license", label: "Driver's License" },
    { value: "id-card", label: "ID Card" },
    { value: "passport", label: "Passport" },
  ];

  const handleTypeSelect = (type: string) => {
    onChange({
      ...value,
      type,
      uploadStatus: "idle",
    });
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-cirka mb-4">
        Thank you for submitting your personal details. We now need to verify
        your identification
      </h1>

      <p className="text-gray-600 mb-8">
        Upload an image of an identification document, <br />
        such as Driver&apos;s License, ID Card or Passport
      </p>

      <div className="w-full max-w-md mx-auto space-y-6">
        <Select value={value.type} onValueChange={handleTypeSelect}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select Identification Type" />
          </SelectTrigger>
          <SelectContent>
            {identificationTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {value.type && (
          <FileUpload
            label={value.type.replace("-", " ")}
            value={{
              file: value.file,
              fileName: value.fileName,
              uploadStatus: value.uploadStatus,
            }}
            onChange={(fileValue) => {
              onChange({
                ...value,
                ...fileValue,
              });
            }}
          />
        )}

        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={onContinue}
            className="flex-1 bg-navy hover:bg-navyLight text-white"
            disabled={value.uploadStatus !== "completed"}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
