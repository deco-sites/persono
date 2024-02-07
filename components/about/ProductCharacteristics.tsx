import { Benefits } from "deco-sites/persono/loaders/Layouts/Benefits.tsx";
export interface Props {
  benefits?: Benefits[];
}

function Product(props: Props) {
  console.log(props.benefits);

  const listOfBenefits = props.benefits?.map((benefit) => {
    return (
      <div
        class={`flex flex-col gap-3 w-full h-full`}
      >
        <div class="flex items-center">
          <img src={benefit.Icon} />
        </div>
        <div class="flex flex-col gap-3">
          <div
            class={`antialiased w-full`}
          >
            <h1 class="text-base leading-7 font-bold">
              {benefit.label}
            </h1>
          </div>
          <p class={`text-base font-medium leading-5 lg:block`}>
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div class="container flex flex-col pt-20 pb-10 px-6 md:pt-28 md:px-0 gap-14">
        <div class="w-full">
          <h1 class="text-2xl lg:text-3xl md:w-8/12 font-medium">
            Nossos produtos trazem as características ideais para melhorar seu
            sono
          </h1>
        </div>
        <div class="flex flex-col sm:grid sm:grid-cols-2 w-full sm:justify-center gap-10 sm:gap-x-8">
          {listOfBenefits}
        </div>
      </div>
    </>
  );
}

export default Product;
