import { SurveyOptionProps } from "../../types";

export const OptionCard: React.FC<SurveyOptionProps> = ({
  question,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`md:py-3 border rounded-xl cursor-pointer transition-all duration-200 flex flex-row items-center justify-center w-28 h-10 ${
        selected
          ? "border-navyLight bg-navy text-white"
          : "border-gray-200 bg-white hover:bg-gray-100 text-gray-700"
      }`}
    >
      <h3
        className={` text-center text-xs ${
          selected ? "text-white" : "text-gray-700"
        }`}
      >
        {question}
      </h3>
    </div>
  );
};
