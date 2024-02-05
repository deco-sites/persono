import { AppContext } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import { AmmoProduct } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import { typeChecher } from "$store/packs/utils/utils.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { getSuggestionsItems } from "$store/packs/utils/getSuggestionsItems.ts";

export type Props = { props: VMProps | RecommendationProps | TermProps };

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
   * @title Quantidade de produtos
   * @description Quantidade máxima de produtos retornados
   */
  take: number;
}

interface RecommendationProps {
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
}

/**
 * @title Ammo Varejo - Vitrines
 * @description Vitrines multifuncionais que podem ser empregadas de diversas formas no site
 */
const loader = async (
  extendedProps: Props,
  req: Request,
  ctx: AppContext,
): Promise<Product[] | null> => {
  const { ammoc, apiKey, config } = ctx;
  const url = new URL(req.url);
  const headers = getHeaders(req, apiKey);
  const { props } = extendedProps;

  try {
    if (typeChecher<VMProps>(props as VMProps, "path")) {
      const { path, sort, take } = props as VMProps;
      const res = await ammoc
        ["GET /api/product-catalog/resolve-route"](
          {
            path: formatBaseVmPath(path),
            sort,
            page: 1,
            take,
          },
          {
            headers: headers,
          },
        ) as Response;
      const { productCards } = await res.json();
      return productCards.map((p: AmmoProduct) => toProduct(p, url, config));
    }

    if (
      typeChecher<RecommendationProps>(props as RecommendationProps, "sku")
    ) {
      const { sku } = props as RecommendationProps;
      const params = new URLSearchParams();
      params.set("sku", sku);
      const res = await ammoc["POST /api/recommendation"](
        {},
        {
          body: params,
        },
        {
          headers: headers,
        },
      );

      const { data } = await res.json();
      return data.products.map((p: AmmoProduct) => toProduct(p, url, config));
    }

    if (typeChecher<TermProps>(props as TermProps, "query")) {
      const { query } = props as TermProps;
      const productsPromise = getSuggestionsItems(query, req, ctx);
      const [products] = await Promise.all([productsPromise]);
      return products;
    }

    return null;
  } catch (e) {
    console.error(e);

    return null;
  }
};

const formatBaseVmPath = (str: string) => {
  str = str.startsWith("/vm") ? str : "/vm/" + str;
  str = str.endsWith("/") ? str.slice(0, -1) : str;
  return str;
};

export default loader;
