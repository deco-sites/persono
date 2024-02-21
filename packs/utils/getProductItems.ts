import { AppContext } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import { toProductItems } from "./transform.ts";
import { ProductItem } from "$store/packs/types.ts";

export async function getProductItems(
  query: string,
  req: Request,
  ctx: AppContext,
  limit?: number,
  offset?: number,
): Promise<Product[]> {
  const { ammoc, config, imageBaseUrl } = ctx;
  const url = new URL(req.url);
  const response = await ammoc
    ["GET /api/search/query-vinhedo-sku"](
      {
        query,
        "types[0][limit]": limit,
        "types[0][type]": "product",
        "types[0][take]": offset,
      },
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

  console.log(productItems)

  const productItemsResult = productItems.map((item: ProductItem) =>
    toProductItems(item, config, url, imageBaseUrl)
  );

  return productItemsResult;
}
