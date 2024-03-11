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
}

interface Props extends HighlightTagProps {
  preload?: boolean;
  imageAlt?: string;
  imageSrc: string;
  search?: boolean;
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
}: Props) => {
  const showHighlightTag = !!hasNewsTag || !!hasDiscountTag || !!hasCustomTag;

  const highlightTagProps = {
    customTagColor,
    hasCustomTag,
    hasNewsTag,
    hasDiscountTag,
  };

  return (
    <figure class="relative">
      <div class="w-full">
        {showHighlightTag && <HighlightTag {...highlightTagProps} />}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={search ? 230 : 287}
          height={search ? 230 : 287}
          class="bg-base-100 col-span-full row-span-full w-full"
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
}: HighlightTagProps) => {
  // News tag
  const { label: newsTagLabel, colors: newsTagColors } = hasNewsTag ?? {};

  // Discount tag
  const { label: discountTagLabel, colors: discountTagColors } =
    hasDiscountTag ?? {};

  // Custom tag
  const { color: custonTagColorIdentifier, label: customTagLabel } =
    hasCustomTag ?? {};

  const customTagColors = customTagColor?.[custonTagColorIdentifier ?? ""];

  const taglabel = newsTagLabel ?? discountTagLabel ?? customTagLabel;

  const tagStyleColorSettings = useMemo(() => {
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
      class="py-1 px-3 flex absolute rounded-br-[10px] rounded-tl-[8px]  justify-center items-center text-sm "
    >
      {taglabel}
    </span>
  );
};
