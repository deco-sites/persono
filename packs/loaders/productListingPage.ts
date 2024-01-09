import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
/* import { DECO_CACHE_OPTION } from "$store/packs/constants.ts"; */
import { VMDetails, VMExtraDetails } from "$store/packs/types.ts";
import { returnApiHeader } from "$store/packs/utils/utils.ts";
/* import { toProduct } from "$store/packs/utils/transform.ts"; */

export interface Props {
  /**
   * @title VM
   * @description Listar produtos presentes nesta VM. É possível usar filtros de categoria, tamanho, marca etc personalizados
   */
  vm?: VM;
}

interface VM {
  path: string;
  page: number;
  //TODO: FILTERS in deco
}

/**
 * @title Ammo Varejo - Página de Listagem de Produtos
 * @description Funciona em páginas de categoria em rotas do tipo /vm/$categoria.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage[] | null> => {
  const { publicUrl, ammoDeviceId, ammoToken } = ctx;
  const { vm } = props;
  const url = new URL(req.url);
  const path = paths(publicUrl);

  const headers = returnApiHeader({
    ammoDeviceIdValue: ammoDeviceId!,
    ammoTokenValue: ammoToken!,
  });

  const vmDetails = await fetchAPI<VMDetails>(
    path.productCatalog.resolveRoute({
      path: vm?.path ?? url.pathname!,
      page: vm?.page ?? Number(url.searchParams.get("page")) ?? 1,
    }),
    { method: "GET", headers },
  );

  const vmExtraDetails = await fetchAPI<VMExtraDetails>(
    path.productCatalog.resolveRoute({
      path: vm?.path ?? url.pathname!,
      page: vm?.page ?? Number(url.searchParams.get("page")) ?? 1,
    }),
    { method: "GET", headers },
  );

  /* return ammoProduct.map((p) => toProduct(p)); */
  console.log(vmDetails, vmExtraDetails);
  return null;
};

export default loader;
