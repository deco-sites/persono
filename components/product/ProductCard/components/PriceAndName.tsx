import { formatPrice } from "deco-sites/persono/sdk/format.ts";
import { LABEL_OFFER_MATCHERS } from "deco-sites/persono/components/product/ProductCard/utils.ts";

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
  outOfStock?: boolean;
}

function formatLabelOffer(
  label: string | undefined,
  price: string | null,
): string {
  if (!label) return "";
  return label.replace(/\${([^}]+)}/g, (match, group) => {
    return price !== null ? String(price) : "";
  });
}

function matchLabelOffer(labelOffer: string) {
  return LABEL_OFFER_MATCHERS.reduce((prev, matcher) => {
    if (prev === true) {
      return prev;
    }
    return !!labelOffer.match(matcher);
  }, false);
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
  outOfStock,
}: Props) => {
  const labelOfferWithPrice = labelOffer && matchLabelOffer(labelOffer)
    ? formatLabelOffer(labelOffer, formatPrice(price, priceCurrency))
    : undefined;

  return (
    <div
      class={`flex-auto flex flex-col p-4 ${outOfStock ? "opacity-60" : ""}`}
    >
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
            {(labelOfferWithPrice || hasDiscount) && (
              <p
                class={`text-gray-600 font-normal text-xs ${
                  !labelOfferWithPrice && !hasMultiplePrices && hasDiscount
                    ? "line-through"
                    : ""
                }`}
              >
                {labelOfferWithPrice ??
                  formatPrice(listPrice, priceCurrency)}
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
