//THIS LOADER ONLY TESTS THE toProduct FUNCTION. DO NOT USE IN PROD

import { AppContext } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { ProductDetails } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import type { VMConfig } from "$store/packs/utils/transform.ts";

/**
 * @title Ammo Varejo - Teste de conversão de interfaces
 * @description Não usar em produção
 */
const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Product> => {
  const { publicUrl, apiKey } = ctx;
  const url = new URL(req.url);
  const path = paths(publicUrl);
  const headers = getHeaders(req, apiKey);

  const installmentConfig = await ctx
    .invoke["deco-sites/persono"].loaders.config({
      fields: ["maxInstallments", "minInstallmentValue", "vmItemsPerPage"],
    }).then((c: VMConfig) => c);

  const result = await fetchAPI<ProductDetails>(
    path.product.sku("PLKNP.CONT21BC"),
    { method: "GET", headers },
  );

  return toProduct(result.data, url, installmentConfig);
};

export default loader;
