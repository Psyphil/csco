import React from "react";
import Enum from "../utilities/enum";

export default function CSCOSelect(props: {
  options: Enum | { label: string; value: string };
  multiple?: true;
  search?: true;
  clear?: true;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  const labelFix = !props.multiple && props.label !== undefined;

  const triggerOnChange = (e: any) => {
    if (props.onChange) props.onChange(e.value);
  };

  const optionList = Enum.isEnum(props.options)
    ? Enum.project(props.options as Enum, ([key, value]) => ({
        label: key,
        value,
      }))
    : (props.options as { label: string; value: string }[]);

  React.useEffect(() => {
    const select = selectRef.current;
    select?.addEventListener("valueChange.te.select", triggerOnChange);

    return () => {
      select?.removeEventListener("valueChange.te.select", triggerOnChange);
    };
  });

  if (labelFix) optionList.splice(0, 0, { label: "", value: "" });

  return (
    <div className="relative mt-1">
      <select
        data-te-select-init
        data-te-select-size="sm"
        data-te-select-clear-button={props.clear}
        multiple={props.multiple}
        data-te-select-filter={props.search}
        data-te-select-placeholder={props.placeholder}
        defaultValue={props.multiple ? [] : ""}
        ref={selectRef}
      >
        {optionList.map((entry, index) => (
          <option
            key={entry.label as string}
            value={entry.value}
            hidden={labelFix && index === 0}
          >
            {entry.label.toString()}
          </option>
        ))}
      </select>
      {props.label && (
        <label data-te-select-label-ref className="text-2xs">
          {props.label}
        </label>
      )}
    </div>
  );
}
