import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { PriceAndName } from "deco-sites/persono/components/product/ProductCard/components/PriceAndName.tsx";
import { useMemo } from "preact/compat";
import { ImageAndTag } from "deco-sites/persono/components/product/ProductCard/components/ImageAndTag.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description index of the product card in the list */
  index?: number;

  imageBaseUrl?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({ product, preload, index, imageBaseUrl = "" }: Props) {
  const { url, productID, name, image: images, offers } = product;
  const { price = 0, installments, listPrice = 0 } = useOffer(offers);
  const [front] = images ?? [];

  const id = `product-card-${productID}`;
  const hasMultiplePrice = true;
  const hasNews = false;

  const { hasDiscount, discount } = useMemo(() => {
    return {
      hasDiscount: listPrice > price,
      discount: Math.floor(((listPrice - price) / listPrice) * 100),
    };
  }, [listPrice > price]);

  return useMemo(
    () => (
      <a
        key={`${id}-${index}`}
        id={id}
        class="card card-compact group w-full max-w-[230px] sm:max-w-[280px] rounded-lg border border-gray-300 text-start"
        data-deco="view-product"
        href={url && relative(url)}
        aria-label="view product"
      >
        <ImageAndTag
          imageBaseUrl={imageBaseUrl}
          discount={discount}
          hasDiscount={hasDiscount}
          hasNews={hasNews}
          imageAlt={front?.alternateName}
          preload={preload}
        />

        <PriceAndName
          hasDiscount={hasDiscount}
          hasMultiplePrice={hasMultiplePrice}
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
