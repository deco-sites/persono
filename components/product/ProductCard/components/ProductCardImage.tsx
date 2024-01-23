import Image from "apps/website/components/Image.tsx";

interface Props {
  hasNews: boolean;
  hasDiscount: boolean;
  preload?: boolean;
  discount: number;
  imageAlt?: string;
  newsTitle: string;
  imageSrc: string;
}

export const ProductCardImage = ({
  hasDiscount,
  hasNews,
  discount,
  preload,
  imageAlt = "",
  imageSrc,
  newsTitle,
}: Props) => {
  const showHighlightTag = hasNews || hasDiscount;

  return (
    <figure class="relative ">
      <div class="w-full">
        {showHighlightTag && (
          <span
            class={`py-1 px-3 flex absolute  rounded-br-xl justify-center items-center text-sm ${
              hasNews ? "bg-blueNew" : "bg-black"
            }  text-white`}
          >
            {hasNews ? { newsTitle } : `${discount}% OFF`}
          </span>
        )}

        <Image
          src={imageSrc}
          alt={imageAlt}
          width={287}
          height={287}
          class="bg-base-100 col-span-full row-span-full  w-full rounded-tl-[10px] rounded-tr-[10px] "
          sizes="(max-width: 640px) 50vw, 20vw"
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </figure>
  );
};
