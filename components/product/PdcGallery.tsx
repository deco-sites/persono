import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Product {
  image?: ImageWidget;
  label?: string;
  href?: string;
  description?: string;
  price?: string;
  pricedescription?: string;
}

export interface Props {
  title?: string;
  layout: Product[];
}

function PdcGallery(props: Props) {
  const {
    title,

    layout = [
      {
        image: "",
        label: "",
        href: "",
        description: "",
        price: "",
        pricedescription: "",
      },
    ],
  } = props;

  return (
    <div class="container flex flex-col h-auto w-full pt-10 px-6 sm:px-0">
      <Header
        title={title}
        alignment="center"
      />
      <div class="flex flex-col lg:grid lg:grid-cols-2 w-full h-auto gap-10">
        {layout.map((
          { image, description, label, price, href, pricedescription },
        ) => (
          <a
            href={href}
          >
            <div class="flex w-full h-[304px]">
              <img
                src={image}
                class="w-[60%] h-auto object-cover rounded-l-[40px]"
                height={307}
                width={307}
              />

              <div class="flex justify-between items-center flex-col bg-black h-auto w-[40%] px-6 py-6 sm:py-12 rounded-r-[40px]">
                <h3 class="text-white text-base sm:text-2xl font-medium w-full">
                  {label}
                </h3>

                <div class="flex flex-col h-auto w-full text-white">
                  <p class="text-sm">{description}</p>
                  <p class="font-medium text-base sm:text-2xl">{price}</p>
                  <p class="text-sm">{pricedescription}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PdcGallery;
