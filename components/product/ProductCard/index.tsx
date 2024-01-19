import type { Platform } from "$store/apps/site.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
// import ImageDecoded from "deco-sites/persono/components/ui/ImageDecoded.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 287;
const HEIGHT = 287;

function ProductCard({ product, preload, index }: Props) {
  const { url, productID, name, image: images, offers } = product;
  const id = `product-card-${productID}`;

  const [front] = images ?? [];
  const { price, installments, listPrice } = useOffer(offers);

  return (
    <a
      id={id}
      class="card card-compact group w-full max-w-[287px] rounded-lg border border-gray-300 text-start"
      data-deco="view-product"
      href={url && relative(url)}
      aria-label="view product fgsdfsdfdgfg"
    >
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* <ImageDecoded image={{ src: "", width: 10, height: 10 }} /> */}
        {/* Product Images */}
        <div class="w-full">
          <span class="py-1 px-3 flex absolute  rounded-br-xl justify-center items-center text-sm bg-blueNew text-white">
            40% OFF
          </span>
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="bg-base-100 col-span-full row-span-full  w-full rounded-tl-[10px] rounded-tr-[10px] "
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-4 gap-3 lg:gap-4">
        <h2
          class=" line-clamp-2 text-sm lg:text-lg font-normal  text-black"
          dangerouslySetInnerHTML={{ __html: name ?? "" }}
        />

        <div class="flex flex-col">
          <div class="flex flex-col gap-0  justify-start">
            <p class="text-gray-600 font-normal text-xs">A partir de</p>
            <span class="text-black text-base ">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>

          <div class="text-gray-600 font-normal text-xs truncate">
            ou {installments}
          </div>
        </div>
      </div>
    </a>
  );
}

export default ProductCard;
