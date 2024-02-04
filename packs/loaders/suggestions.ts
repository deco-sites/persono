import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import type {  Suggestion } from "apps/commerce/types.ts";
import { AutoComplete } from "$store/packs/types.ts";
import { getSuggestionsItems } from "$store/packs/utils/getSuggestionsItems.ts";

export interface Props {
  query: string;
}
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Suggestion | null> => {
  const { ammoc, apiKey } = ctx;

  const headers = getHeaders(req, apiKey);
  const { query } = props;

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

    const productsPromise = getSuggestionsItems(firstTerm, req, ctx);

    const [products] = await Promise.all([productsPromise]);

    return {
      searches: searchTerms,
      products,
    };
  } catch {
    return null;
  }
};

export default loader;
