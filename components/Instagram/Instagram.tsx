import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Posts {
  image: ImageWidget;
}

export interface Props {
  header?: {
    title?: string;
  };
  list?: Posts[];
}

function Instagram(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
    },
    list = [
      {
        image: "",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="container py-10 max-sm:px-6 flex flex-col gap-10"
    >
      <Header title={header.title} />
      <div>
        <Slider class="flex carousel carousel-start gap-6 lg:gap-10">
          {list.map((
            { image },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-12 carousel-item lg:w-[calc(25%-42px)] sm:w-[calc(33.3%-13px)] w-2/3"
            >
              <figure>
                <Picture>
                  <Source
                    media="(max-width: 767px)"
                    src={image}
                    width={220}
                    height={260}
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={image}
                    width={280}
                    height={268}
                  />
                  <img
                    src={image}
                    width={220}
                    height={268}
                    loading="lazy"
                    class="w-full rounded-[40px]"
                  />
                </Picture>
              </figure>
            </Slider.Item>
          ))}
        </Slider>
      </div>
      <SliderJS rootId={id} />
    </div>
  );
}

export default Instagram;
