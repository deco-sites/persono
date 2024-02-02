import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { PriceAndName } from "deco-sites/persono/components/product/ProductCard/components/PriceAndName.tsx";
import { useMemo } from "preact/compat";
import { ProductCardImage } from "./components/ProductCardImage.tsx";
import { SendEventOnClick } from "deco-sites/persono/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description index of the product card in the list */
  index?: number;

  search?: boolean;

  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({ product, preload, index, search, itemListName }: Props) {
  const { url, productID, name, image: images, offers } = product;
  const { price = 0, installments, listPrice = 0 } = useOffer(offers);
  const [front] = images ?? [];

  const id = `product-card-${productID}`;

  // Necessario atualizar quando as especificações dos produtos retornarem corretamente
  const newsTitle = "Novidade";
  const hasNews = false;

  const { hasDiscount, discount, hasMultiplePrices } = useMemo(() => {
    const variantPrices = product.isVariantOf?.hasVariant.map(
      (item) => item.offers?.offers?.[0]?.price,
    );

    const hasMultiplePrices = variantPrices && variantPrices?.length > 1
      ? variantPrices.some(
        (price) => price !== Math.min(...(variantPrices as number[])),
      )
      : false;

    return {
      hasMultiplePrices,
      hasDiscount: listPrice > price,
      discount: Math.floor(((listPrice - price) / listPrice) * 100),
    };
  }, [listPrice > price]);

  return useMemo(
    () => (
      <a
        key={`${id}-${index}`}
        id={id}
        class="card card-compact group rounded-xl border border-gray-300 text-start w-full"
        data-deco="view-product"
        href={url && relative(url)}
        aria-label="view product"
      >
        <SendEventOnClick
          id={id}
          event={{
            name: "select_item" as const,
            params: {
              item_list_name: itemListName ?? "",
              items: [
                mapProductToAnalyticsItem({
                  product,
                  price,
                  listPrice,
                  index,
                }),
              ],
            },
          }}
        />
        <ProductCardImage
          search={search}
          imageSrc={front.url!}
          discount={discount}
          hasDiscount={hasDiscount}
          hasNews={hasNews}
          newsTitle={newsTitle}
          imageAlt={front?.alternateName}
          preload={preload}
        />

        <PriceAndName
          search={search}
          hasDiscount={hasDiscount}
          hasMultiplePrices={hasMultiplePrices}
          installments={installments}
          listPrice={listPrice}
          price={price}
          productName={name ?? ""}
          priceCurrency={offers?.priceCurrency}
        />
      </a>
    ),
    [product],
  );
}

export default ProductCard;
