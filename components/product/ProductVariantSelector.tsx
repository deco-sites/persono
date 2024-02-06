import AvatarColor from "$store/components/ui/AvatarColor.tsx";
import AvatarSize from "$store/components/ui/AvatarSize.tsx";
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
    isVariantOf,
  );

  let colorsPossibilities: { name: string; value: string; url: string }[] = [];
  const sizePossibilities: { name: string; value: string; url: string }[] = [];
  let color = "";

  {
    Object.keys(possibilities).map((name) => {
      {
        Object.entries(possibilities[name]).map(([_value, link]) => {
          if (link.url == url) {
            colorsPossibilities = possibilities[name];
             color = link.value;
          }
        });
      }
    });
  }

  {
    Object.keys(possibilities).map((name) => {
      Object.entries(possibilities[name]).map(([_value, link]) => {
        if (color == link.value) {
          sizePossibilities.push(link);
        }
      });
    });
  }

  return (
    <div class="flex flex-col gap-4">
      <ul class="flex flex-col gap-2">
        <p class="text-sm">Tamanho</p>
        <div class="flex gap-3">
          {sizePossibilities.map((cp) => (
            <ul class="flex flex-row gap-3">
              <li>
                <button f-partial={cp.url} f-client-nav>
                  <AvatarSize
                    name={cp.name}
                    content={cp.name}
                    variant={cp.url === url
                      ? "active"
                      : cp
                      ? "default"
                      : "disabled"}
                  />
                </button>
              </li>
            </ul>
          ))}
        </div>
      </ul>

      <ul class="flex flex-col gap-2">
        <p class="text-sm">Cor: {color}</p>
        <div class="flex gap-3">
          {colorsPossibilities.map((cp) => (
            <ul class="flex flex-row gap-2">
              <li>
                <button f-partial={cp.url} f-client-nav>
                  <AvatarColor
                    color={colors}
                    name={cp.name}
                    content={cp.value}
                    variant={cp.url === url
                      ? "active"
                      : cp
                      ? "default"
                      : "disabled"}
                  />
                </button>
              </li>
            </ul>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default VariantSelector;
