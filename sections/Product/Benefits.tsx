import { PropertyValue } from "apps/commerce/types.ts";
import { Benefits } from "../../loaders/Layouts/Benefits.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  adminBenefits: Benefits[];
  productBenefits: PropertyValue[] | undefined;
}

export default function Benefits({
  productBenefits,
  adminBenefits,
}: Props) {
  if (!productBenefits) {
    return null;
  }

  const filteredAdminBenefits: Benefits[] = [];

  productBenefits.map((productBenefit) => {
    const { value } = productBenefit;
    const adminBenefit = adminBenefits.map((adminBenefit) => {
      if (adminBenefit.customAttribute == value?.toLocaleLowerCase()) {
        filteredAdminBenefits.push(adminBenefit);
      }
    });

    return {
      adminBenefit,
    };
  });

  return (
    <div class={`max-w-lg`}>
      <h4 class="text-base">Benefícios para o sono</h4>
      <span class="flex flex-col gap-8 mt-8">
        {filteredAdminBenefits.slice(0, 3).map((l) => (
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Image
                src={l.icon}
                class="text-primary w-7 h-7"
                width={36}
                height={36}
                alt={l.label}
              />
              <p class="text-md font-bold">{l.label}</p>
            </div>
            <p class="text-base">{l.description}</p>
          </div>
        ))}
      </span>
    </div>
  );
}
