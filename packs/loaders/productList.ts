import { AppContext } from "$store/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";
import { AmmoProduct } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProduct } from "$store/packs/utils/transform.ts";
import { typeChecker } from "$store/packs/utils/utils.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { getProductItems } from "$store/packs/utils/getProductItems.ts";

export type Props = { props: VMProps | RecommendationProps | TermProps };

interface VMProps {
  /**
   * @title Caminho da VM
   * @description Criar vitrines a partir de uma VM específica. Não usar "/vm/" no início do termo, apenas informar a slug
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
   * @description Criar vitrines de recomendação de produtos a partir de uma SKU específica. Caso queira buscar por recomendações dinâmicamente, escolha a opção "Get params from request parameters" e use o parâmetro "sku".
   * @default sku
   */
  sku: RequestURLParam;
}

interface TermProps {
  /**
   * @title Termo.
   * @description Criar vitrines a partir de um termo de busca.
   * @example fronha
   */
  query: string;
}

/**
 * @title Ammo Varejo - Vitrines
 * @description Vitrines multifuncionais que podem ser empregadas de diversas formas no site.
 */
const loader = async (
  extendedProps: Props,
  req: Request,
  ctx: AppContext,
): Promise<Product[] | null> => {
  const { ammoc, apiKey, config, imageBaseUrl } = ctx;
  const url = new URL(req.url);
  const headers = getHeaders(req, apiKey);
  const { props } = extendedProps;

  try {
    if (typeChecker<VMProps>(props as VMProps, "path")) {
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
      return productCards.map((p: AmmoProduct) =>
        toProduct(p, url, config, imageBaseUrl)
      );
    }

    if (
      typeChecker<RecommendationProps>(props as RecommendationProps, "sku")
    ) {
      const { sku } = props as RecommendationProps;
      const res = await ammoc["POST /api/recommendation"](
        {},
        {
          headers: headers,
          body: {
            sku,
          },
        },
      );

      const { data } = await res.json();
      return data.products.map((p: AmmoProduct) =>
        toProduct(p, url, config, imageBaseUrl)
      );
    }

    if (typeChecker<TermProps>(props as TermProps, "query")) {
      const { query } = props as TermProps;
      const productsPromise = getProductItems(query, req, ctx);
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
