import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";

interface Props {
  product: Product;
  colors: Color[];
}

function VariantSelector({ product, colors }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, isVariantOf);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => (
              <li>
                <button f-partial={link} f-client-nav>
                  <Avatar
                    color={colors}
                    name={name}
                    content={value}
                    variant={
                      link === url ? "active" : link ? "default" : "disabled"
                    }
                  />
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
