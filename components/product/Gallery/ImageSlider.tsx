import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

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
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="flex flow-col">
      {images.map((img, index) => (
        <Image
          class="w-full"
          sizes="(max-width: 640px) 100vw, 40vw"
          style={{ aspectRatio }}
          src={img.url!}
          alt={img.alternateName}
          width={width}
          height={height}
          // Preload LCP image for better web vitals
          preload={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
