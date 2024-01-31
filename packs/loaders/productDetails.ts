import { AppContext } from "$store/apps/site.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { ProductDetails } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProductDetailsPage } from "$store/packs/utils/transform.ts";
import type { PDPConfig } from "$store/packs/utils/transform.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";

export interface Props {
  sku: RequestURLParam;
}

/**
 * @title Ammo Varejo - Detalhes do Produto
 * @description Funciona em rotas do tipo /pr/:slug/:sku
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductDetailsPage | null> => {
  const { publicUrl, apiKey } = ctx;
  const { sku } = props;
  const url = new URL(req.url);
  const path = paths(publicUrl);
  const headers = getHeaders(req, apiKey);

  const ammoProduct = await fetchAPI<ProductDetails>(
    path.product.sku(sku),
    {
      method: "GET",
      headers,
    },
  ).then((r) => r.data)
    .catch(() => undefined);

  if (!ammoProduct) {
    return null;
  }

  const pdpConfig = await ctx
    .invoke["deco-sites/persono"].loaders.config({
      fields: ["maxInstallments", "minInstallmentValue"],
    }).then((c: PDPConfig) => c);

  return toProductDetailsPage({ ammoProduct, url, pdpConfig });
};

export default loader;
