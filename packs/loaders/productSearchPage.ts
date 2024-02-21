import { AppContext } from "$store/apps/site.ts";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import { getProductItems } from "../utils/getProductItems.ts";

export interface Props {
  /**
   * @title Termo
   * @description termo a ser pesquisado
   */
  query: string;
  /**
   * @title Página
   * @description Número da página a ser exibida
   */ page: number;
  /**
   * @title Limite
   * @description Número de itens por página
   */
  limit: number;
  /**
   * @title Forçar paginação
   * @description Aplica a paginação estatica na página
   */
  forcePagination?: boolean;
}

const paginateResult = (products: Product[], page: number, offset: number) => {
  const startIndex = (page - 1) * offset;
  const endIndex = startIndex + offset;
  const result = products.splice(startIndex, endIndex);
  return result;
};

const searchArgsOf = (props: Props, url: URL) => {
  const limit = props.limit ?? 12;
  const query = props.query || url.searchParams.get("query") || "";
  const page = props.page ??
    url.searchParams.get("page") ?? 0;
  const offset = page * limit;

  return {
    query,
    page,
    limit,
    offset,
  };
};

/**
 * @title Ammo Varejo - Página de busca
 * @description Resultado da busca.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage | null> => {
  const url = new URL(req.url);
  const { query, page, limit, offset } = searchArgsOf(props, url);
  const { forcePagination } = props;
  try {
    const products = await getProductItems(
      query,
      req,
      ctx,
      limit,
      offset,
    );

    const hasNextPage = (offset + limit) < products.length;
    const hasPreviousPage = offset > 0;
    const nextPage = new URLSearchParams(url.searchParams);
    const previousPage = new URLSearchParams(url.searchParams);
    let productPagination: Product[] = [];

    if (forcePagination) {
      productPagination = paginateResult(products, page, offset);
    }
    if (hasNextPage) {
      nextPage.set("page", (page + 1).toString());
    }

    if (hasPreviousPage) {
      previousPage.set("page", (page - 1).toString());
    }

    return {
      "@type": "ProductListingPage",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [],
        numberOfItems: 0,
      },
      filters: [],
      products: productPagination.length > 0
        ? productPagination
        : products ?? [],
      pageInfo: {
        nextPage: hasNextPage ? `?${nextPage.toString()}` : undefined,
        previousPage: hasPreviousPage
          ? `?${previousPage.toString()}`
          : undefined,
        currentPage: page,
      },
      sortOptions: [],
      seo: null,
    };
  } catch {
    return null;
  }
};

export default loader;
