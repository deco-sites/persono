import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText(
  { tag, label, alignment }: {
    tag?: string;
    label?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col text-center${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-secondary">{tag}</div>}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container py-8 flex flex-col gap-8 lg:gap-10 text-base-content lg:py-10"
    >
      <Header
        title={header.title}
      // description={header.description || ""} //
        alignment={layout.headerAlignment || "center"}
      />

      <Slider class="flex justify-center items-center carousel carousel-start gap-6 lg:gap-8 row-start-2 row-end-5 relative">
        <div class="z-10 col-start-1 row-start-2 absolute left-2 lg:left-2 2xl:left-32 md:hidden rounded-full bg-white">
          <Slider.PrevButton class="btn btn-circle bg-white cursor-pointer"
          
          style={{
            border: '1px solid #D4DBD7',
          }}
          >
            <Icon
              class="text-sky-600"
              size={20}
              id="ChevronLeft"
              strokeWidth={2}
            />
          </Slider.PrevButton>
        </div>

        {list.map((
          { tag, label, description, href, image, buttonText },
          index,
        ) => (
          <Slider.Item
            index={index}
            class="flex flex-col gap-12 carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
          >
            <a
              href={href}
              class="flex flex-col gap-4 lg:w-[280px] w-40 lg:h-auto"
            >
              {layout.categoryCard?.textPosition === "top" &&
                (
                  <CardText
                    tag={tag}
                    label={label}
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}
              {image &&
                (
                  <figure class='relative'>
                    <Image 
                      class="card w-full rounded-3xl relative" 
                      src={image}
                      alt={description || label || tag}
                      width={280}
                      height={268}
                      loading="lazy"
                    />

                  <div class="card w-full absolute bottom-0 rounded-3xl h-full bg-gradient-to-b from-transparent to-black bg-opacity-10">
                    {label && <h3 class="flex text-lg self-center text-base text-white h-[60px] absolute bottom-1">{label}</h3>}
                  </div>
                  </figure>
                )}
              {layout.categoryCard?.textPosition === "bottom" &&
                (
                  <CardText
                    tag={tag}
                    label={label}
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}
            </a>
            {buttonText &&
              <a href={href} class="btn">{buttonText}</a>}
          </Slider.Item>
        ))}

        <div class="z-10 col-start-3 row-start-2 absolute right-2 lg:right-2 2xl:right-32 md:hidden bg-white rounded-full  cursor-pointer">
          <Slider.NextButton class="btn btn-circle border-solid border-black bg-white"
            
            style={{
              border: '1px solid #D4DBD7',
            }}
          >
            <Icon
              class="text-sky-600"
              size={24}
              id="ChevronRight"
              strokeWidth={2}
            />
          </Slider.NextButton>
        </div>
      </Slider>
      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
