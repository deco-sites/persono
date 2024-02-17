import { SendEventOnView } from "$store/components/Analytics.tsx";
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
import { Logo } from "deco-sites/persono/components/ui/Logo.tsx";
import { Layout as CardLayout } from "deco-sites/persono/components/product/ProductCard/index.tsx";

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
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = products.length;
  const productBannerCategory = products
    .map((p) => p.category)[0]
    ?.split(">")[0];
  if (!pageInfo.records) {
    return <NotFound />;
  }
  let tabsQtt = Math.floor(pageInfo.records / perPage);

  if (pageInfo.records % perPage !== 0) {
    tabsQtt = tabsQtt + 1;
  }

  const id = useId();

  const offset = pageInfo.currentPage * perPage;

  const appliedFilters: FilterToggleValue[] = [];

  filters.map((f) => {
    (f.values as FilterToggleValue[]).map((v) => {
      if (v.selected == true) {
        appliedFilters.push(v);
      }
    }) as unknown as FilterToggleValue[];
  });

  return (
    <>
      <div class="h-48 w-full bg-base-300 flex items-center justify-between overflow-hidden mb-14">
        <h2 class="pl-20 text-[3.5rem] text-black">{productBannerCategory}</h2>
        <div class="pr-14 w-96">
          <Logo onlySymbol />
        </div>
      </div>
      <div class="px-20">
        <SearchControls
          productsQtt={products.length}
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />
        <div class="flex text-sm gap-3 mt-4 mb-9">
          {appliedFilters.map((af) => (
            <span
              style={{ minWidth: "86px" }}
              class="py-1 gap-3 bg-black opacity-80 rounded-full px-3 flex justify-between items-center text-white"
            >
              {af.label}
              <a href={af.url} rel="nofollow">
                <Icon id="XMark" size={16} strokeWidth={2}></Icon>
              </a>
            </span>
          ))}
        </div>

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
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

        <div class="flex justify-center my-4">
          <div class="join text-sm flex items-center gap-1">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="flex items-center hover:text-red-500 justify-center w-8 h-8 border rounded-full text-primary"
            >
              <Icon id="ChevronLeft" size={16} strokeWidth={2} />
            </a>
            {Array.from({ length: tabsQtt }, (_, index) => (
              <a
                aria-label={`${index} page link`}
                rel={`${index + 1}`}
                href={`?page=${index + 1}`}
                class={`flex justify-center items-center w-8 h-8 font-bold ${
                  pageInfo.currentPage == index
                    ? "bg-primary text-base-100 rounded-full"
                    : "text-primary"
                }`}
              >
                {index + 1}
              </a>
            ))}
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

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
