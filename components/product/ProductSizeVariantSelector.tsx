import AvatarSize from "$store/components/ui/AvatarSize.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { SizeGuideGroup } from "deco-sites/persono/loaders/Layouts/SizeGuide.tsx";
import SizeGuideModalButton from "deco-sites/persono/islands/SizeGuideModalButton.tsx";

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
          <SizeGuideModalButton
            category={category}
            categorySizes={categorySizes}
            device={device}
          />
        </div>
      </ul>
    </div>
  );
}

export default VariantSizeSelector;
