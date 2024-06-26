import Image from "apps/website/components/Image.tsx";
import {
  DefaultTags,
  TagColor,
} from "deco-sites/persono/components/product/ProductCard/index.tsx";
import { useMemo } from "preact/compat";

export interface HighlightTagProps {
  customTagColor?: TagColor;
  hasCustomTag?: { color: string; label: string };
  hasNewsTag?: DefaultTags;
  hasDiscountTag?: DefaultTags;
  hasOutOfStockTag?: DefaultTags;
}

interface Props extends HighlightTagProps {
  preload?: boolean;
  imageAlt?: string;
  imageSrc: string;
  search?: boolean;
  outOfStock?: boolean;
}

export const ProductCardImage = ({
  hasDiscountTag,
  hasNewsTag,
  preload,
  imageAlt = "",
  imageSrc,
  search,
  customTagColor,
  hasCustomTag,
  hasOutOfStockTag,
  outOfStock,
}: Props) => {
  const showHighlightTag = !!hasNewsTag || !!hasDiscountTag || !!hasCustomTag;

  const highlightTagProps = {
    customTagColor,
    hasCustomTag,
    hasNewsTag,
    hasDiscountTag,
    hasOutOfStockTag,
  };

  return (
    <figure class="relative">
      <div class="w-full overflow-hidden">
        {showHighlightTag && <HighlightTag {...highlightTagProps} />}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={search ? 230 : 287}
          height={search ? 230 : 287}
          class={`bg-base-100 ${
            outOfStock ? "opacity-60" : ""
          }  col-span-full row-span-full w-full animateImage cursor-pointer object-cover z-10`}
          sizes="(max-width: 640px) 50vw, 20vw"
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </figure>
  );
};

export const HighlightTag = ({
  customTagColor,
  hasCustomTag,
  hasNewsTag,
  hasDiscountTag,
  hasOutOfStockTag,
}: HighlightTagProps) => {
  const { colors: outOfStockColor, label: outOfStockLabel } =
    hasOutOfStockTag ?? {};
  // News tag
  const { label: newsTagLabel, colors: newsTagColors } = hasNewsTag ?? {};

  // Discount tag
  const { label: discountTagLabel, colors: discountTagColors } =
    hasDiscountTag ?? {};

  // Custom tag
  const { color: custonTagColorIdentifier, label: customTagLabel } =
    hasCustomTag ?? {};

  const customTagColors = customTagColor?.[custonTagColorIdentifier ?? ""];

  const taglabel = outOfStockLabel ?? newsTagLabel ?? discountTagLabel ??
    customTagLabel;

  const tagStyleColorSettings = useMemo(() => {
    if (outOfStockColor && outOfStockLabel) {
      return {
        backgroundColor: outOfStockColor.backgroundColor,
        color: outOfStockColor.textColor,
      };
    }

    if (newsTagColors && newsTagLabel) {
      return {
        backgroundColor: newsTagColors.backgroundColor,
        color: newsTagColors.textColor,
      };
    }

    if (discountTagColors && discountTagLabel) {
      return {
        backgroundColor: discountTagColors.backgroundColor,
        color: discountTagColors.textColor,
      };
    }

    if (customTagColors && customTagLabel) {
      return {
        backgroundColor: customTagColors.backgroundColor,
        color: customTagColors.textColor,
      };
    }
  }, []);

  if (!taglabel || !tagStyleColorSettings) {
    return null;
  }

  return (
    <span
      style={tagStyleColorSettings}
      class="py-1 px-3 flex absolute rounded-br-[10px] rounded-tl-[8px]  justify-center items-center text-sm z-20 "
    >
      {taglabel}
    </span>
  );
};
