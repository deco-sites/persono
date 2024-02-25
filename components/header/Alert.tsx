import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Icon {
  icon: ImageWidget;
  /** @description It will apply on width and height */
  size: number;
}

export interface IAlert {
  label: string;
  link?: string;
  beforeIcon?: Icon;
  afterIcon?: Icon;
  layout: "primary" | "secondary" | "accent";
}

export interface Props {
  alerts: IAlert[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay. Defaults to 5
   */
  interval?: number;
}

const LAYOUT = {
  primary: "bg-primary text-primary-content",
  secondary: "bg-secondary text-secondary-content",
  accent: "bg-accent text-accent-content",
} as const;

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      data-top-bar
      class="transition-all overflow-hidden duration-300"
    >
      <Slider class="carousel carousel-center w-screen">
        {alerts.map((alert, index) => (
          <Slider.Item
            index={index}
            class={`carousel-item ${LAYOUT[alert.layout]}`}
          >
            <a
              href={alert.link}
              class={`${
                alert.link ? "cursor-pointer" : "cursor-default"
              } text-sm flex justify-center items-center w-screen gap-2 lg:py-2.5 py-2`}
            >
              {alert.beforeIcon
                ? (
                  <Image
                    src={alert.beforeIcon.icon}
                    width={alert.beforeIcon.size}
                    height={alert.beforeIcon.size}
                    preload
                    fetchPriority="high"
                    aria-hidden="true"
                  />
                )
                : null}
              {alert.label}
              {alert.afterIcon
                ? (
                  <Image
                    src={alert.afterIcon.icon}
                    width={alert.afterIcon.size}
                    height={alert.afterIcon.size}
                    preload
                    fetchPriority="high"
                    aria-hidden="true"
                  />
                )
                : null}
            </a>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
