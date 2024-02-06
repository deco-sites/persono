import { AppContext } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import { toProductSuggestionItems } from "./transform.ts";
import { ProductItem } from "$store/packs/types.ts";

export async function getSuggestionsItems(
  query: string,
  _req: Request,
  ctx: AppContext,
): Promise<Product[]> {
  const { ammoc, config } = ctx;
  const response = await ammoc
    ["GET /api/search/query-vinhedo-sku"](
      { query, "types[0][limit]": 5, "types[0][type]": "product" },
      {},
    );

  const { data } = await response.json();

  if (!data || data.length === 0) {
    return [];
  }

  const productItems = data[0].productItems;

  if (!productItems || productItems.length === 0) {
    return [];
  }

  const [productSuggestion] = productItems.map((item: ProductItem) =>
    toProductSuggestionItems(item, config)
  );

  return productSuggestion;
}
