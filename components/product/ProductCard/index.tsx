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

  search?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({ product, preload, index, imageBaseUrl, search }: Props) {
  const { url, productID, name, image: images, offers } = product;
  const { price = 0, installments, listPrice = 0 } = useOffer(offers);
  const [front] = images ?? [];

  const id = `product-card-${productID}`;

  const { hasNews, newsTitle } = useMemo(() => {
    // Necessario atualizar quando as especificações dos produtos retorarem corretamente
    const newsTitle = "Novidade";
    const hasNews = false;
    return { hasNews, newsTitle };
  }, [product]);

  const { hasDiscount, discount, hasMultiplePrice } = useMemo(() => {
    const variantPrices = product.isVariantOf?.hasVariant.map(
      (item) => item.offers?.offers?.[0]?.price
    );

    const hasMultiplePrice =
      variantPrices && variantPrices?.length > 2
        ? variantPrices.some(
            (price) => price !== Math.min(...(variantPrices as number[]))
          )
        : false;

    return {
      hasMultiplePrice,
      hasDiscount: listPrice > price,
      discount: Math.floor(((listPrice - price) / listPrice) * 100),
    };
  }, [listPrice > price]);

  return useMemo(
    () => (
      <a
        key={`${id}-${index}`}
        id={id}
        class={`card card-compact group ${
          search ? "w-[160px] md:w-[170px]" : "w-[230px] md:w-[280px]"
        }    rounded-lg border border-gray-300 text-start`}
        data-deco="view-product"
        href={url && relative(url)}
        aria-label="view product"
      >
        <ImageAndTag
          imageSrc={front.url!}
          imageBaseUrl={imageBaseUrl}
          discount={discount}
          hasDiscount={hasDiscount}
          hasNews={hasNews}
          newsTitle={newsTitle}
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
