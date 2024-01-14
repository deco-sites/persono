import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

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

  layout?: Layout;
  platform?: Platform;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 287;
const HEIGHT = 287;

function ProductCard({ product, preload, itemListName, layout, index }: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  return (
    <a
      id={id}
      class="card card-compact group w-full max-w-[287px] rounded-lg border border-gray-300 text-start"
      data-deco="view-product"
      href={url && relative(url)}
      aria-label="view product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
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
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <div class="grid grid-cols-1 grid-rows-1 w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full rounded-tl-[10px] rounded-tr-[10px] `}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      </figure>
      {/* Name */}
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
        <div class="flex flex-col gap-0">
          <h2
            class="truncate text-sm lg:text-lg text-black"
            dangerouslySetInnerHTML={{ __html: name ?? "" }}
          />

          <div
            class="truncate text-sm lg:text-lg text-black"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        </div>

        {/* Prices & Name */}

        <div class="flex flex-col">
          <div
            class={`flex flex-col gap-0 ${
              l?.basics?.oldPriceSize === "Normal" ? "lg:flex-row lg:gap-2" : ""
            } ${align === "center" ? "justify-center" : "justify-start"}`}
          >
            <div
              class={` text-black text-xs ${
                l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
              }`}
            >
              <p class="text-gray-600 font-normal text-xs">A partir de</p>
            </div>
            <div class="text-black text-base lg:text-xl">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
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
