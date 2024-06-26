import { AppContext } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import { toProductItems } from "./transform.ts";
import { ProductItem, VinhedoSkuAPI } from "$store/packs/types.ts";

export async function getProductItems(
  query: string,
  _req: Request,
  ctx: AppContext,
  limit?: number,
  offset?: number,
): Promise<Product[]> {
  const { ammoc, config, imageBaseUrl } = ctx;
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

  const { data } = await response.json() as VinhedoSkuAPI;

  if (!data || data.length === 0) {
    return [];
  }

  const productItems = data[0].productItems;
  const productCards = data[0].productCards;

  if (!productItems || productItems.length === 0) {
    return [];
  }

  const productItemsResult = productItems.map((item: ProductItem) => {
    const card = productCards.find(({ sku }) => sku === item.sku);
    return toProductItems(
      { ...item, priceType: card?.price.type },
      config,
      imageBaseUrl,
    );
  });

  return productItemsResult;
}
