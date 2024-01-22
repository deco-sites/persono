import { formatPrice } from "deco-sites/persono/sdk/format.ts";

interface Props {
  hasMultiplePrices: boolean;
  hasDiscount: boolean;
  productName: string;
  listPrice: number;
  price: number;
  priceCurrency?: string;
  installments: string | null;
}

export const PriceAndName = ({
  hasDiscount,
  hasMultiplePrices,
  listPrice,
  price,
  productName,
  installments,
  priceCurrency = "BRL",
}: Props) => {

  
  return (
    <div class="flex-auto flex flex-col p-4 ">
      <h2
        class=" line-clamp-2 text-sm lg:text-lg font-normal  text-black h-10 mb-2"
        dangerouslySetInnerHTML={{ __html: productName ?? "" }}
      />

      <div class="flex flex-col">
        <div class="flex flex-col gap-0  justify-start">
          <p
            class={`text-gray-600 font-normal text-xs ${
              !hasMultiplePrices && hasDiscount ? "line-through" : ""
            }`}
          >
            {hasMultiplePrices
              ? "a partir de"
              : hasDiscount
              ? formatPrice(listPrice, priceCurrency)
              : ""}
          </p>
          <span class="text-black text-base ">
            {formatPrice(price, priceCurrency)}
          </span>
        </div>

        <div class="text-gray-600 font-normal text-xs truncate">
          ou {installments}
        </div>
      </div>
    </div>
  );
};
