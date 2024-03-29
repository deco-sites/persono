import { AppContext } from "$store/apps/site.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { VMDetails, VMDetailsRedirect, VMFilters } from "$store/packs/types.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";
import { typeChecker } from "$store/packs/utils/utils.ts";

export interface Props {
  /**
   * @title VM
   * @description Listar produtos presentes nesta VM. É possível usar filtros de categoria, tamanho, marca etc personalizados
   */
  vm?: VM;
}

interface VM {
  /**
   * @title Caminho da VM
   * @description Sempre começar com "/vm/".
   * @example /vm/cama
   */
  path?: string;
  /**
   * @title Filtros
   * @description Filtros da VM
   */
  filters?: VMFilters[];
  /**
   * @title Ordernar por
   */
  sort?: "recomendations" | "discount_desc" | "price_asc";
  /**
   * @title Quantidade de produtos
   * @description Quantidade máxima de produtos retornados
   */
  take?: number;
}

interface VmProps {
  path: string[];
  searchParams: string[];
  sort?: string;
}

/**
 * @title Ammo Varejo - Página de Listagem de Produtos
 * @description Funciona em páginas de categoria em rotas do tipo /vm/$categoria.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage | null> => {
  const { ammoc, config, imageBaseUrl } = ctx;
  const { vm } = props;
  const url = new URL(req.url);
  const headers = getHeaders(req, ctx);
  const page = Number(url.searchParams.get("page") ?? 1);
  const vmConfig = {
    ...config,
    vmItemsPerPage: vm?.take ?? config.vmItemsPerPage,
  };

  const vmProps = vm?.path
    ? vm!.filters?.reduce<VmProps>((acc, f) => {
      return {
        path: [...acc.path, f?.slugs[0]],
        searchParams: [
          ...acc.searchParams,
          ...f?.slugs?.slice(1)?.map((s) => s),
        ],
        sort: acc.sort,
      };
    }, {
      path: [formatBaseVmPath(vm!.path)],
      searchParams: [],
      sort: vm.sort === "recomendations" ? undefined : vm.sort,
    })
    : {
      path: [formatBaseVmPath(url.pathname)],
      searchParams: [url.searchParams.get("f")],
      sort: url.searchParams.get("sort") ?? undefined,
    };

  try {
    const response = await ammoc
      ["GET /api/product-catalog/resolve-route"](
        {
          path: vmProps!.path.join("/"),
          f: vmProps?.searchParams.join("_") ?? undefined,
          page,
          sort: vmProps?.sort,
          take: vm?.take ?? config.vmItemsPerPage,
        },
        {
          headers: headers,
        },
      ) as Response;
    const data = await response.json();

    if (typeChecker<VMDetails>(data as VMDetails, "basePath")) {
      return toProductListingPage({
        vmDetails: data as VMDetails,
        url,
        vmConfig,
        imageBaseUrl,
      });
    }

    const redirectPath = data as VMDetailsRedirect;
    const redirectedResponse = await ammoc
      ["GET /api/product-catalog/resolve-route"](
        {
          path: redirectPath.location,
          page,
          take: vm?.take ?? config.vmItemsPerPage,
        },
        {
          headers: headers,
        },
      ) as Response;

    return toProductListingPage({
      vmDetails: await redirectedResponse.json() as VMDetails,
      url,
      vmConfig,
      imageBaseUrl,
    });
  } catch (error) {
    console.error(error);

    return null;
  }
};

const formatBaseVmPath = (str: string) => {
  str = str.startsWith("/") ? str : "/" + str;
  str = str.endsWith("/") ? str.slice(0, -1) : str;
  return str;
};

export default loader;
