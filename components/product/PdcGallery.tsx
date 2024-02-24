import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Product {
  image?: ImageWidget;
  label?: string;
  description?: string;
  price?: string;
  pricedescription?: string;
}

export interface Props {
  header?: {
    title?: string;
  };

  layout: Product[];
}

function PdcGallery(props: Props) {
  const {
    header = {
      title: "",
    },
    layout = [
      {
        image: "",
        label: "",
        description: "",
        price: "",
        pricedescription: "",
      },
    ],
  } = props;

  return (
    <div class="container h-auto w-full flex flex-col gap-10">
      <Header
        title={header.title}
        alignment="center"
      />
      <div class="w-full h-auto justify-center">
        {layout.map((
          { image, description, label, price, pricedescription },
        ) => (
          <div class="flex w-full h-auto md:w-1/2">
            <img
              src={image}
              class="w-[60%] h-full object-cover rounded-l-3xl"
              height={307}
              width={307}
            />

            <div class="flex justify-between items-center flex-col bg-black h-auto w-1/2 px-6 py-6 sm:py-12 rounded-r-3xl">
              <h3 class="text-white text-base sm:text-2xl font-medium w-full">
                {label}
              </h3>

              <div class="flex flex-col h-auto w-full text-white">
                <p class="text-xs">{description}</p>
                <p class="font-medium text-base sm:text-2xl">{price}</p>
                <p class="text-xs">{pricedescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PdcGallery;
