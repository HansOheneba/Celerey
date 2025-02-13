import { RadioGroupProps } from "../../types";

const RadioGroupButton: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-center justify-between w-full px-4 py-3
            border rounded-lg cursor-pointer transition-all
            ${
              value === option.value
                ? "border-navy bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <span className="text-base text-gray-900">{option.label}</span>
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${value === option.value ? "border-navy" : "border-gray-300"}
            `}
          >
            {value === option.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-navy" />
            )}
          </div>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
        </label>
      ))}
    </div>
  );
};

export default RadioGroupButton;
