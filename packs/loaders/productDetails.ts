import { AppContext } from "$store/apps/site.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { AmmoProduct } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProductDetailsPage } from "$store/packs/utils/transform.ts";
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
  const { ammoc, apiKey, config } = ctx;
  const { sku } = props;
  const url = new URL(req.url);
  const headers = getHeaders(req, apiKey);

  try {
    const response = await ammoc
      ["GET /api/product/sku/:sku"](
        { sku },
        {
          headers: headers,
        },
      );

    const { data } = await response.json();

    return toProductDetailsPage({
      ammoProduct: data as AmmoProduct,
      url,
      pdpConfig: config,
    });
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default loader;
