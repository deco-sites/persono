import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";

interface ActionProps {
  /**
   * @format rich-text
   */
  title?: string;

  /**
   * @format rich-text
   */
  subTitle?: string;

  label?: string;
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

      {action && <BannerActionLayout action={action} />}
    </a>
  );
}

export const BannerActionLayout = ({ action }: { action: ActionProps }) => {
  return (
    <div class="absolute lg:max-w-3xl p-4 lg:p-0 h-min top-0 bottom-0 m-auto left-0 right-0 text-center max-h-min flex flex-col items-center justify-center">
      {action?.title && (
        <span
          class="font-medium text-3xl text-white mb-4 lg:mb-6"
          dangerouslySetInnerHTML={{
            __html: action.title ?? "",
          }}
        >
        </span>
      )}
      {action?.subTitle && (
        <span
          class="font-normal text-base text-white mb-6 lg:mb-9"
          dangerouslySetInnerHTML={{
            __html: action.subTitle ?? "",
          }}
        >
        </span>
      )}
      {action?.label && (
        <button class="btn w-full max-w-[117px] md:max-w-[396px] btn-accent text-primary">
          {action.label}
        </button>
      )}
    </div>
  );
};

function Dots({ images = [] }: { images?: Banner[] }) {
  if (images.length <= 1) {
    return null;
  }
  return (
    <ul class="absolute w-full flex items-center justify-center bottom-5 gap-2">
      {images?.map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div class="w-2 h-2 rounded-xl bg-white group-disabled:bg-gray-100" />
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] relative "
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

      <Dots images={images} />
      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
