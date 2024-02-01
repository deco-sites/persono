import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface About {
  title?: string;
  description?: string;
  image: ImageWidget;
}

function About({ title, description, image }: About) {
  return (
    <div class="flex flex-col w-full bg-stone-50">
      <div class="flex flex-col items-center py-[56px] gap-12">
        <h1 class="text-2xl font-medium">{title}</h1>
        <p class="font-normal text-base/[24px] w-[312px]">{description}</p>
      </div>

      <figure class="h-auto w-full">
        <Picture>
          <Source
            media="(max-width: 380px)"
            src={image}
            width={220}
            height={268}
          />
          <img
            src={image}
            height={336}
            width={380}
            loading="lazy"
            class="w-full"
          />
        </Picture>
      </figure>
    </div>
  );
}

export default About;
