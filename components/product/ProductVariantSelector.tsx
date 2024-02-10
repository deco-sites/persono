import AvatarColor from "$store/components/ui/AvatarColor.tsx";
import AvatarSize from "$store/components/ui/AvatarSize.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { SizesGuideModal } from "deco-sites/persono/components/product/SizesGuideModal.tsx";

interface Props {
  product: Product;
  colors: Color[];
  sizes: Size[];
}

type Possibilities = { name: string; value: string; url: string };

function VariantSelector({ product, colors, sizes }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities: GroupedData = useVariantPossibilities(
    hasVariant,
    isVariantOf
  );

  let colorsPossibilities: Possibilities[] = [];
  const sizePossibilities: Possibilities[] = [];
  let color = "";

  // Find matching color and set colorsPossibilities and color
  Object.keys(possibilities).forEach((name) => {
    const link = Object.values(possibilities[name]).find(
      (link) => link.url === url
    );
    if (link) {
      colorsPossibilities = possibilities[name]
      color = link.value;
    }
  });

  // Find size possibilities based on the matched color
  Object.keys(possibilities).forEach((name) => {
    const links = Object.values(possibilities[name]).filter(
      (link) => color === link.value
    );
    sizePossibilities.push(...links);
  });

  // Sort array based in admin sizes
  const sortedSizeArray = sizePossibilities.sort((a, b) => {
    const indexA = sizes.findIndex((size) => size.size === a.name);
    const indexB = sizes.findIndex((size) => size.size === b.name);

    // Move os tamanhos não encontrados (índice -1) para o final
    if (indexA === -1 && indexB !== -1) {
      return 1; // Coloca b no final
    } else if (indexB === -1 && indexA !== -1) {
      return -1; // Coloca a no final
    }

    return indexA - indexB;
  });

  // Filter matching colors based on colors array
  const matchingColorsPossibilities = colorsPossibilities.filter((cp) =>
    colors.map((color) =>
      color.label.toLowerCase() === cp.value.toLowerCase()
        ? color
        : { label: "", hex: "", ring: "", img: "" }
    )
  );

  // colors in alphabet order
  matchingColorsPossibilities.sort((a, b) => {
    const labelA = a.value.toLowerCase();
    const labelB = b.value.toLowerCase();

    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  return (
    <div class="flex flex-col gap-4">
      <ul class="flex flex-col gap-2">
        <p class="text-sm">Tamanho</p>
        <div class="flex gap-3">
          {sortedSizeArray.map((cp) => (
            <ul class="flex flex-row gap-3">
              <li>
                <button f-partial={cp.url} f-client-nav>
                  <AvatarSize
                    content={cp.name}
                    variant={
                      cp.url === url ? "active" : cp ? "default" : "disabled"
                    }
                  />
                </button>
              </li>
            </ul>
          ))}

          <label
            for="my_modal_6"
            class="btn underline btn-link p-0 text-black text-sm font-normal"
          >
            Guia de tamanhos
          </label>
          <SizesGuideModal segment={product.category?.split(">")[0]} />
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
                variant={
                  cp.url === url ? "active" : cp.value ? "default" : "disabled"
                }
              />
            </button>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default VariantSelector;
