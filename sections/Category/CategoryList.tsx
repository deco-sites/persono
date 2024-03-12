import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Category {
  label: string;
  href: string;
  image: ImageWidget;
}

export interface Props {
  header?: {
    title?: string;
  };
  list?: Category[];
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
    },
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="container flex flex-col pb-[60px] pt-5"
    >
      <div class="pl-6 py-10 sm:pl-0">
        <Header title={header.title} />
      </div>
      <div class="relative">
        <Slider.PrevButton class="justify-center btn btn-circle btn-accent text-primary disabled:bg-white border border-neutra z-10 absolute left-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer">
          <Icon
            size={20}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.PrevButton>
        <Slider class="flex carousel carousel-start gap-6 lg:gap-14">
          {list.map((
            { label, href, image },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col carousel-item first-of-type:pl-6 sm:first-of-type:pl-0 lg:w-[calc(25%-42px)] sm:w-[calc(33.3%-16px)] w-2/3"
            >
              <a
                href={href}
                class="rounded-[40px] overflow-hidden relative"
              >
                <figure class="relative animateImage">
                  <Picture>
                    <Source
                      media="(max-width: 767px)"
                      src={image}
                      width={220}
                      height={268}
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
                      class="w-full animateImage"
                    />
                  </Picture>
                  <div class="absolute left-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-10" />
                </figure>

                <h3 class="w-full text-center text-base text-white absolute bottom-[52px] left-0 px-2">
                  {label}
                </h3>
              </a>
            </Slider.Item>
          ))}
        </Slider>
        <Slider.NextButton class="justify-center btn btn-circle btn-accent text-primary disabled:bg-white border border-neutra z-10 absolute right-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer">
          <Icon
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

export default CategoryList;
