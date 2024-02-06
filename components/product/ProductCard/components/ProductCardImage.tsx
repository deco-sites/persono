import Image from "apps/website/components/Image.tsx";

interface Props {
  hasNewsTag?: string;
  hasDiscountTag?: string;
  preload?: boolean;
  discount: number;
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
}: Props) => {
  const showHighlightTag = !!hasNewsTag || !!hasDiscountTag;

  return (
    <figure class="relative">
      <div class="w-full">
        {showHighlightTag && (
          <span
            class={`py-1 px-3 flex absolute  rounded-br-xl justify-center items-center text-sm ${
              hasNewsTag ? "bg-blueNew" : "bg-black"
            }  text-white`}
          >
            {hasNewsTag ? hasNewsTag : hasDiscountTag}
          </span>
        )}

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
