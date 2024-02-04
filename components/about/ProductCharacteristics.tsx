import { Benefits } from "deco-sites/persono/loaders/Layouts/Benefits.tsx";
export interface Props {
  benefits?: Benefits[];
}

function Product(props: Props) {
  console.log(props.benefits);

  const listOfBenefits = props.benefits?.map((benefit) => {
    return (
      <div
        class={`flex sm:flex-row lg:flex-col sm:justify-center gap-4 w-full first:pt-0 last:pb-0 h-full max-lg:py-6 lg:pr-8 lg:pb-0 bg-blue-500`}
      >
        <div class="flex items-center">
          <img src={benefit.icon} />
        </div>
        <div class="flex flex-col w-[50%] gap-1 lg:gap-2]">
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
      <h1>TESTE</h1>
      <div class="flex w-full container p-6 lg:gap-10 lg:py-10 lg:px-0">
        <div class="flex max-lg:flex-col sm:justify-center sm:items-center w-full lg:gap-9 p-6 lg:p-10 rounded divide-y lg:divide-y-0">
          {listOfBenefits}
        </div>
      </div>
    </>
  );
}

export default Product;
