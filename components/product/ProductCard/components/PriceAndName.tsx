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
  outOfStock?:boolean
}

function formatListPriceLabelOffer(
  label: string | undefined,
  price: string | null,
): string {
  if (!label) return "";
  return label.replace(/\${([^}]+)}/g, (match, group) => {
    return price !== null ? String(price) : "";
  });
}

function formatMinPriceLabelOffer(
  label: string | undefined,
  price: string | null,
): string {
  if (!label) return "";
  return label.replace(/\${([^}]+)}/g, (match, group) => {
    return price !== null ? String(price) : "";
  });
}

function formatSalesPriceLabelOffer(
  label: string | undefined,
  price: string | null,
): string {
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
  outOfStock
}: Props) => {
  let labelOfferWithPrice;

  if (labelOffer && labelOffer.match(/\${listPrice}/)) {
    labelOfferWithPrice = formatListPriceLabelOffer(
      labelOffer,
      formatPrice(listPrice, priceCurrency),
    );
  } else if (labelOffer && labelOffer.match(/\${minPrice}/)) {
    labelOfferWithPrice = formatMinPriceLabelOffer(
      labelOffer,
      formatPrice(price, priceCurrency),
    );
  } else if (labelOffer && labelOffer.match(/\${salesPrice}/)) {
    labelOfferWithPrice = formatSalesPriceLabelOffer(
      labelOffer,
      formatPrice(price, priceCurrency),
    );
  }

  return (
    <div class={`flex-auto flex flex-col p-4 ${outOfStock?'opacity-60':''}`}  >
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
