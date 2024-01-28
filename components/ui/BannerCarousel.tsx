import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";

interface ActionProps {
  /**
   * @format html
   */
  title: string;

  /**
   * @format html
   */
  subTitle: string;

  label: string;
}

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;

  /** @description Image's redirect link */
  link?: string;

  action?: ActionProps;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({
  image,
  lcp,
  id,
}: {
  image: Banner;
  lcp?: boolean;
  id: string;
}) {
  const { alt, mobile, desktop, link = "", action } = image;

  return (
    <a
      id={id}
      href={link}
      aria-label={alt}
      class="relative  overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={441}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={441}
        />
        <img
          class="object-cover w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>

      <BannerActionLayout action={action} />
    </a>
  );
}

export const BannerActionLayout = ({ action }: { action?: ActionProps }) => {
  if (action) {
    return (
      <div class=" absolute lg:max-w-3xl p-4 lg:p-0  h-min top-0 bottom-0 m-auto left-0 right-0 text-center  max-h-min  flex flex-col items-center">
        {action?.title && (
          <span
            class="font-medium text-3xl text-white mb-6  "
            dangerouslySetInnerHTML={{
              __html: action.title ?? "",
            }}
          >
          </span>
        )}
        {action?.subTitle && (
          <span
            class="font-normal  text-base text-white mb-9 md:mb-5  lg:mb-9"
            dangerouslySetInnerHTML={{
              __html: action.subTitle ?? "",
            }}
          >
          </span>
        )}
        {action?.label && (
          <Button class=" w-[calc(60%)] md:w-[calc(50%-36px)] bg-white h-9 px-2 py-3 text-center ">
            {action.label}
          </Button>
        )}
      </div>
    );
  }

  return null;
};

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] "
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };

          return (
            <Slider.Item index={index} class="carousel-item w-full ">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />

              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
