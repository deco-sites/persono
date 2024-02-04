import { Benefits } from "deco-sites/persono/loaders/Layouts/Benefits.tsx";
export interface Props {
  benefits?: Benefits[];
}

function Product(props: Props) {
  console.log(props.benefits);

  const listOfBenefits = props.benefits?.map((benefit) => {
    return (
      <div
        class={`flex flex-col gap-3 w-full first:pt-0 last:pb-0 h-full`}
      >
        <div class="flex items-center">
          <img src={benefit.icon} />
        </div>
        <div class="flex flex-col gap-3">
          <div
            class={`antialiased w-full`}
          >
            <h1 class="text-base leading-7 font-bold">{benefit.label}</h1>
          </div>
          <p class={`text-base leading-5 lg:block`}>
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div class="flex w-full flex-col items-center pt-20 pb-10 gap-14 pr-10 pl-6">
        <h1 class="text-2xl font-medium">
          Nossos produtos trazem as características ideais para melhorar seu
          sono
        </h1>
        <div class="flex flex-col w-full gap-10">
          {listOfBenefits}
        </div>
      </div>
    </>
  );
}

export default Product;
