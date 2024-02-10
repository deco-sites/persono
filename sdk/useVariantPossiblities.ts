import type { ProductLeaf } from "apps/commerce/types.ts";
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

const omit = new Set(["tecnicalSpecification", "kitItem", "tag"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductGroup | undefined,
): GroupedData => {
  const possibilities: Possibilities = {};
  const groupedData: GroupedData = {};
  if (!selected) return groupedData;

  const result: Result[] = [];
  const newSpecs: NewSpecs[] = [];
  const urlSet: Set<string> = new Set();

  for (const variant of variants) {
    const { url, additionalProperty = [] } = variant;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    specs.map(({ name, value }) =>
      newSpecs.push({ name, value, label: name })
    );

    for (const { name, value } of specs) {
      if(!name || !value) continue;
      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      possibilities[name][value] = url;
      urlSet.add(url ?? "");
    }
  }

  for (let idx = 1; idx < newSpecs.length; idx += 2) {
    result.push({
      name: newSpecs[idx - 1].value,
      value: newSpecs[idx].value,
      url: "url",
    });
  }

  const urlArr = Array.from(urlSet);
  const updatedResult = result.map((obj, index) => ({ ...obj, url: urlArr[index] }));

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