import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface About {
  title?: string;
  description?: string;

  desktop: ImageWidget;
  mobile: ImageWidget;
}

function About({ title, description, mobile, desktop }: About) {
  return (
    <div class="flex flex-col items-center w-full bg-[#f8f8f8]">
      <div class="flex flex-col py-14 gap-12 w-4/5">
        <h1 class=" sm:w-auto sm:text-center text-2xl font-medium">{title}</h1>
        <p class="font-normal sm:text-center">{description}</p>
      </div>
      <Picture>
        <Source
          media="(max-width: 767px)"
          src={mobile}
          width={360}
          height={336}
        />
        <Source
          media="(min-width: 768px)"
          src={desktop}
          width={1100}
          height={600}
        />
        <img
          src={desktop}
          class="w-full h-full object-cover"
        />
      </Picture>
    </div>
  );
}

export default About;
