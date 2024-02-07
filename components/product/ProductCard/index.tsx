import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { PriceAndName } from "deco-sites/persono/components/product/ProductCard/components/PriceAndName.tsx";
import { useMemo } from "preact/compat";
import { ProductCardImage } from "./components/ProductCardImage.tsx";
import { SendEventOnClick } from "deco-sites/persono/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { generateColorObject } from "deco-sites/persono/components/product/ProductCard/utils.ts";

export interface Layout {
  customTagColors?: CustomTagColor[];
}

export interface CustomTagColor {
  title: string;
  /** @format color */
  color: string;
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description index of the product card in the list */
  index?: number;

  search?: boolean;

  itemListName?: string;

  layout?: Layout;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({
  product,
  preload,
  index,
  search,
  itemListName,
  layout,
}: Props) {
  const { customTagColors } = layout ?? {};
  const { url, productID, name, image: images, offers } = product;
  const { price = 0, installments, listPrice = 0 } = useOffer(offers);
  const [front] = images ?? [];
  const id = `product-card-${productID}`;

  const searchTopLefTags = (value: string, identifier: string) =>
    product.additionalProperty?.find(
      (item) =>
        item.propertyID === "TAG" &&
        item.identifier === identifier &&
        item.value === value
    );

  const hasDiscountTag = searchTopLefTags(
    "PROMOTION",
    "TOPLEFT"
  )?.valueReference;
  const hasNewsTag = searchTopLefTags("LANCAMENTO", "TOPLEFT")?.valueReference;

  const teste = searchTopLefTags("CUSTOM", "CUSTOM");

  const hasCustomTagTeste = useMemo(() => {
    const { description = "", valueReference = "" } =
      searchTopLefTags("CUSTOM", "CUSTOM") ?? {};

    return { color: description, label: valueReference };
  }, []);

  //Esta parte vira do  do produto
  const hasCustomTag = {
    color: "Regular",
    label: "Controle térmico",
  };

  const customTagColor = generateColorObject(customTagColors);

  console.log("@@@ hasCustomTagTeste: ", hasCustomTagTeste);

  const customTagColorsMock = {
    Black: "#000000",
    Regular: "#FFC758",
    Darker: "#FF9645",
  };

  const { hasDiscount, hasMultiplePrices } = useMemo(() => {
    const variantPrices = product.isVariantOf?.hasVariant.map(
      (item) => item.offers?.offers?.[0]?.price
    );

    const hasMultiplePrices =
      variantPrices && variantPrices?.length > 1
        ? variantPrices.some(
            (price) => price !== Math.min(...(variantPrices as number[]))
          )
        : false;

    return {
      hasMultiplePrices,
      hasDiscount: listPrice > price,
      discount: Math.floor(((listPrice - price) / listPrice) * 100),
    };
  }, [listPrice, price]);

  return useMemo(
    () => (
      <a
        key={`${id}-${index}`}
        id={id}
        class="card card-compact group rounded-lg border border-gray-300 text-start w-full"
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
          customTagColor={customTagColor}
          hasCustomTag={hasCustomTag}
          search={search}
          imageSrc={front.url!}
          hasDiscountTag={hasDiscountTag}
          hasNewsTag={hasNewsTag}
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
    [product]
  );
}

export default ProductCard;
