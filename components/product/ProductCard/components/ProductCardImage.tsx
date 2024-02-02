import Image from "apps/website/components/Image.tsx";

interface Props {
  hasNews: boolean;
  hasDiscount: boolean;
  preload?: boolean;
  discount: number;
  imageAlt?: string;
  newsTitle: string;
  imageSrc: string;
  search?: boolean;
}

export const ProductCardImage = ({
  hasDiscount,
  hasNews,
  discount,
  preload,
  imageAlt = "",
  imageSrc,
  newsTitle,
  search,
}: Props) => {
  const showHighlightTag = hasNews || hasDiscount;

  return (
    <figure class="relative">
      <div class="w-full">
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
