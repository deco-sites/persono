import ImageDecoded from "deco-sites/persono/components/ui/ImageDecoded.tsx";

interface Props {
  hasNews: boolean;
  hasDiscount: boolean;
  preload?: boolean;
  discount: number;
  imageAlt?: string;
  imageBaseUrl?: string;
  newsTitle: string;
  imageSrc: string;
}

export const ImageAndTag = ({
  hasDiscount,
  hasNews,
  discount,
  preload,
  imageAlt = "",
  imageBaseUrl,
  imageSrc,
  newsTitle,
}: Props) => {
  const WIDTH = 287;
  const HEIGHT = 287;

  const showHighlightTag = hasNews || hasDiscount;

  return (
    <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
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
        <ImageDecoded
          imageBaseUrl={imageBaseUrl}
          settings={{
            src: imageSrc, //Necessario atualizar quando os produtos tiverem retornando a url correta
            alt: imageAlt,
            width: WIDTH,
            height: HEIGHT,
            class:
              "bg-base-100 col-span-full row-span-full  w-full rounded-tl-[10px] rounded-tr-[10px] ",
            sizes: "(max-width: 640px) 50vw, 20vw",
            preload: preload,
            loading: preload ? "eager" : "lazy",
            decoding: "async",
          }}
        />
      </div>
    </figure>
  );
};
