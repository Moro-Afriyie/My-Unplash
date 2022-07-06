import * as React from "react";

interface IInputProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  placeholder?: string;
  name: string;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  return (
    <div className="">
      <label
        htmlFor={props.name}
        className="block mb-2 capitalize text-sm font-medium text-labelColor"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        className="bg-white border px-4  border-labelColor drop-shadow-inputShadow text-sm h-[3.438rem] rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-grey"
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default Input;
