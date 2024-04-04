import Button from "../ui/Button.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

interface Props {
  quantity: number;
  max?: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  { onChange, quantity, disabled, loading, max = QUANTITY_MAX_VALUE }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () => onChange?.(Math.min(quantity + 1, max));

  return (
    <div class="join border border-gray-100 hover:border-black rounded-full w-min">
      <Button
        class="btn-circle btn-ghost w-9 disabled:bg-white disabled:text-[#999] join-item"
        onClick={decrement}
        disabled={disabled || quantity === 1}
        loading={loading}
      >
        <Icon id="MinusSign" size={16} />
      </Button>
      <input
        class="input w-auto px-0 text-center join-item [appearance:textfield]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={max}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="btn-circle btn-ghost w-9 disabled:bg-white disabled:text-[#999] join-item"
        onClick={increment}
        disabled={disabled || quantity === max}
        loading={loading}
      >
        <Icon id="PlusSign" size={16} />
      </Button>
    </div>
  );
}

export default QuantitySelector;
