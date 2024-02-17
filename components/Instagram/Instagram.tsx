import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
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
  const renderbutton = [0, 1, 2, 3, 4];

  const {
    header = {
      title: "",
    },
    list = [
      {
        mobile: "",
        desktop: "",
        href: "",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="container max-sm:px-6 py-10 flex flex-col gap-10"
    >
      <Header title={header.title} />
      <div class="relative">
        {renderbutton.length > 4 &&
          (
            <Slider.PrevButton class="justify-center btn btn-circle border border-neutral bg-white z-10 absolute left-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer">
              <Icon
                class="text-primary"
                size={20}
                id="ChevronLeft"
                strokeWidth={2}
              />
            </Slider.PrevButton>
          )}
        <Slider class="flex carousel carousel-start gap-6 lg:gap-0 lg:justify-between">
          {list.map((
            { mobile, desktop },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-12 carousel-item w-2/3 lg:w-[calc(25%-40px)] sm:w-[calc(33.3%-13px)]"
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
                  />
                </Picture>
              </figure>
            </Slider.Item>
          ))}
        </Slider>
        <Slider.NextButton class="justify-center btn btn-circle border border-neutral bg-white z-10 absolute right-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer">
          <Icon
            class="text-primary"
            size={20}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Slider.NextButton>
      </div>
      <SliderJS rootId={id} />
    </div>
  );
}

export default Instagram;
