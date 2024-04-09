import { formatPrice } from "deco-sites/persono/sdk/format.ts";

interface Props {
  hasMultiplePrices?: boolean;
  labelOffer?: string;
  hasDiscount: boolean;
  productName: string;
  listPrice: number;
  price: number;
  priceCurrency?: string;
  installments: string | null;
  search?: boolean;
}

function formatLabelOffer(label: string | undefined, price: string | null): string {
  if (!label) return "";
  return label.replace(/\${([^}]+)}/g, (match, group) => {
      return price !== null ? String(price) : ""; 
  });
}

export const PriceAndName = ({
  hasDiscount,
  hasMultiplePrices,
  labelOffer,
  listPrice,
  price,
  productName,
  installments,
  priceCurrency = "BRL",
  search,
}: Props) => {

  const labelOfferWithPrice = formatLabelOffer(labelOffer,formatPrice(listPrice, priceCurrency))

  return (
    <div class="flex-auto flex flex-col p-4 ">
      <h2
        class=" line-clamp-2 h-10 text-sm lg:text-lg font-normal  text-black mb-2"
        dangerouslySetInnerHTML={{ __html: productName ?? "" }}
      />

      <div class="flex flex-col">
        <div
          class={`flex ${
            search ? `flex-row ${hasDiscount ? "gap-2" : ""}` : "flex-col gap-0"
          } justify-start`}
        >
          <div class="h-5">
            {(hasMultiplePrices || hasDiscount) && (
              <p
                class={`text-gray-600 font-normal text-xs ${
                  !hasMultiplePrices && hasDiscount ? "line-through" : ""
                }`}
              >
                {hasMultiplePrices && labelOfferWithPrice
                  ? labelOfferWithPrice
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
