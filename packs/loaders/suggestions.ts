import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import type { Suggestion } from "apps/commerce/types.ts";
import { AutoComplete } from "$store/packs/types.ts";
import { getProductItems } from "../utils/getProductItems.ts";

export interface Props {
  /**
   * @title query
   * @description termo a ser pesquisado
   */
  query: string;
  /**
   * @title count
   * @description Quantidade de itens a ser retornada
   */
  count: number;
}

/**
 * @title Ammo Varejo - Sugestão de busca
 * @description Obtém as sugestões de busca a partir do termo pesquisado.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Suggestion | null> => {
  const { ammoc, apiKey } = ctx;

  const headers = getHeaders(req, apiKey);
  const { query, count } = props;

  try {
    const response = await ammoc
      ["GET /api/search/autocomplete"](
        { query },
        {
          headers: headers,
        },
      );

    const { data }: AutoComplete = await response.json();

    if (data.length === 0) {
      return { searches: [], products: [] };
    }

    const searchTerms = data.map((s) => ({ term: s.term }));
    const firstTerm = data[0].term;

    const products = await getProductItems(firstTerm, req, ctx, count, 0);
    return {
      searches: searchTerms,
      products: products.slice(0, count),
    };
  } catch {
    return null;
  }
};

export default loader;
