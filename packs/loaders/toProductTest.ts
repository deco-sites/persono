//THIS LOADER ONLY TESTS THE toProduct FUNCTION. DO NOT USE IN PROD

import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { ProductDetails } from "$store/packs/types.ts";
import { returnApiHeader } from "$store/packs/utils/utils.ts";
import { toProduct } from "$store/packs/utils/transform.ts";

/**
 * @title Ammo Varejo - Teste de conversão de interfaces
 * @description Não usar em produção
 */
const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Product> => {
  const { publicUrl, ammoDeviceId, ammoToken } = ctx;
  const url = new URL(req.url);
  const path = paths(publicUrl);

  const headers = returnApiHeader({
    ammoDeviceIdValue: ammoDeviceId!,
    ammoTokenValue: ammoToken!,
  });

  const result = await fetchAPI<ProductDetails>(
    path.product.sku("PLKNP.CONT21BC"),
    { method: "GET", headers },
  );

  return toProduct(result.data, url);
};

export default loader;
