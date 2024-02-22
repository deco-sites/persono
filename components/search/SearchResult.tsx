import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Resolved, type SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type {
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Layout as CardLayout } from "deco-sites/persono/components/product/ProductCard/index.tsx";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import { VMFilters } from "deco-sites/persono/packs/types.ts";

import {
  type EditableProps as NotFoundEditableProps,
  NotFound,
} from "deco-sites/persono/components/product/NotFound.tsx";
import { Device } from "deco/utils/device.ts";
import ActiveFilterTag from "deco-sites/persono/islands/ActiveFIlterTag.tsx";

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
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  VMFilters: Resolved<VMFilters>;
  notFoundSettings?: NotFoundEditableProps;
}

function Result({
  page,
  layout,
  colors,
  notFoundSettings,
  device,
  queryTerm,
}: Omit<Props, "page"> & { page: ProductListingPage } & {
  queryTerm: string | null;
  device: Device;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const pageRegex = /page=(\d+)/;

  if (!pageInfo.records) {
    return (
      <NotFound
        notFoundSettings={notFoundSettings}
        device={device}
        queryTerm={queryTerm}
      />
    );
  }

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage;
  const offset = zeroIndexedOffsetPage * perPage;

  let tabsQtt = Math.floor(pageInfo.records / perPage);

  if (pageInfo.records % perPage !== 0) {
    tabsQtt = tabsQtt + 1;
  }

  const appliedFilters: { filters: FilterToggleValue; type: string }[] = [];

  filters.map((f) => {
    (f.values as FilterToggleValue[]).map((v) => {
      if (v.selected == true) {
        appliedFilters.push({ filters: v, type: f.key });
      }
    }) as unknown as FilterToggleValue[];
  });

  return (
    <>
      <div class="sm:px-20 px-4">
        <SearchControls
          colors={colors}
          productsQtt={products.length}
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />
        <ActiveFilterTag appliedFilters={appliedFilters} />

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters colors={colors} filters={filters} />
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
              class="flex items-center hover:text-red-500 justify-center w-8 h-8 border rounded-full text-primary"
            >
              <Icon id="ChevronLeft" size={16} strokeWidth={2} />
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
                    pageInfo.currentPage === 1
                      ? "bg-primary text-base-100 rounded-full"
                      : "text-primary"
                  }`}
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
                      className={`flex justify-center items-center w-8 h-8 font-bold ${
                        pageInfo.currentPage === index
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
              class="flex items-center justify-center w-8 h-8 border rounded-full text-primary"
            >
              <Icon id="ChevronRight" size={18} strokeWidth={2} />
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
