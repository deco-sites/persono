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

type Possibilities = { name: string; value: string; url: string };

function VariantSelector({ product, colors }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities: GroupedData = useVariantPossibilities(
    hasVariant,
    isVariantOf,
  );

  let colorsPossibilities: Possibilities[] = [];
  const sizePossibilities: Possibilities[] = [];
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

  const matchingColorsPossibilities = colorsPossibilities.filter((cp) =>
    colors.some((color) => color.label.toLowerCase() === cp.value.toLowerCase())
  );

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
          {matchingColorsPossibilities.map((cp) => (
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
          ))}
        </div>
      </ul>
    </div>
  );
}

export default VariantSelector;
