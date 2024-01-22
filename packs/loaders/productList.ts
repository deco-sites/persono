//LOADER DEPRECATED - CLIENT WILL USE LINX TO LIST PRODUCTS IN linx

import type { Props as AppContext } from "deco-sites/persono/apps/site.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  /**
   * @title Listar produtos relacionados com a SKU presente na URL.
   * @default false
   */
  searchByUrlSku?: boolean;
  /**
   * @title SKU fixa
   * @description Listar produtos relacionados com esta SKU.
   */
  sku?: string;
  /**
   * @title Categoria
   * @description Listar produtos presentes nesta categoria. É possível usar filtros de categoria personalizados
   */
  category?: Category;
}

interface Category {
  path: string;
  page: number;
  //TODO: How the category filter works?
}

/**
 * @title Ammo Varejo - Listagem de Produtos
 * @description Só é possível usar uma propriedade por vez.
 */
const loader = async (
  _props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<Product[] | null> => {
  await 0;
  return null;
};

export default loader;
