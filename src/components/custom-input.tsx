import React from "react";

interface CustomInputProps {
  id: string;
  value: string;
  setValue: (value: string) => void;
  label: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}

const CustomInput = ({
  id,
  value,
  label,
  setValue,
  type = "text",
  name,
  autoComplete,
  maxLength,
  minLength,
}: CustomInputProps) => {
  return (
    <div>
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="mt-2 w-full rounded-md border border-[#d7d8cc] bg-white px-3 py-3 text-sm outline-none focus:border-[#526b58]"
        autoComplete={autoComplete}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        name={name ?? id}
        onChange={(event) => setValue(event.target.value)}
        required
        value={value}
        type={type}
      />
    </div>
  );
};

export default CustomInput;
