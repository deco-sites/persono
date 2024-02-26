import Header from "$store/components/ui/SectionHeader.tsx";
import { Benefits } from "deco-sites/persono/loaders/Layouts/Benefits.tsx";

export interface Props {
  benefits?: Benefits[];
}

export default function Benefits(props: Props) {
  const listOfBenefits = props.benefits?.map((benefit) => {
    return (
      <div
        class={`flex sm:flex-row lg:flex-col sm:justify-center gap-4 w-full first:pt-0 last:pb-0 h-full max-lg:py-6 lg:pr-8 lg:border-r lg:last:border-r-0 lg:pb-0`}
      >
        <div class="flex items-center">
          <img src={benefit.icon} />
        </div>
        <div class="flex flex-col gap-1 lg:gap-2 sm:w-[36%] lg:w-auto">
          <div
            class={`text-base lg:text-xl leading-7 font-bold antialiased text-base-content w-full`}
          >
            {benefit.label}
          </div>
          <p class={`text-sm leading-5 text-gray-800 lg:block`}>
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div class="flex w-full container p-6 lg:gap-10 lg:py-20 lg:px-0">
        <Header />
        <div class="flex max-lg:flex-col sm:justify-center sm:items-center w-full border border-[#cccccc] lg:gap-9 p-6 lg:p-10 rounded divide-y lg:divide-y-0 divide-[#cccccc]">
          {listOfBenefits}
        </div>
      </div>
    </>
  );
}
