import { Benefits } from "../../loaders/Layouts/Benefits.tsx";
import Image from "apps/website/components/Image.tsx";

interface Props {
  layout: Benefits[];
  name: string;
}

function containsAnyWord(
  productsNames: string[] | undefined,
  name: string,
): boolean {
  if (!productsNames) return false;
  for (const product of productsNames) {
    if (name.toLowerCase().includes(product.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export default function Benefits({ layout, name }: Props) {
  const benefitsHidden = layout.map((l) =>
    containsAnyWord(l.productName, name)
  );

  return (
    <div
      class={`max-w-lg ${
        benefitsHidden.some((value) => value === true) ? "" : "hidden"
      }`}
    >
      <h4 class="text-base">
        Benefícios para o sono
      </h4>
      <span class="flex flex-col gap-8 mt-8">
        {layout.slice(0, 3).map((l) =>
          containsAnyWord(l.productName, name)
            ? (
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <Image
                    src={l.icon}
                    class="text-primary"
                    width={36}
                    height={36}
                    alt={l.label}
                  />
                  <p class="text-md font-bold">{l.label}</p>
                </div>
                <p class="text-base">{l.description}</p>
              </div>
            )
            : null
        )}
      </span>
    </div>
  );
}
