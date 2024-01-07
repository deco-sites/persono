import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
/* import { DECO_CACHE_OPTION } from "$store/packs/constants.ts"; */
import { Recommendations, VMDetails } from "$store/packs/types.ts";
import { returnApiHeader } from "$store/packs/utils/utils.ts";
/* import { toProduct } from "$store/packs/utils/transform.ts"; */

export interface Props {
  /**
   * @title Listar produtos relacionados com a SKU presente na URL.
   * @default false
   */
  searchByUrlSku?: boolean;
  /**
   * @title SKU fixa
   * @description Listar produtos relacionados com esta SKU.
   */
  sku?: string;
  /**
   * @title Categoria
   * @description Listar produtos presentes nesta categoria. É possível usar filtros de categoria personalizados
   */
  category?: Category;
}

interface Category {
  path: string;
  page: number;
  //TODO: How the category filter works?
}

interface getProductDataProps {
  ctx: Omit<AppContext, "platform" | "theme" | "commerce">;
  loaderProps: Props;
}

/**
 * @title Ammo Varejo - Listagem de Produtos
 * @description Só é possível usar uma propriedade por vez.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Product[] | null> => {
  const { publicUrl, ammoDeviceId, ammoToken } = ctx;
  const { sku, category, searchByUrlSku } = props;
  const url = new URL(req.url);
  const path = paths(publicUrl);

  //How the PDP route will work? 
  const productSku = searchByUrlSku ? url.searchParams.get("sku") : sku;

  const headers = returnApiHeader({
    ammoDeviceIdValue: ammoDeviceId!,
    ammoTokenValue: ammoToken!,
  });

  //Deco Stale While Revalidate is returning HTTPError 400
  const ammoProduct = productSku
    ? await fetchAPI<Recommendations>(path.recommendation.sku(), {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          sku: productSku,
        }),
      }).then((p) => p.data.products)
    : await fetchAPI<VMDetails>(
        path.productCatalog.resolveRoute({
          path: category!.path,
          page: category!.page,
        }),
        { method: "GET", headers }
      ).then((p) => p.productCards);

  /* return ammoProduct.map((p) => toProduct(p)); */
  console.log(ammoProduct)
  return null
};

export default loader;
