import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;

  image?: ImageWidget;
  description?: string;
  label?: string;
  price?: string;
  pricedescription?: string;
}

function PdcGallery(
  { title, image, description, label, price, pricedescription }: Props,
) {
  return (
    <div class="container h-auto w-full flex flex-col items-center">
      <Header
        title={title}
        alignment="center"
      />

      <div class="w-full h-auto rounded-[40px]">
        <div class="flex w-full h-auto">
          <img
            src={image}
            class="w-2/4 h-full object-cover"
            height={307}
            width={307}
          />

          <div class="flex justify-between items-center flex-col bg-black h-auto w-1/2 px-6 py-12">
            <h3 class="text-white text-2xl font-medium">
              {description}
            </h3>

            <div class="flex flex-col h-auto w-full text-white">
              <p class="text-xs">{label}</p>
              <p class="font-medium text-2xl">{price}</p>
              <p class="text-xs">{pricedescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdcGallery;
