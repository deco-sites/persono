import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { PriceAndName } from "deco-sites/persono/components/product/ProductCard/components/PriceAndName.tsx";
import { useMemo } from "preact/compat";
import { ProductCardImage } from "./components/ProductCardImage.tsx";
import { SendEventOnClick } from "deco-sites/persono/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { generateColorObject } from "deco-sites/persono/components/product/ProductCard/utils.ts";
import { PriceLabel } from "deco-sites/persono/loaders/product/productCardLabelOffer.tsx";

export interface Layout {
  customTagColors?: CustomTagColor[];
  defaultTags?: DefaultTagsColors;
  priceLabel: PriceLabel[];
}

export interface ColorConfig {
  /**
   * @title Background Color
   * @format color
   */
  backgroundColor: string;
  /** @format color */
  textColor: string;
}

export type TagColor = Record<string, ColorConfig>;

export interface CustomTagColor extends ColorConfig {
  /** @title Identifier */
  label: string;
}

interface DefaultTagsColors {
  /** @title Tag de desconto*/
  discountTag: ColorConfig;
  /** @title Tag de Lançamento*/
  newsTag: ColorConfig;
}

export interface DefaultTags {
  label?: string;
  colors?: ColorConfig;
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

  hasRelatedProducts?: boolean;

  isMobile?: boolean;
}

function ProductCard({
  product,
  preload,
  index,
  search,
  itemListName,
  layout,
  hasRelatedProducts,
  isMobile,
}: Props) {
  const { customTagColors, defaultTags, priceLabel } = layout ?? {};
  const { url, productID, name, image: images, offers } = product;
  const { price = 0, installments, listPrice = 0 } = useOffer(offers);
  const [front] = images ?? [];
  const id = `product-card-${productID}`;

  const productSalesPrice = product.offers?.offers[0].priceSpecification.find(
    (p) => p.priceType === "https://schema.org/SalePrice",
  );
  const productListPrice = product.offers?.offers[0].priceSpecification.find(
    (p) => p.priceType === "https://schema.org/ListPrice",
  );

  const outOfStock =
    offers?.offers[0].availability === "https://schema.org/OutOfStock";

  const { hasDiscount, hasMultiplePrices } = useMemo(() => {
    const variantPrices = {
      minPrice: productSalesPrice?.price,
      maxPrice: productListPrice?.price,
    };

    const hasMultiplePrices = variantPrices &&
      variantPrices.minPrice !== variantPrices.maxPrice;

    const discount = Math.floor(((listPrice - price) / listPrice) * 100);

    return {
      hasMultiplePrices,
      hasDiscount: listPrice > price,
      discount,
    };
  }, [product, listPrice, price]);

  const labelOfferType = priceLabel?.find(
    (p) => product.offers?.offers[0].additionalType == p.offerType,
  );

  const tagsCapture = (value: string, identifier: string) =>
    product.additionalProperty?.find(
      (item) =>
        item.propertyID === "TAG" &&
        item.identifier === identifier &&
        item.value === value,
    );

  const hasOutOfStockTag = useMemo(() => {
    if (!outOfStock) {
      return;
    }

    return {
      label: "Esgotado",
      colors: {
        backgroundColor: "#666666",

        textColor: "#FFFFFF",
      },
    };
  }, [outOfStock]);

  const { hasDiscountTag, hasNewsTag } = useMemo(() => {
    return {
      hasDiscountTag: {
        label: tagsCapture("PROMOTION", "TOPLEFT")?.valueReference?.replace(
          "-",
          "- ",
        ),
        colors: defaultTags?.discountTag,
      },
      hasNewsTag: {
        label: tagsCapture("LANCAMENTO", "TOPLEFT") && "Novidade",
        colors: defaultTags?.newsTag,
      },
    };
  }, []);

  const hasCustomTag = useMemo(() => {
    const { description, valueReference } = tagsCapture("CUSTOM", "CUSTOM") ??
      {};

    if (description && valueReference) {
      return { color: description, label: valueReference };
    }
  }, []);

  const customTagColor = generateColorObject(customTagColors);

  return useMemo(
    () => (
      <a
        key={`${id}-${index}`}
        id={id}
        class="card card-compact group rounded-[10px] border border-gray-300 text-start w-full overflow-hidden hover:border-black"
        data-deco="view-product"
        href={url}
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
          outOfStock={outOfStock}
          hasOutOfStockTag={hasOutOfStockTag}
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
          outOfStock={outOfStock}
          search={search || (hasRelatedProducts && isMobile)}
          hasDiscount={hasDiscount}
          hasMultiplePrices={hasMultiplePrices}
          installments={installments}
          listPrice={listPrice}
          labelOffer={labelOfferType?.label}
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
