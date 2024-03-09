import AvatarSize from "$store/components/ui/AvatarSize.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { SizeGroup } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { SizesGuideModal } from "deco-sites/persono/components/product/SizesGuideModal.tsx";

interface Props {
  url: string | undefined;
  sizes: SizeGroup[];
  possibilities: GroupedData;
  productsNotAvailable: string[];
  category: string;
}

type Possibilities = { name: string; value: string; url: string; sku: string };

function VariantSizeSelector({
  productsNotAvailable,
  url,
  possibilities,
  sizes,
  category,
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

  const rawCategorySizes = sizes.filter((s) =>
    s.category.toLowerCase() == category.toLowerCase()
  );

  const categorySizes = rawCategorySizes.map((item) => item.size)
    .flat()
    .map(({ name, value }) => ({ name, value }));

  // Sort array based in admin sizes
  const sortedSizeArray = sizePossibilities.sort((a, b) => {
    const indexA = categorySizes.findIndex((size) => size.name === a.name);
    const indexB = categorySizes.findIndex((size) => size.name === b.name);

    if (indexA === -1 && indexB !== -1) {
      return 1;
    } else if (indexB === -1 && indexA !== -1) {
      return -1;
    }

    return indexA - indexB;
  });

  const newCategorySize = sortedSizeArray.map((item) => {
    const match = categorySizes.find((a1Item) =>
      a1Item.name.toLowerCase() === item.name.toLowerCase()
    );
    return match ? { ...match } : null;
  }).filter((item) => item !== null) as { name: string; value: string }[];

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
              !rawCategorySizes || rawCategorySizes.filter((c) => (
                    c.category.toLowerCase() === category.toLowerCase()
                  )
                  ).length > 0
                ? ""
                : "hidden"
            } ${category.length <= 0 ? "hidden" : ""}`}
          >
            Guia de tamanhos
          </label>
          <SizesGuideModal sizes={newCategorySize} segment={category} />
        </div>
      </ul>
    </div>
  );
}

export default VariantSizeSelector;
