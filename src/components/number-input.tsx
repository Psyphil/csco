import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function NumberInput(props: {
  value: number;
  setValue: (newValue: number) => void;
  minValue?: number;
  maxValue?: number;
  stepSize?: number;
}) {
  const updateValue = (newValue: number) => {
    if (props.minValue) newValue = Math.max(props.minValue, newValue);
    if (props.maxValue) newValue = Math.min(props.maxValue, newValue);
    props.setValue(newValue);
  };
  const step = props.stepSize ?? 1;
  return (
    <div className="px-0.5 flex items-center border rounded border-dark dark:bg-dark-300">
      <button className="" onClick={() => updateValue(props.value - step)}>
        <IconMinus size={20} />
      </button>
      <input
        className="bg-transparent text-center -ml-1 -mr-4"
        min={props.minValue}
        max={props.maxValue}
        value={props.value}
        type="number"
        disabled
        readOnly
      />
      <button className="" onClick={() => updateValue(props.value + step)}>
        <IconPlus size={20} />
      </button>
    </div>
  );
}
