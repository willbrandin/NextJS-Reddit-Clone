import React from "react";
import classNames from "classnames";

interface InputProps {
  className?: string;
  placeholder: string;
  type: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

export const InputGroup: React.FC<InputProps> = ({
  className,
  placeholder,
  type,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          "w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white",
          {
            "border-red-500": error,
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-500">{error}</small>
    </div>
  );
};
