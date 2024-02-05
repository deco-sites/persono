import type { ProductLeaf, PropertyValue } from "apps/commerce/types.ts";
import { ProductGroup } from "apps/commerce/types.ts";

export type Possibilities = Record<string, Record<string, string | undefined>>;

type NewSpecs = {
  name: string | undefined;
  value: string | undefined;
  label: string | undefined;
};

type Result = {
  name: string | undefined;
  value: string | undefined;
  url: string | undefined;
};

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set(["tecnicalSpecification", "kitItem", "tag"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductGroup | undefined,
): Possibilities => {
  const possibilities: Possibilities = {};
  if (!selected) return possibilities;

  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));

  const sku = selected.url?.split("/")[selected.url?.split("/").length - 1];
  const result: Result[] = [];
  const newSpecs: NewSpecs[] = [];
  for (const variant of variants) {
    const { url, additionalProperty = [], productID } = variant;
    const isSelected = productID === sku;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    specs.map((s) =>
      newSpecs.push({ name: s.value, value: s.value, label: s.name })
    );

    // console.log(newSpecs)

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;

      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      // console.log({name,value})
      // First row is always selectable
      const isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = isSelected
        ? url
        : isSelectable
        ? possibilities[name][value] || url
        : possibilities[name][value];

      // console.log({name,value})
    }
  }

  newSpecs.map((item, idx) => {
    console.log(
      item.value,
      item.label,
      possibilities[String(item.label)][String(item.value)],
    );
    if (idx % 2 != 0) {
      const url = possibilities[String(item.label)][String(item.value)];
      result.push({
        name: newSpecs[idx - 1].value,
        value: item.value,
        url: url,
      });
    }
  });

  // console.log(possibilities);
  // console.log(newSpecs);

  return possibilities;
};
