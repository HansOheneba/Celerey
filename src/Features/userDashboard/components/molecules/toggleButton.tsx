import React from "react";
import { SubscriptionInterval } from "../../types";

interface ToggleButtonProps {
  options: Array<{
    label: string;
    value: SubscriptionInterval;
  }>;
  value: SubscriptionInterval;
  onChange: (value: SubscriptionInterval) => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium
            ${index === 0 ? "rounded-l-md" : ""}
            ${index === options.length - 1 ? "rounded-r-md" : ""}
            ${
              value === option.value
                ? "bg-navy text-white"
                : "bg-white text-navy hover:bg-gray-50"
            }
            border border-navy
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
