import { Check } from "lucide-react";
import { OptionCardProps } from "../../types";

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between hover:border-purple-500 ${
        selected ? "border-navyLight bg-purple-50" : "border-gray-200"
      }`}
    >
      <div className="flex items-center text-center justify-around space-x-4 font-helvetica">
        <h3 className="font-medium text-gray-700">{title},</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {selected && (
        <Check className="h-5 w-5 text-navyLight flex-shrink-0 ml-4" />
      )}
    </div>
  );
};
