interface SelectInputProps {
  label: string;
  value: string | number;
  options: Array<string | number>;
  onChange: (value: string | number) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled selected className="text-gray-500">
        {label}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
