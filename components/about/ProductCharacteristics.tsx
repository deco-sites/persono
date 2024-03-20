import Image from "apps/website/components/Image.tsx";
import { Benefits } from "deco-sites/persono/loaders/Layouts/Benefits.tsx";

export interface Props {
  benefits?: Benefits[];
}

function ProductCharacteristics(props: Props) {
  const listOfBenefits = props.benefits?.filter((current) => {
    return current.showInHome;
  }).map((benefit) => {
    return (
      <div
        class={`flex flex-col gap-3 w-full h-full`}
      >
        <Image
          src={benefit.icon}
          loading="lazy"
          width={32}
          height={32}
          alt={benefit.label + "image"}
        />
        <div class="flex flex-col gap-3">
          <h3 class="text-base leading-7 font-bold">
            {benefit.label}
          </h3>
          <p class={`text-base font-medium leading-5 lg:block`}>
            {benefit.descriptionHome || benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div class="container flex flex-col pt-20 pb-10 px-6 md:pt-28 md:px-0 gap-14">
        <p class="w-full text-2xl lg:text-3xl md:w-8/12 font-medium">
          Nossos produtos trazem as características ideais para melhorar seu
          sono
        </p>
        <div class="flex flex-col sm:grid sm:grid-cols-2 w-full sm:justify-center gap-10 sm:gap-x-8">
          {listOfBenefits}
        </div>
      </div>
    </>
  );
}

export default ProductCharacteristics;
