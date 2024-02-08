import { formatPrice } from "deco-sites/persono/sdk/format.ts";

interface Props {
  hasMultiplePrices?: boolean;
  hasDiscount: boolean;
  productName: string;
  listPrice: number;
  price: number;
  priceCurrency?: string;
  installments: string | null;
  search?: boolean;
}

export const PriceAndName = ({
  hasDiscount,
  hasMultiplePrices,
  listPrice,
  price,
  productName,
  installments,
  priceCurrency = "BRL",
  search,
}: Props) => {
  return (
    <div class="flex-auto flex flex-col p-4 ">
      <h2
        class=" line-clamp-2 text-sm lg:text-lg font-normal  text-black mb-2"
        dangerouslySetInnerHTML={{ __html: productName ?? "" }}
      />

      <div class="flex flex-col">
        <div
          class={`flex ${
            search ? "flex-row gap-2" : "flex-col gap-0"
          } justify-start`}
        >
          <div class="h-5">
            {(hasMultiplePrices || hasDiscount) && (
              <p
                class={`text-gray-600 font-normal text-xs ${
                  !hasMultiplePrices && hasDiscount ? "line-through" : ""
                }`}
              >
                {hasMultiplePrices
                  ? "a partir de"
                  : formatPrice(listPrice, priceCurrency)}
              </p>
            )}
          </div>
          <span class="text-black text-base font-medium ">
            {formatPrice(price, priceCurrency)}
          </span>
        </div>

        {!search && installments && (
          <div class="text-gray-600 font-normal text-xs truncate">
            ou {installments}
          </div>
        )}
      </div>
    </div>
  );
};
