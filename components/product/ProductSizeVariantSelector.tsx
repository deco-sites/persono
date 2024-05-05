import AvatarSize from "$store/components/ui/AvatarSize.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { SizeGuideGroup } from "deco-sites/persono/loaders/Layouts/SizeGuide.tsx";
import { SizesGuideModal } from "deco-sites/persono/components/product/SizesGuideModal.tsx";
import Drawers from "deco-sites/persono/components/header/Drawers.tsx";
import Drawer from "deco-sites/persono/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  url: string | undefined;
  sizes: Size[];
  sizeGuide: SizeGuideGroup[];
  possibilities: GroupedData;
  productsNotAvailable: string[];
  category: string;
  device: string;
}

type Possibilities = { name: string; value: string; url: string; sku: string };

function VariantSizeSelector({
  productsNotAvailable,
  url,
  possibilities,
  sizes,
  category,
  sizeGuide,
  device,
}: Props) {
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
    const indexA = sizes.findIndex((size) => size.name === a.name);
    const indexB = sizes.findIndex((size) => size.name === b.name);

    if (indexA === -1 && indexB !== -1) {
      return 1;
    } else if (indexB === -1 && indexA !== -1) {
      return -1;
    }

    return indexA - indexB;
  });

  const lowerCategory = category.toLowerCase();

  const categorySizes = sizeGuide
    .filter((s) => s.category.toLowerCase() === lowerCategory)
    .flatMap(({ size }) => size.map(({ name, value }) => ({ name, value })));

  const showMobile = useSignal<boolean>(false);

  return (
    <div class="flex flex-col gap-4">
      <ul class="flex flex-col gap-2">
        <p class="text-sm">Tamanho</p>
        <div class="sm:flex-row flex flex-col gap-2">
          <div class="flex flex-wrap gap-3">
            {sortedSizeArray.map((cp) => (
              <ul class="flex flex-row gap-3">
                <li>
                  <button
                    disabled={productsNotAvailable.includes(cp.sku)
                      ? true
                      : false}
                    f-partial={cp.url}
                    f-client-nav
                  >
                    <AvatarSize
                      content={cp.name}
                      variant={cp.url === url
                        ? "active"
                        : productsNotAvailable.includes(cp.sku)
                        ? "disabled"
                        : "default"}
                    />
                  </button>
                </li>
              </ul>
            ))}
          </div>

          <label
            for="my_modal_6"
            class={`btn justify-start underline btn-link p-0 text-black text-sm font-normal ${
              categorySizes.length <= 0 ? "hidden" : ""
            }`}
            onClick={() => {
              showMobile.value = true;
            }}
          >
            Guia de tamanhos
          </label>
          {device === "desktop"
            ? (
              <SizesGuideModal
                device={device}
                sizes={categorySizes}
                segment={category}
                showMobile={showMobile}
              />
            )
            : (
              <Drawer
                class=""
                onClose={() => showMobile.value = false}
                open={showMobile.value}
                aside={
                  <SizesGuideModal
                    device={device}
                    sizes={categorySizes}
                    segment={category}
                    showMobile={showMobile}
                  />
                }
              />
            )}
        </div>
      </ul>
    </div>
  );
}

export default VariantSizeSelector;
