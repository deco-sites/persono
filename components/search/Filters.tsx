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

const toggleSelectFilter = ({
  rawFiltersToApply,
  category,
  slug,
}: {
  rawFiltersToApply: Signal<Record<string, string>[]>;
  category: string;
  slug: string;
}) => {
  const filterIndex = rawFiltersToApply.value.findIndex(
    (filter) => filter.type === category && filter.slugs === slug,
  );

  if (filterIndex !== -1) {
    rawFiltersToApply.value.splice(filterIndex, 1);
  } else {
    rawFiltersToApply.value.push({
      type: category,
      slugs: slug,
    });
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
}: FilterToggleValue & {
  rawFiltersToApply: Signal<Record<string, string>[]>;
  category: string;
}) {
  const toggleInputSelected = useSignal<boolean>(selected);
  const label = currentLabel === "true" ? "Sim" : currentLabel;

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
          });
          toggleInputSelected.value = !toggleInputSelected.value;
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
}: FilterToggle & {
  colors: Color[];
  rawFiltersToApply: Signal<Record<string, string>[]>;
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

        if (key === "baseColor") {
          return (
            <li>
              <button
                onClick={() => {
                  toggleSelectFilter({
                    category: key,
                    rawFiltersToApply,
                    slug: item.value,
                  });
                  toggleColorSelected.value = !toggleColorSelected.value;
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
                  });
                  toggleSizeSelected.value = !toggleSizeSelected.value;
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
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return (
          <ValueItem
            category={key}
            rawFiltersToApply={rawFiltersToApply}
            {...item}
          />
        );
      })}
    </ul>
  );
}

function Filters({ filters, colors, filterSettings, basePath }: Props) {
  const rawFiltersToApply = useSignal<Record<string, string>[]>([{}]);
  const { label: hiddenFilters = [], renameFilters = [] } = filterSettings ??
    {};

  filters.map((item, idx) => {
    if (isToggle(item)) {
      item?.values.map((v) => {
        if (v.selected == true) {
          rawFiltersToApply.value.push({ type: item.key, slugs: v.value });
        }
      });
    }
  });

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
                rawFiltersToApply={rawFiltersToApply}
                colors={colors}
                {...filter}
              />
            </div>
          );
        })}
      </li>
      <li class="flex fixed left-0 bottom-0 w-full px-4 py-2 bg-base-100 justify-between items-center border-t">
        <Button
          onClick={() => {
            const transformedArray = rawFiltersToApply.value
              .reduce((result, item) => {
                if (Object.keys(item).length > 0) {
                  const existingItem = result.find((r) => r.type === item.type);

                  if (existingItem) {
                    existingItem.slugs.push(item.slugs);
                  } else {
                    result.push({ type: item.type, slugs: [item.slugs] });
                  }
                }

                return result;
              }, [] as { type: string; slugs: string[] }[])
              .filter((item) => item.slugs.length > 0);
            redirectWithFilters({ transformedArray, basePath });
          }}
          class="rounded-full btn-primary w-full text-base-100"
        >
          Aplicar filtros
        </Button>
      </li>
    </ul>
  );
}

export default Filters;
