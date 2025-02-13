import { FormInputProps } from "../../types";

export const FormInput = ({
  //   label,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: FormInputProps) => (
  <input
    id={id}
    name={name}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 border rounded-md focus:border-navy focus:ring-1 focus:ring-navy"
    required={required}
  />
);
