import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;

  image?: ImageWidget;
}

function PdcGallery({ title, image }: Props) {
  return (
    <div class="container bg-purple-500 h-auto w-full flex flex-col items-center">
      <Header
        title={title}
        alignment="center"
      />

      <div class="w-full h-[304px]">
        <div class="flex w-full h-auto rounded-[40px]">
          <img
            src={image}
            class="w-2/4 h-full object-cover"
            height={307}
            width={307}
          />

          <div class="flex flex-col bg-black h-full w-2/4">
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdcGallery;
