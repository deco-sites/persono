import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import paths from "$store/packs/utils/paths.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { VMDetails, VMDetailsRedirect } from "$store/packs/types.ts";
import { returnApiHeader } from "$store/packs/utils/utils.ts";
import { toProductListingPage } from "$store/packs/utils/transform.ts";
import { typeChecher } from "$store/packs/utils/utils.ts";

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
  path: string;
  /**
   * @title Filtros
   * @description Filtros da VM
   */
  filters?: Filters[];
}

interface Filters {
  /**
   * @title Tipo
   * @example category
   */
  type: string;
  /**
   * @title Slugs do filtro
   */
  slugs: string[];
}

interface VmProps {
  path: string[];
  searchParams: string[];
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
  const { publicUrl, ammoDeviceId, ammoToken, installmentConfig } = ctx;
  const { vm } = props;
  const url = new URL(req.url);
  const path = paths(publicUrl);
  const headers = returnApiHeader({
    ammoDeviceIdValue: ammoDeviceId!,
    ammoTokenValue: ammoToken!,
  });

  const vmProps = vm?.path
    ? vm!.filters?.reduce<VmProps>((acc, f) => {
      return {
        path: [...acc.path, f?.slugs[0]],
        searchParams: [
          ...acc.searchParams,
          ...f?.slugs?.slice(1)?.map((s) => s),
        ],
      };
    }, { path: [formatBaseVmPath(vm?.path ?? url.pathname)], searchParams: [] })
    : {
      path: [formatBaseVmPath(url.pathname)],
      searchParams: [url.searchParams.get("f")],
    };

  const response = await fetchAPI<VMDetails | VMDetailsRedirect>(
    path.productCatalog.resolveRoute({
      path: vmProps!.path.join("/"),
      page: Number(url.searchParams.get("page")) ?? 1,
      f: vmProps?.searchParams.join("_") ?? undefined,
    }),
    {
      method: "GET",
      headers,
    },
  ).then((vm) => vm)
    .catch(() => null);

  if (!response) return null;

  if (typeChecher<VMDetails>(response as VMDetails, "basePath")) {
    return toProductListingPage({
      vmDetails: response as VMDetails,
      url,
      installmentConfig,
    });
  }

  const redirectPath = response as VMDetailsRedirect;
  const redirectedResponse = await fetchAPI<VMDetails>(
    path.productCatalog.resolveRoute({
      path: redirectPath.location,
      page: Number(url.searchParams.get("page")) ?? 1,
    }),
    {
      method: "GET",
      headers,
    },
  ).then((vm) => vm);

  return toProductListingPage({
    vmDetails: redirectedResponse,
    url,
    installmentConfig,
  });
};

const formatBaseVmPath = (str: string) => {
  str = str.startsWith("/") ? str : "/" + str;
  str = str.endsWith("/") ? str.slice(0, -1) : str;
  return str;
};

export default loader;
