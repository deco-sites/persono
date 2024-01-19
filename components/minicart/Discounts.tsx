import { Discount } from "deco-sites/persono/packs/types.ts";
import { formatPrice } from "deco-sites/persono/sdk/format.ts";

export interface Props {
  discounts: Discount[];
  currency: string;
  locale: string;
  totalDiscounts: number;
}

export function Discounts(
  { currency, locale, discounts, totalDiscounts: total }: Props,
) {
  if (discounts.length === 0) {
    return null;
  }

  if (discounts.length === 1) {
    const [discount] = discounts;
    return (
      <div class="flex justify-between items-center">
        <span class="text-sm">{discount.message}</span>
        <span class="text-sm">
          - {formatPrice(discount.value / 100, currency, locale)}
        </span>
      </div>
    );
  }

  const hasChildren = discounts.some((_discount) =>
    Boolean(_discount.items?.length)
  );

  return (
    <div class="collapse collapse-arrow min-h-0">
      <input type="checkbox" class="min-h-0" />

      <p class="collapse-title min-h-0 text-sm flex justify-between items-center pl-6 pr-0 py-0 after:left-0">
        <span>Descontos</span>
        <span>- {formatPrice(total / 100, currency, locale)}</span>
      </p>

      <ul class="collapse-content text-[#666] pl-6 !pb-0 pr-0 text-sm flex flex-col gap-3">
        {discounts.map(({ message, value, items = [] }) => (
          <li class="flex flex-col gap-1 first:pt-3">
            <p class="flex justify-between items-center">
              <span class={hasChildren ? "font-bold" : ""}>{message}</span>
              {items.length === 0
                ? <span>- {formatPrice(value / 100, currency, locale)}</span>
                : null}
            </p>
            {items.length > 0
              ? (
                <ul class="flex flex-col gap-1">
                  {items.map(({ title, value }) => (
                    <li class="flex justify-between items-center">
                      <p>{title}</p>
                      <p>- {formatPrice(value / 100, currency, locale)}</p>
                    </li>
                  ))}
                </ul>
              )
              : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
