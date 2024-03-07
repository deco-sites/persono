import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useMemo } from "preact/hooks";

export interface EditableProps {
  /** @description Use %price to auto replace for the current difference between total and target */
  textTemplate?: string;
  /** @description When reach the target, this text will display */
  completedText?: string;
  target?: number;
}

interface Props extends EditableProps {
  total: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar(
  {
    completedText = "Parabéns! Você ganhou frete grátis.",
    textTemplate = "Faltam %price para ganhar frete grátis!",
    target: currentTarget = 0,
    total: currentTotal,
    currency,
    locale,
  }: Props,
) {
  const total = useMemo(() => currentTotal / 100, [currentTotal]);
  const target = currentTarget / 100;

  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2.5">
      <div class="flex justify-start items-center gap-2 text-primary text-sm">
        <Icon id="Truck" size={24} />
        {remaining > 0
          ? (
            <span>
              {textTemplate.replace(
                "%price",
                formatPrice(remaining, currency, locale)!,
              )}
            </span>
          )
          : <span>{completedText}</span>}
      </div>
      <div class="relative flex w-full">
        <progress
          class="progress progress-primary w-full"
          value={percent}
          max={100}
        />
        <div
          class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-primary"
          style={{ left: `${Math.min(Math.max(percent, 0), 97)}%` }}
        />
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
