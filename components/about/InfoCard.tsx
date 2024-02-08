import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  description?: string;

  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
  };
}

function About({ title, description, image }: Props) {
  const {
    desktop,
    mobile,
  } = image;

  return (
    <div class="bg-base-200">
      <div class="container w-full flex flex-col items-center">
        <div class="flex flex-col py-14 lg:pb-[76px] gap-12 w-4/5 lg:w-3/4">
          <h1 class=" sm:w-auto sm:text-center text-2xl font-medium">
            {title}
          </h1>
          <p class="font-normal sm:text-center">{description}</p>
        </div>
      </div>
      <Picture>
        <Source
          media="(max-width: 768px)"
          src={mobile}
          width={400}
          height={336}
        />
        <Source
          media="(min-width: 768px)"
          src={desktop}
          width={1400}
          height={600}
        />
        <img
          src={desktop}
          class="h-full w-full object-cover"
        />
      </Picture>
    </div>
  );
}

export default About;
