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

export interface GroupedData {
  [key: string]: Array<{
    name: string;
    value: string;
    url: string;
  }>;
}

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set(["tecnicalSpecification", "kitItem", "tag"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductGroup | undefined,
): GroupedData => {
  const possibilities: Possibilities = {};
  const groupedData: GroupedData = {};
  if (!selected) return groupedData;

  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));

  const sku = selected.url?.split("/")[selected.url?.split("/").length - 1];
  const result: Result[] = [];
  const newSpecs: NewSpecs[] = [];
  const urlArr: string[] = [];
  for (const variant of variants) {
    const { url, additionalProperty = [], productID } = variant;
    const _isSelected = productID === sku;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    specs.map((s) =>
      newSpecs.push({ name: s.value, value: s.value, label: s.name })
    );

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;

      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      // First row is always selectable
      const _isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = url;

      if (url && !urlArr.includes(url)) {
        urlArr.push(url);
      }
    }
  }

  newSpecs.map((item, idx) => {
    if (idx % 2 != 0) {
      result.push({
        name: newSpecs[idx - 1].value,
        value: item.value,
        url: "url",
      });
    }
  });

  const updatedResult = result.map((obj, index) => {
    return { ...obj, url: urlArr[index] };
  });

  const organizedData: GroupedData = updatedResult.reduce(
    (acc, obj) => {
      const key = obj.name;
      const value = obj.value;
      if (key !== undefined && value !== undefined) {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({ name: key, value, url: obj.url });
      }
      return acc;
    },
    {} as GroupedData,
  );

  return organizedData;
};
