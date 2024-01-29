import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  benefits?: Array<{
    label: string;
    icon: AvailableIcons;
    description: string;
  }>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    benefits = [{
      icon: "Truck",
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: "Discount",
      label: "15% na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: "ArrowsPointingOut",
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content px-8 py-4" : ""
        } flex sm:flex-row lg:flex-col gap-4 w-full sm:w-[48%]${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${showDivider && benefitLayout !== "piledup" ? "max-lg:py-6" : ""} ${
          showDivider ? "lg:pr-8 lg:border-r lg:border-b-0" : ""
        } ${showDivider && !reverse ? "lg:pb-0" : ""}`}
      >
        <div class="flex items-center">
          <Icon
            id={benefit.icon}
            class={reverse ? "text-base-100" : "text-primary"}
            width={40}
            height={40}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col gap-1 lg:gap-2">
          <div
            class={`text-base lg:text-xl leading-7 font-bold antialiased ${
              reverse ? "text-base-100" : "text-base-content"
            }`}
          >
            {benefit.label}
          </div>
          <p
            class={`text-sm leading-5 ${
              reverse ? "text-base-100" : "text-gray-800"
            } ${benefitLayout == "piledup" ? "hidden lg:block" : ""}`}
          >
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="flex w-full container p-6 lg:gap-10 lg:py-10 lg:px-0">
            <Header
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="flex max-lg:flex-col sm:justify-center sm:items-center w-full max-lg:[&>*:first-child]:pt-0 max-lg:[&>*:last-child]:pt-6 border max-lg:divide-y divide-neutral-300 lg:gap-9 p-10">
              {listOfBenefits}
            </div>
          </div>
        )
        : ""}
    </>
  );
}
