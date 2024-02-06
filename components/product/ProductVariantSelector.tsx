import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  colors: Color[];
}

function VariantSelector({ product, colors }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities: GroupedData = useVariantPossibilities(
    hasVariant,
    isVariantOf
  );

  let colorsPossibilities: { name: string; value: string; url: string }[] = [];

  {
    Object.keys(possibilities).map((name) => {
      {
        Object.entries(possibilities[name]).map(([_value, link]) => {
          if (link.url == url) {
            colorsPossibilities = possibilities[name];
          }
        });
      }
    });
  }

  {
    Object.keys(possibilities).map((name) => {
      {
        Object.entries(possibilities[name]).map(([_value, link]) => {
          if (link.url == url) {
            console.log(link.value)
          }
        });
      }
    });
  }

  return (
    <ul class="flex gap-4">
      {colorsPossibilities.map((cp) => (
        <ul class="flex flex-row gap-3">
          <li>
            <button f-partial={cp.url} f-client-nav>
              <Avatar
                color={colors}
                name={cp.name}
                content={cp.value}
                variant={
                  cp.url === url ? "active" : cp ? "default" : "disabled"
                }
              />
            </button>
          </li>
        </ul>
      ))}
    </ul>
  );
}

export default VariantSelector;
