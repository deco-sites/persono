import { AppContext } from "$store/apps/site.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
/* import { VMDetails, VMDetailsRedirect } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";
import { typeChecher } from "$store/packs/utils/utils.ts";
import type { VMConfig } from "$store/packs/utils/transform.ts"; */
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";

export type Props = { props: VMProps | RecommendationsProps | TermProps };

interface VMProps {
  /**
   * @title Caminho da VM
   * @description Não usar com "/vm/", apenas informar a slug da vm.
   * @example cama
   */
  path: string;
  /**
   * @title Ordernar por
   */
  sort: "recomendations" | "discount_desc" | "price_asc";
  /**
   * @title Quantiddae de produtos
   * @description Quantidade máxima de produtos retornados
   */
  take: number;
}

interface RecommendationsProps {
  /**
   * @title SKU
   * @description Caso queira buscar por recomendações dinâmicamente escolha a opção "Get params from request parameters".
   * @default sku
   */
  sku: RequestURLParam;
}

interface TermProps {
  /**
   * @title Termo
   * @description Termo para busca.
   */
  query: string;
  /**
   * @title Quantiddae de produtos
   * @description Quantidade máxima de produtos retornados
   */
  limit: number;
}

/**
 * @title Ammo Varejo - Vitrines
 * @description Vitrines multifuncionais que podem ser empregadas de diversas formas no site
 */
const loader = async (
  _props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<ProductListingPage | null> => {
  await 0;
/*   const { ammoc, apiKey } = ctx;
  const url = new URL(req.url);
  const headers = getHeaders(req, apiKey); */



  return null;
};

/* const formatBaseVmPath = (str: string) => {
  str = str.startsWith("/vm") ? str : "/vm/" + str;
  str = str.endsWith("/") ? str.slice(0, -1) : str;
  return str;
}; */

export default loader;
