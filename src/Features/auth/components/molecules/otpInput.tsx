import { useRef, KeyboardEvent, ChangeEvent, ClipboardEvent } from "react";

import { OTPInputProps } from "../../types";

export const OTPInput = ({ length, value, onChange }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;

    const newValue = [...value];
    if (digit.length === length) {
      // Handle paste event
      for (let i = 0; i < length; i++) {
        newValue[i] = digit[i] || "";
      }
      onChange(newValue);
      inputRefs.current[length - 1]?.focus();
    } else {
      // Handle single character input
      newValue[index] = digit;
      onChange(newValue);

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData;
    if (clipboardData) {
      const pasteData = clipboardData.getData("text");
      handleChange(index, pasteData);
      e.preventDefault();
    }
  };

  return (
    <div className="flex gap-2 justify-center my-4">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          className="w-12 h-12 border rounded-md text-center text-lg focus:border-navy focus:ring-1 focus:ring-navy"
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
        />
      ))}
    </div>
  );
};
