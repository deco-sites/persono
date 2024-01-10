import {
  BreadcrumbList,
  ListItem,
  Product,
  ProductListingPage,
} from "apps/commerce/types.ts";

import { AmmoProduct, Breadcrumb, VMDetails } from "$store/packs/types.ts";

interface toProductListingPageProps {
  vmDetails: VMDetails;
  url: URL;
}

export function toProduct(_ammaProduct: AmmoProduct): Product | null {
  //TODO: CONVERT API PRODUCT TO DECO INTERFACE
  return null;
}

export function toProductListingPage(
  { vmDetails, url }: toProductListingPageProps,
): ProductListingPage {
  return {
    "@type": "ProductListingPage",
    breadcrumb: toBreadcrumbList(url.origin, vmDetails),
    filters: [],
    products: [],
    pageInfo: {
      currentPage: 1,
      nextPage: "",
      previousPage: "",
    },
    sortOptions: [],
  };
}

const toBreadcrumbList = (
  origin: string,
  { breadcrumbs }: VMDetails,
): BreadcrumbList => {
  const itemListElement = toItemListElement(breadcrumbs, origin);
  return {
    "@type": "BreadcrumbList",
    itemListElement,
    numberOfItems: itemListElement.length,
  };
};

const toItemListElement = (
  breadcrumbs: Breadcrumb[] | [Breadcrumb[]],
  origin: string,
): ListItem[] =>
  breadcrumbs.flat(1).reduce<ListItem[]>(
    (acc, { path, name, position, hasSibling }) => {
      const item = path ? new URL(new URL(path).pathname, origin).href : "";
      const newItem: ListItem = {
        "@type": "ListItem" as const,
        name,
        item,
        position,
        additionalType: hasSibling ? "hasSibling" : undefined,
      };

      return [
        ...acc,
        newItem,
      ];
    },
    [],
  );
