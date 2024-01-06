import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
/* import { DecoRequestInit, fetchAPI } from "apps/utils/fetch.ts";
import { DECO_CACHE_OPTION } from "$store/packs/constants.ts"; */

export interface Props {
  /**
   * @title SKU
   * @description Listar produtos relacionados com esta SKU.
   */
  sku?: string;
  /**
   * @title Categoria
   * @description Listar produtos presentes nesta categoria. É possível usar filtros de categoria personalizados
   */
  category: Category;
}

interface Category {
  path: string;
  //TODO: How the category filter works?
}

/**
 * @title Ammo Varejo - Listagem de Produtos
 * @description Só é possível usar uma propriedade por vez
 */
const loader = async (
  _props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Product[] | null> => {
  const { publicUrl } = ctx;
  const path = paths(publicUrl!);
  console.log(path.productCatalog.resolveRoute({ path: "/vm/banho", page: 1 }));
  await 0;
  return null;
};

export default loader;
