import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";

/**
 * @title Ammo Varejo - Listagem de Produtos
 */
const loader = async (
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
): Promise<Product[] | null> => {
  await 0;
  return null;
};

export default loader;
