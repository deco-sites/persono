import Header from "$store/components/ui/SectionHeader.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  benefits?: {
    icon: ImageWidget;
    label: string;
    description: string;
  }[];
}

export default function Benefits(props: Props) {
  const listOfBenefits = props.benefits?.map((benefit, idx) => {
    return (
      <div
        class={`flex sm:flex-row lg:flex-col sm:justify-center gap-4 w-full first:pt-0 last:pb-0 h-full max-lg:py-6 lg:pr-8 lg:border-r lg:last:border-r-0 lg:pb-0`}
      >
        <Image
          src={benefit.icon}
          loading="lazy"
          width={40}
          height={40}
          alt={benefit.label + " image " + idx}
        />
        <div class="flex flex-col gap-1 lg:gap-2 sm:w-[36%] lg:w-auto">
          <p class="text-base lg:text-xl leading-7 font-bold antialiased text-base-content w-full">
            {benefit.label}
          </p>
          <p class={`text-sm leading-5 text-gray-800 lg:block`}>
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div class="flex w-full container px-6 pb-[62px] pt-6 lg:py-20 sm:px-0">
        <Header />
        <div class="flex max-lg:flex-col sm:justify-center sm:items-center w-full border border-gray-100 lg:gap-9 p-6 lg:p-10 rounded divide-y lg:divide-y-0 divide-gray-100">
          {listOfBenefits}
        </div>
      </div>
    </>
  );
}
