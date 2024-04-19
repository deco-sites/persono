import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import AvatarSize from "deco-sites/persono/components/ui/AvatarSize.tsx";
import AvatarColor from "deco-sites/persono/components/ui/AvatarColor.tsx";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import Button from "deco-sites/persono/components/ui/Button.tsx";
import { Signal, useSignal } from "@preact/signals";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { redirectWithFilters } from "deco-sites/persono/components/search/utils.ts";
import { useEffect, useState } from "preact/compat";
import { StateUpdater } from "https://esm.sh/v128/preact@10.18.1/hooks/src/index.js";

export interface FilterEditableProps {
  /**  @title Hidden Filters */
  label?: string[];
  /**  @description Label is a filter current name */
  renameFilters?: {
    label: string;
    newName: string;
  }[];
}
interface Props {
  filters: ProductListingPage["filters"];
  colors: Color[];

  sizes?: Size[];
  filterSettings?: FilterEditableProps;
  basePath?: string;
}

const applyFilters = (
  { rawFiltersToApply, basePath }: {
    rawFiltersToApply: Record<string, string>[];
    basePath?: string;
  },
) =>
  redirectWithFilters({
    transformedArray: rawFiltersToApply.reduce(
      (result, item) => {
        if (Object.keys(item).length > 0) {
          const existingItemIndex = result.findIndex(({ type }) =>
            type === item.type
          );

          if (existingItemIndex === -1) {
            result.push({ type: item.type, slugs: [item.slugs] });
            return result;
          }
          result[existingItemIndex].slugs.push(item.slugs);
        }

        return result;
      },
      [] as { type: string; slugs: string[] }[],
    ),
    basePath,
  });

const toggleSelectFilter = ({
  rawFiltersToApply,
  category,
  slug,
  setRawFiltersToApply,
}: {
  rawFiltersToApply: Record<string, string>[];
  category: string;
  slug: string;
  setRawFiltersToApply: StateUpdater<Record<string, string>[]>;
}) => {
  const filterIndex = rawFiltersToApply.findIndex(
    (filter) => filter.type === category && filter.slugs === slug,
  );

  if (filterIndex !== -1) {
    const tempArray = rawFiltersToApply;
    tempArray.splice(filterIndex, 1);
    setRawFiltersToApply(tempArray);
  } else {
    setRawFiltersToApply((f) => [...f, {
      type: category,
      slugs: slug,
    }]);
  }
};

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({
  selected,
  label: currentLabel,
  quantity,
  rawFiltersToApply,
  category,
  value,
  clearFilter,
  setRawFiltersToApply,
}: FilterToggleValue & {
  rawFiltersToApply: Record<string, string>[];
  category: string;
  clearFilter: Signal<boolean>;
  setRawFiltersToApply: StateUpdater<Record<string, string>[]>;
}) {
  const toggleInputSelected = useSignal<boolean>(selected);
  const label = currentLabel === "true" ? "Sim" : currentLabel;

  if (clearFilter.value === true) {
    toggleInputSelected.value = false;
  }

  return (
    <li class="flex items-center gap-2">
      <input
        aria-checked={toggleInputSelected}
        type="checkbox"
        value={label}
        checked={toggleInputSelected}
        id={value}
        class="cursor-pointer checkbox rounded-sm w-4 h-4"
        onInput={() => {
          toggleSelectFilter({
            category,
            rawFiltersToApply,
            slug: value,
            setRawFiltersToApply,
          });
          toggleInputSelected.value = !toggleInputSelected.value;
          clearFilter.value = false;
        }}
      />
      <label for={value} class="text-sm cursor-pointer">
        {label}
      </label>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </li>
  );
}

function FilterValues({
  key,
  values,
  colors,
  rawFiltersToApply,
  clearFilter,
  setRawFiltersToApply,
}: FilterToggle & {
  colors: Color[];
  rawFiltersToApply: Record<string, string>[];
  clearFilter: Signal<boolean>;
  setRawFiltersToApply: StateUpdater<Record<string, string>[]>;
}) {
  const flexDirection =
    key.toLowerCase().endsWith("size") || key === "baseColor"
      ? "flex-row"
      : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { selected } = item;
        const toggleSizeSelected = useSignal<boolean>(selected);
        const toggleColorSelected = useSignal<boolean>(selected);

        if (clearFilter.value) {
          toggleSizeSelected.value = false;
          toggleColorSelected.value = false;
        }

        if (key === "baseColor") {
          return (
            <li>
              <button
                onClick={() => {
                  toggleSelectFilter({
                    category: key,
                    rawFiltersToApply,
                    slug: item.value,
                    setRawFiltersToApply,
                  });
                  toggleColorSelected.value = !toggleColorSelected.value;
                  clearFilter.value = false;
                }}
                id={item.label + " colorToggle"}
                aria-label="Name"
              >
                <AvatarColor
                  color={colors}
                  tipOnTop={true}
                  content={item.label}
                  variant={toggleColorSelected.value ? "active" : "default"}
                />
              </button>
            </li>
          );
        }

        if (key.toLowerCase().endsWith("size")) {
          return (
            <li>
              <button
                onClick={() => {
                  toggleSelectFilter({
                    category: key,
                    rawFiltersToApply,
                    slug: item.value,
                    setRawFiltersToApply,
                  });
                  toggleSizeSelected.value = !toggleSizeSelected.value;
                  clearFilter.value = false;
                }}
                id={item.label + " sizeToggle"}
                aria-label="Name"
              >
                <AvatarSize
                  content={item.label}
                  variant={toggleSizeSelected.value ? "active" : "default"}
                />
              </button>
            </li>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                category={key}
                rawFiltersToApply={rawFiltersToApply}
                clearFilter={clearFilter}
                setRawFiltersToApply={setRawFiltersToApply}
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return (
          <ValueItem
            category={key}
            clearFilter={clearFilter}
            rawFiltersToApply={rawFiltersToApply}
            setRawFiltersToApply={setRawFiltersToApply}
            {...item}
          />
        );
      })}
    </ul>
  );
}

function Filters({ filters, colors, filterSettings, basePath }: Props) {
  const [rawFiltersToApply, setRawFiltersToApply] = useState<
    Record<string, string>[]
  >([]);
  const { label: hiddenFilters = [], renameFilters = [] } = filterSettings ??
    {};
  const clearFilter = useSignal<boolean>(false);

  useEffect(() => {
    filters.map((item, idx) => {
      if (isToggle(item)) {
        item?.values.map((v) => {
          if (v.selected == true) {
            setRawFiltersToApply((
              f,
            ) => [...f, { type: item.key, slugs: v.value }]);
          }
        });
      }
    });
  }, []);

  function clearFilters() {
    clearFilter.value = true;
    setRawFiltersToApply([]);
  }

  return (
    <ul class="relative flex flex-col gap-6 p-4">
      <li class="flex flex-col gap-4 mb-20">
        {filters.filter(isToggle).map((filter) => {
          if (hiddenFilters.some((itemHidden) => itemHidden === filter.label)) {
            return null;
          }

          const changedLabel = renameFilters.find((renameItem) =>
            renameItem.label === filter.label
          )?.newName;
          const label = changedLabel ?? filter.label;

          return (
            <div class="flex flex-col gap-4">
              <span>{label}</span>
              <FilterValues
                clearFilter={clearFilter}
                rawFiltersToApply={rawFiltersToApply}
                setRawFiltersToApply={setRawFiltersToApply}
                colors={colors}
                {...filter}
              />
            </div>
          );
        })}
      </li>
      <li class="flex flex-col gap-2 fixed left-0 bottom-0 w-full px-4 py-2 bg-base-100 justify-between items-center border-t">
        <Button
          onClick={() => {
            applyFilters({ basePath, rawFiltersToApply });
          }}
          class="rounded-full btn-primary w-full text-base-100"
        >
          Aplicar filtros
        </Button>
        <Button
          onClick={() => {
            clearFilters();
          }}
          disabled={rawFiltersToApply.length === 0}
          class="disabled:text-gray-100 disabled:bg-white disabled:border disabled:border-gray-100 rounded-full font-bold text-md w-full text-black border border-gray-100 bg-none"
        >
          Limpar filtros
        </Button>
      </li>
    </ul>
  );
}

export default Filters;
