import AvatarColor from "$store/components/ui/AvatarColor.tsx";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  possibilities: GroupedData;
  colors: Color[];
  url: string | undefined;
  productsNotAvailable: string[];
}

type Possibilities = { name: string; value: string; url: string; sku: string };

function VariantColorSelector({
  productsNotAvailable,
  url,
  possibilities,
  colors,
}: Props) {
  let colorsPossibilities: Possibilities[] = [];
  let color = "";

  // Find matching color and set colorsPossibilities and color
  Object.keys(possibilities).forEach((name) => {
    const link = Object.values(possibilities[name]).find(
      (link) => link.url === url,
    );
    if (link) {
      colorsPossibilities = possibilities[name];
      color = link.value;
    }
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
        <p class="text-sm">Cor: {color}</p>
        <div class="flex gap-3">
          {matchingColorsPossibilities.map((cp) => (
            <button
              disabled={productsNotAvailable.includes(cp.sku) ? true : false}
              f-partial={cp.url}
              f-client-nav
            >
              <AvatarColor
                color={colors}
                name={cp.name}
                content={cp.value}
                variant={cp.url === url
                  ? "active"
                  : productsNotAvailable.includes(cp.sku)
                  ? "disabled"
                  : "default"}
              />
            </button>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default VariantColorSelector;
