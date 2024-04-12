import { IS_BROWSER } from "$fresh/runtime.ts";
import { invoke } from "deco-sites/persono/runtime.ts";

export const getUrl = (basePath?: string) => {
  if (IS_BROWSER) {
    const origin = window.location.origin;
    const url = new URL(basePath ?? "", origin).href;
    return url;
  }
  return "";
};

export async function redirectWithFilters({
  transformedArray,
  basePath,
}: {
  transformedArray: {
    type: string;
    slugs: string[];
  }[];
  basePath?: string;
}) {
  const url = getUrl(basePath);
  const response = await invoke["deco-sites/persono"].loaders.url({
    filters: transformedArray,
    origin: url,
  });

  if (!response || !response.url) {
    window.location.href = url;
    return null;
  }
  window.location.href = response.url;
}
