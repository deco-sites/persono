import AvatarSize from "$store/components/ui/AvatarSize.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { SizesGuideModal } from "deco-sites/persono/components/product/SizesGuideModal.tsx";

interface Props {
  url: string | undefined;
  sizes: Size[];
  possibilities: GroupedData;
}

type Possibilities = { name: string; value: string; url: string };

function VariantSizeSelector({ url, possibilities, sizes }: Props) {
  const sizePossibilities: Possibilities[] = [];
  let color = "";

  // Find matching color and set colorsPossibilities and color
  Object.keys(possibilities).forEach((name) => {
    const link = Object.values(possibilities[name]).find(
      (link) => link.url === url,
    );
    if (link) {
      color = link.value;
    }
  });

  // Find size possibilities based on the matched color
  Object.keys(possibilities).forEach((name) => {
    const links = Object.values(possibilities[name]).filter(
      (link) => color === link.value,
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

  return (
    <div class="flex flex-col gap-4">
      <ul class="flex flex-col gap-2">
        <p class="text-sm">Tamanho</p>
        <div class="flex gap-3">
          {sortedSizeArray.map((cp) => (
            <ul class="flex flex-row gap-3">
              <li>
                <button
                  disabled={cp.value ? false : true}
                  f-partial={cp.url}
                  f-client-nav
                >
                  <AvatarSize
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

          <label
            for="my_modal_6"
            class="btn underline btn-link p-0 text-black text-sm font-normal"
          >
            Guia de tamanhos
          </label>
          {/* <SizesGuideModal segment={product.category?.split(">")[0]} /> */}
        </div>
      </ul>
    </div>
  );
}

export default VariantSizeSelector;
