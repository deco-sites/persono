import Image from "apps/website/components/Image.tsx";

export interface HighlightTagProps {
  customTagColor?: Record<string, string>;
  hasCustomTag?: { color: string; label: string };
  hasNewsTag?: string;
  hasDiscountTag?: string;
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
          class="bg-base-100 col-span-full row-span-full w-full rounded-tl-[10px] rounded-tr-[10px] "
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
  const customTagBackGround =
  customTagColor?.[hasCustomTag?.color ?? ""] ?? "";
  const customTagNotIsBlack = hasCustomTag && hasCustomTag.color !== "Black";

  const label = hasNewsTag
    ? hasNewsTag
    : hasCustomTag
    ? hasCustomTag.label
    : hasDiscountTag;

  return (
    <span
      style={{ backgroundColor: customTagBackGround }}
      className={`py-1 px-3 flex absolute rounded-br-xl justify-center items-center text-sm ${
        hasNewsTag ? "bg-blueNew" : hasCustomTag ? "" : "bg-black"
      } ${customTagNotIsBlack ? "text-black" : "text-white"}`}
    >
      {label}
    </span>
  );
};
