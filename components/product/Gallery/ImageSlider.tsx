import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";
import { SectionProps } from "deco/mod.ts";
import Slider from "deco-sites/persono/components/ui/Slider.tsx";
import SliderJS from "deco-sites/persono/islands/SliderJS.tsx";
import { useMemo } from "preact/compat";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: SectionProps<typeof loader>) {
  const id = useId();

  if (props.page === null) {
    return null;
  }

  const {
    page: {
      product: { image: defaultImages = [] },
    },
  } = props;
  const aspectRatio = `1/1`;

  // Change the first image
  const images = useMemo(() => {
    if (defaultImages.length > 1) {
      const newImages = [...defaultImages];
      const firstImage = newImages[0];
      newImages.splice(0, 1).unshift(newImages[0]);
      newImages[1] = firstImage;
      return newImages;
    }

    return defaultImages;
  }, [defaultImages]);

  if (props.device == "desktop") {
    return (
      <div id={id} class="flex flex-col self-center sm:my-10 w-full sm:pt-[6px]">
        {images.map((img, index) => (
          <Image
            class="w-full"
            style={{ aspectRatio }}
            src={img.url!}
            alt={img.alternateName}
            width={678}
            height={678}
            preload={index === 0 ? true : false}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    );
  }

  return (
    <div id={id} class="flex flex-col-reverse w-full">
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2 p-4">
        <Slider class="carousel carousel-center gap-6 sm:w-[40vw]">
          {images.map((img, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <Image
                class="w-full rounded-md"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={678}
                height={678}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                id={`slide${index}`}
                name={`slide${id}`}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-2 items-center flex justify-center my-5">
        {images.map((img, index) => (
          <li class="carousel-item">
            <button
              data-dot={index}
              aria-label={`go to slider item ${index}`}
              class="w-2 h-2 checked:bg-primary active:bg-primary rounded-full block disabled:bg-primary bg-neutral "
            >
            </button>
          </li>
        ))}
      </ul>

      <SliderJS rootId={id} />
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnCustomContext) => {
  const device = ctx.device;

  return {
    ...props,
    device: device || "desktop",
  };
};
