import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";

/**
 * @title Ammo Varejo - Listagem de Produtos
 */
const loader = async (
  _props: unknown,
  _req: Request,
  ctx: AppContext
): Promise<Product[] | null> => {
  const { publicUrl } = ctx;
  const path = paths(publicUrl!);
  console.log(path.productCatalog.resolveRoute({ path: "/vm/banho", page: 1 }));
  await 0;
  return null;
};

export default loader;
