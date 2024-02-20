import { AppContext } from "$store/apps/site.ts";
import { VMFilters } from "$store/packs/types.ts";

export interface Props {
  /**
   * @title Filtros
   */
  filters?: VMFilters[];
}

interface UrlProps {
  path: string[];
  searchParams: string[];
}

interface LoaderResult {
  url: string;
  base: string;
}

/**
 * @title Ammo Varejo - Retorno de URL de Filtros
 * @description Invoque esse loader para retornar a URL de filtros
 */
const loader = (
  props: Props,
  req: Request,
  _ctx: AppContext,
): LoaderResult | null => {
  const { filters } = props;
  const url = new URL(req.url);
  const vm = url.pathname.match("\/vm\/([^\/]+)")![1];

  if (!vm) {
    return null;
  }

  const vmProps = filters?.reduce<UrlProps>((acc, f) => {
    return {
      path: [...acc.path, f?.slugs[0]],
      searchParams: [
        ...acc.searchParams,
        ...f?.slugs?.slice(1)?.map((s) => s),
      ],
    };
  }, {
    path: ["vm", vm],
    searchParams: [],
  });

  const newUrl = new URL(vmProps!.path.join("/"), url.origin);

  if (vmProps?.searchParams.length) {
    newUrl.searchParams.set("f", vmProps!.searchParams.join("_"));
  }

  return {
    url: newUrl.href,
    base: url.href,
  };
};

export default loader;
