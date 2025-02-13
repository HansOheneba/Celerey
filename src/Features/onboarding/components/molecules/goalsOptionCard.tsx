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
      className={`p-5 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${
        selected ? "border-navyLight bg-navy text-white" : "border-gray-200 bg-white hover:bg-gray-100 text-gray-700"
      }`}
    >
      <div className="flex items-start gap-1 font-helvetica text-xs text-left">
        <h3 className={`font-semibold ${selected ? "text-white" : "text-gray-700"}`}>{title}</h3>
        <p className={`font-light ${selected ? "text-white" : "text-gray-500"}`}>{description}</p>
      </div>
    </div>
  );
};
