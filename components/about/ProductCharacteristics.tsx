import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  title?: string;

  characteristics?: Array<{
    icon: AvailableIcons;
    label: string;
    description: string;
  }>;
}

function Product(
  props: Props,
) {
  const {
    characteristics = [{
      icon: "Truck",
      label: "",
      description: "",
    }, {
      icon: "Discount",
      label: "",
      description: "",
    }, {
      icon: "ArrowsPointingOut",
      label: "",
      description: "",
    }],
  } = props;

  const listOfCharacteristics = characteristics.map((characteristic) => {
    return (
      <div
        class={`flex sm:flex-row lg:flex-col sm:justify-center gap-4 w-full first:pt-0 last:pb-0 h-full max-lg:py-6 lg:pr-8 lg:pb-0`}
      >
        <div class="flex items-center">
          <Icon
            id={characteristic.icon}
            class="text-base-100"
            width={40}
            height={40}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex flex-col gap-1 lg:gap-2 sm:w-[36%] lg:w-auto">
          <div
            class={`text-base lg:text-xl leading-7 font-bold antialiased text-base-content w-full`}
          >
            {characteristic.label}
          </div>
          <p
            class={`text-sm leading-5 text-gray-800 lg:block`}
          >
            {characteristic.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div class="flex w-full container p-6 lg:gap-10 lg:py-10 lg:px-0">
        <Header />
        <div class="flex max-lg:flex-col sm:justify-center sm:items-center w-full lg:gap-9 p-6 lg:p-10 rounded">
          {listOfCharacteristics}
        </div>
      </div>
    </>
  );
}

export default Product;
