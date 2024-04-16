import { SendEventOnView } from "$store/components/Analytics.tsx";
import { type SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import Filters, {
  FilterEditableProps,
} from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type {
  Filter,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Layout as CardLayout } from "deco-sites/persono/components/product/ProductCard/index.tsx";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";

import {
  type EditableProps as NotFoundEditableProps,
  NotFound,
} from "deco-sites/persono/components/product/NotFound.tsx";

import ActiveFilterTag from "deco-sites/persono/islands/ActiveFIlterTag.tsx";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;

  cardLayout?: CardLayout;
}

export interface Props {
  colors: Color[];
  sizes: Size[];
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  notFoundSettings?: NotFoundEditableProps;
  filterSettings?: FilterEditableProps;
}

function Result({
  page,
  layout,
  colors,
  queryTerm,
  sizes,
  filterSettings,
}: Omit<Props, "page"> & { page: ProductListingPage } & {
  queryTerm: string | null;
  device: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const pageRegex = /page=(\d+)/;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const totalProductsQtt = pageInfo.records ?? products.length;

  const tabsQtt = Math.ceil(totalProductsQtt / perPage);

  const appliedFilters: { filters: FilterToggleValue; type: string }[] = [];

  filters.map((f) => {
    (f.values as FilterToggleValue[]).map((v) => {
      if (v.selected == true) {
        appliedFilters.push({ filters: v, type: f.key });
      }
    }) as unknown as FilterToggleValue[];
  });

  const sortedFilters = filters.sort((a, b) => {
    const aEndsWithSize = a.key.toLowerCase().endsWith("size");
    const bEndsWithSize = b.key.toLowerCase().endsWith("size");
    const aEndsWithColor = a.key.toLowerCase().endsWith("color");
    const bEndsWithColor = b.key.toLowerCase().endsWith("color");

    if (aEndsWithColor && !bEndsWithColor) {
      return 1;
    } else if (aEndsWithSize && !bEndsWithSize) {
      return 1;
    } else if (!aEndsWithColor && bEndsWithColor) {
      return -1;
    } else if (!aEndsWithSize && bEndsWithSize) {
      return -1;
    }

    return 0;
  });

  const sortedFiltersSizeOrderly = sortedFilters.map((filter) => {
    if (filter["@type"] == "FilterToggle") {
      const filtersOrdered = filter.values.sort((a, b) => {
        if (!sizes) {
          return 0;
        }

        const findIndexByName = (label: string) =>
          sizes.findIndex((size) =>
            size.name.toLowerCase() === label.toLowerCase()
          );

        const indexA = findIndexByName(a.label);
        const indexB = findIndexByName(b.label);

        if (indexA === -1 && indexB !== -1) {
          return 1;
        } else if (indexB === -1 && indexA !== -1) {
          return -1;
        }

        return indexA - indexB;
      });

      return { ...filter, values: filtersOrdered };
    } else {
      return filter as Filter;
    }
  });

  return (
    <>
      <div class="container px-4 sm:px-0">
        {filters.length == 0
          ? (
            <p
              class={`py-4 text-sm flex items-center gap-2`}
            >
              Resultados de pesquisa para "{queryTerm}"{" "}
              <span class="text-gray-600">({products.length} produtos)</span>
            </p>
          )
          : null}

        <SearchControls
          sizes={sizes}
          colors={colors}
          productsQtt={pageInfo.records}
          sortOptions={sortOptions}
          filters={filters}
          filterSettings={filterSettings}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
          notDisplay={filters.length == 0 &&
            breadcrumb?.itemListElement.length == 0}
        />
        <ActiveFilterTag
          appliedFilters={appliedFilters}
          basePath={breadcrumb?.url}
        />

        <div class="flex flex-row sm:mt-6">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters
                filterSettings={filterSettings}
                sizes={sizes}
                colors={colors}
                filters={sortedFiltersSizeOrderly}
                basePath={breadcrumb?.url}
              />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              cardLayout={layout?.cardLayout}
              products={products}
              offset={offset}
              layout={{ columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center mb-6 mt-12">
          <div class="join text-sm flex items-center gap-1">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class={`flex items-center justify-center w-8 h-8 border rounded-full ${
                pageInfo.previousPage?.length == undefined ||
                  pageInfo.previousPage?.length == 0
                  ? "text-gray-600 opacity-60 bg-white border z-10 sm:flex rounded-full cursor-default pointer-events-none"
                  : "text-primary"
              }`}
              disabled={pageInfo.nextPage?.length == 0 ||
                pageInfo.previousPage?.length == undefined}
            >
              <Icon id="ChevronLeft" size={17} strokeWidth={3} />
            </a>
            <div class="sm:hidden flex items-center gap-1">
              {pageInfo.currentPage < 3 ? null : (
                <a
                  aria-label={`1 page link`}
                  rel={`1`}
                  href={pageInfo.nextPage
                    ? pageInfo.nextPage.replace(pageRegex, `page=1`)
                    : pageInfo.previousPage
                    ? pageInfo.previousPage.replace(pageRegex, `page=1`)
                    : ""}
                  className={`flex justify-center items-center w-8 h-8 font-bold ${
                    pageInfo.previousPage?.length == 0 ||
                      pageInfo.previousPage?.length == undefined
                      ? "bg-primary text-base-100 rounded-full "
                      : "text-primary"
                  }`}
                  disabled={pageInfo.previousPage?.length == 0 ||
                    pageInfo.previousPage?.length == undefined}
                >
                  {1}
                </a>
              )}
              {Array.from({ length: tabsQtt }, (_, index) => {
                const pageNumber = index + 1;

                const inicio = Math.max(1, pageInfo.currentPage - 1);
                const fim = Math.min(inicio + 4, tabsQtt);

                const shouldDisplay = pageNumber >= inicio && pageNumber <= fim;

                return shouldDisplay
                  ? (
                    <a
                      aria-label={`${index} page link`}
                      rel={`${pageNumber}`}
                      href={pageInfo.nextPage
                        ? pageInfo.nextPage.replace(
                          pageRegex,
                          `page=${pageNumber}`,
                        )
                        : pageInfo.previousPage
                        ? pageInfo.previousPage.replace(
                          pageRegex,
                          `page=${pageNumber}`,
                        )
                        : ""}
                      class={`flex justify-center items-center w-8 h-8 font-bold ${
                        pageInfo.currentPage == index
                          ? "bg-primary text-base-100 rounded-full"
                          : "text-primary"
                      }`}
                    >
                      {pageNumber}
                    </a>
                  )
                  : null;
              })}
            </div>

            <div class="hidden sm:flex">
              {Array.from({ length: tabsQtt }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <a
                    aria-label={`${index} page link`}
                    rel={`${pageNumber}`}
                    href={pageInfo.nextPage
                      ? pageInfo.nextPage.replace(
                        pageRegex,
                        `page=${pageNumber}`,
                      )
                      : pageInfo.previousPage
                      ? pageInfo.previousPage.replace(
                        pageRegex,
                        `page=${pageNumber}`,
                      )
                      : ""}
                    class={`flex justify-center items-center w-8 h-8 font-bold ${
                      pageInfo.currentPage == index
                        ? "bg-primary text-base-100 rounded-full"
                        : "text-primary"
                    }`}
                  >
                    {pageNumber}
                  </a>
                );
              })}
            </div>

            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class={`flex items-center justify-center w-8 h-8 border rounded-full ${
                pageInfo.nextPage?.length == undefined ||
                  pageInfo.nextPage?.length == 0
                  ? "text-gray-600 opacity-60 bg-white border z-10 sm:flex rounded-full cursor-default pointer-events-none"
                  : "text-primary "
              }`}
              disabled={pageInfo.nextPage?.length == 0 ||
                pageInfo.nextPage?.length == undefined}
            >
              <Icon id="ChevronRight" size={17} strokeWidth={3} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  const { device, queryTerm, notFoundSettings } = props;

  const notHasProducts = !page?.products?.length;

  if (!page || notHasProducts) {
    return (
      <NotFound
        notFoundSettings={notFoundSettings}
        device={device}
        queryTerm={queryTerm}
      />
    );
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const { page } = props;
  const url = new URL(req.url);
  const queryTerm = url.searchParams.get("query");

  if (!page) {
    ctx.response.status = 404;
  }

  return {
    queryTerm,
    device: ctx.device,
    ...props,
  };
};

export default SearchResult;
