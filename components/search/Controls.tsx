import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/islands/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { FilterEditableProps } from "deco-sites/persono/components/search/Filters.tsx";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions"
  >
  & {
    displayFilter?: boolean;
    productsQtt?: number;
    colors: Color[];
    notDisplay?: boolean;
    sizes?: Size[];
    filterSettings?: FilterEditableProps;
  };

function SearchControls({
  filters,
  breadcrumb,
  displayFilter,
  sortOptions,
  productsQtt,
  colors,
  notDisplay,
  sizes,
  filterSettings,
}: Props) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      class="drawer-end"
      open={open.value}
      onClose={() => (open.value = false)}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-full sm:w-[35rem]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-xl leading-6">Filtrar</span>
              </h1>
              <Button
                class="btn-ghost mr-5"
                onClick={() => (open.value = false)}
                id="text"
                aria-label="Name"

              >
                <Icon id="XMark" size={20} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters
                filterSettings={filterSettings}
                sizes={sizes}
                colors={colors}
                filters={filters}
              />
            </div>
          </div>
        </>
      }
    >
      <div
        class={`flex flex-col justify-between ${
          notDisplay ? "" : "py-4"
        }  sm:mb-0 sm:p-0 gap-6 sm:gap-4 sm:flex-row sm:border-b sm:border-base-300`}
      >
        <div
          class={`flex flex-row items-end sm:pb-4 ${
            notDisplay ? "hidden" : ""
          }`}
        >
          <Breadcrumb
            productsQtt={productsQtt}
            itemListElement={breadcrumb?.itemListElement.slice(0, 3)}
          />
        </div>

        <div
          class={`flex flex-row items-end justify-between border-b border-base-300 sm:gap-8 pb-4 sm:border-none ${
            notDisplay ? "hidden" : ""
          }`}
        >
          <button
            class={`px-0 sm:text-sm text-md font-bold ${
              displayFilter ? "flex gap-2" : "sm:hidden"
            }`}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
