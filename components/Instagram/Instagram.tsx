import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Post {
  mobile: ImageWidget;
  desktop: ImageWidget;
  href?: string;
}

export interface Props {
  header?: {
    title?: string;
  };
  list?: Post[];
}

function Instagram(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
    },
    list = [
      {
        mobile: "",
        desktop: "",
        href:"",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="container flex flex-col pb-10"
    >
      <div class="pl-6 sm:pl-0 pt-6 pb-10">
        <Header title={header.title} />
      </div>
      <div>
        <Slider class="flex carousel carousel-start gap-6 lg:justify-between">
          {list.map((
            { mobile, desktop, href },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-12 first-of-type:pl-6 sm:first-of-type:pl-0 carousel-item w-2/3 lg:w-[calc(25%-40px)] sm:w-[calc(33.3%-13px)]"
            >
              <a
                href={href}
                class="overflow-hidden"
              >
                <figure>
                  <Picture>
                    <Source
                      media="(max-width: 768px)"
                      src={mobile}
                      width={220}
                      height={268}
                    />
                    <Source
                      media="(min-width: 768px)"
                      src={desktop}
                      width={280}
                      height={350}
                    />
                    <img
                      src={desktop}
                      loading="lazy"
                      class="w-full h-auto object cover rounded-[40px]"
                      alt={index + " slider Instagram image"}
                    />
                  </Picture>
                </figure>
              </a>
            </Slider.Item>
          ))}
        </Slider>
      </div>
      <SliderJS rootId={id} />
    </div>
  );
}

export default Instagram;
