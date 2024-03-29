import { PropertyValue } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { Benefits } from "../../loaders/Layouts/Benefits.tsx";

interface Props {
  adminBenefits: Benefits[];
  productBenefits: PropertyValue[] | undefined;
}

export default function ProductBenefits({
  productBenefits,
  adminBenefits,
}: Props) {
  if (!productBenefits) {
    return null;
  }

  const filteredBenefits = productBenefits.reduce<Benefits[]>(
    (acc, { value }) => {
      if (!value) return acc;

      const adminBenefit = adminBenefits.find((adminBenefit) =>
        adminBenefit.customAttribute === value?.toLocaleLowerCase()
      );

      if (!adminBenefit) return acc;

      return [...acc, adminBenefit!];
    },
    [],
  );

  console.log(productBenefits);

  return (
    <div class={`max-w-lg`}>
      <h4 class="text-base">Benefícios para o sono</h4>
      <div class="flex flex-col gap-8 mt-8">
        {filteredBenefits.map((benefit) => (
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Image
                src={benefit.icon}
                width={28}
                height={28}
                alt={benefit.label}
              />
              <p class="text-md font-bold">{benefit.label}</p>
            </div>
            <p class="text-base">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
