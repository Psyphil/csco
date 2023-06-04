import React from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function CSCONumberInput(props: {
  value: number;
  label?: string;
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
  stepSize?: number;
  onChange?: (value: number) => void;
}) {
  const [value, setValue] = React.useState(props.value);
  const stepSize = props.stepSize ?? 1;

  const updateValue = (newValue: number) => {
    if (props.minValue) newValue = Math.max(props.minValue, newValue);
    if (props.maxValue) newValue = Math.min(props.maxValue, newValue);
    setValue(newValue);
    if (props.onChange) props.onChange(newValue);
  };

  const triggerOnChange = (e: any) => {
    if (props.onChange) props.onChange(e.target.value);
  };

  return (
    <div className="relative px-3 mt-1 flex" data-te-input-wrapper-init>
      <button
        className=""
        onClick={(e) => {
          e.stopPropagation();
          updateValue(value - stepSize);
        }}
      >
        <IconMinus size={20} />
      </button>
      <input
        readOnly
        type="number"
        className=" text-center -mr-[15px] peer block min-h-[auto] w-[6ch] rounded border-0 bg-transparent py-[0.33rem] leading-[1.5] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleFormControlInputNumber"
        value={value}
        placeholder={props.placeholder}
        onChange={triggerOnChange}
      />
      {props.label && (
        <label
          htmlFor="exampleFormControlInputNumber"
          className=" text-2xs pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.5] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.75rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.75rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {props.label}
        </label>
      )}
      <button
        className=""
        onClick={(e) => {
          e.stopPropagation();
          updateValue(value + stepSize);
        }}
      >
        <IconPlus size={20} />
      </button>
    </div>
  );
}
