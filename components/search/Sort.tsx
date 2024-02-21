import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    if (IS_BROWSER) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
    }
    return "";
  }, []);

// TODO: Replace with "search utils"
const applySort = ({ value }: { value: string }) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

export type SortProps = Pick<ProductListingPage, "sortOptions"> & {
  sort: string;
};

// TODO: move this to the loader
const portugueseMappings: Record<string, string> = {
  relevance_desc: "Relevância",
  price_desc: "Maior Preço",
  price_asc: "Menor Preço",
  orders_desc: "Mais vendidos",
  name_desc: "Nome - de Z a A",
  name_asc: "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  discount_desc: "Maior desconto",
};

function mapSortToPortuguese(sort: string): string {
  return portugueseMappings[sort] || "Ordenar";
}

function SortComponent({ sortOptions, sort }: SortProps) {
  const label = mapSortToPortuguese(sort);
  const selectedItem = useSignal(label);

  return (
    <details class="dropdown">
      <summary class="flex items-center justify-between btn shadow-none bg-transparent border-none hover:bg-transparent">
        {selectedItem ?? "Ordenar"}{" "}
        <Icon id="ChevronDown" width={22} height={22} strokeWidth={1} />
      </summary>
      <ul
        class="absolute flex flex-col z-10 mt-1 right-0 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabIndex={-1}
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant={`listbox-option-${sortOptions[0].value}`}
      >
        {sortOptions
          .map(({ value, label }) => ({
            value,
            label:
              portugueseMappings[label as keyof typeof portugueseMappings] ??
                label,
          }))
          .filter(({ label }) => label)
          .map(({ value, label }) => {
            return (
              <button
                key={value}
                class="hover:bg-base-200 text-start py-2 px-4 "
                id={`listbox-option-${value}`}
                value={value}
                selected={value === sort}
                role="option"
                onClick={() => {
                  selectedItem.value = label;
                  applySort({ value });
                }}
              >
                {label}
              </button>
            );
          })}
      </ul>
    </details>
  );
}

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  return <SortComponent sortOptions={sortOptions} sort={sort} />;
}

export default Sort;
