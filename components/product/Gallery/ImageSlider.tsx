import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";
import { SectionProps } from "deco/mod.ts";
import Slider from "deco-sites/persono/components/ui/Slider.tsx";
import SliderJS from "deco-sites/persono/islands/SliderJS.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
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
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: { image: images = [] },
    },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  if (props.device == "desktop") {
    return (
      <div id={id} class="flex flex-col self-center w-[53vw] sm:pl-20 sm:mt-10">
        {images.map((img, index) => (
          <Image
            class="w-full"
            style={{ aspectRatio: "1 / 1 " }}
            src={"https://images-prod.mmartan.com.br/1536x1536/png/products/photos/still/mm21tjdca1060_1536px-1684423165235.png"}
            alt={img.alternateName}
            width={width}
            height={height}
            preload={index === 0}
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
                src={"https://images-prod.mmartan.com.br/1536x1536/png/products/photos/still/mm21tjdca1060_1536px-1684423165235.png"}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-2 items-center flex justify-center my-5">
        {images.map((img, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <input
                type="radio"
                name={`carousel-${id}`}
                id={`slide${index}`}
                class="carousel-radio visually-hidden"
                checked={index === 0}
              />
              <label
                for={`slide${index}`}
                class="w-3 h-3 bg-neutral checkbox-primary rounded-full"
              >
              </label>
            </Slider.Dot>
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
