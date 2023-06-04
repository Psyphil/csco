import { ILineupFilter } from "../providers/lineupsProvider";
import Enum from "../utilities/enum";
import ReactSelect from "react-select";

const classNames = {
  container: () => "flex-shrink-0",
  control: (state: { isDisabled: boolean; isFocused: boolean }) =>
    "items-center border rounded border-dark dark:bg-dark-300 px-1 py-0.5 !min-h-0",
  option: (state: {
    isDisabled: boolean;
    isFocused: boolean;
    isSelected: boolean;
  }) => "hover:bg-primary ",
  menuList: () => "border rounded border-dark dark:bg-dark-300 mt-2 p-2",
};

export default function Select({
  defaultIndex,
  filterProp,
  placeholder,
  filterEnum,
  onChange,
  isSingle,
}: {
  defaultIndex?: number;
  filterProp: keyof ILineupFilter;
  placeholder: string;
  filterEnum: Enum;
  onChange: (prop: keyof ILineupFilter, newValue: any) => void;
  isSingle?: true;
}) {
  const options = Enum.keys(filterEnum).map((key, index) => ({
    value: filterEnum[key],
    label: placeholder && index === defaultIndex ? placeholder : key,
  }));
  return isSingle ? (
    <ReactSelect
      unstyled
      classNames={classNames}
      name={filterProp}
      placeholder={placeholder}
      options={options}
      defaultValue={
        defaultIndex !== undefined ? options[defaultIndex] : undefined
      }
      onChange={(value) => onChange(filterProp, value?.value)}
    />
  ) : (
    <ReactSelect
      unstyled
      classNames={classNames}
      isMulti
      name={filterProp}
      placeholder={placeholder}
      options={options}
      onChange={(values) =>
        onChange(
          filterProp,
          values.map((value) => value.value)
        )
      }
    />
  );
}
