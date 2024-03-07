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
import { invoke } from "deco-sites/persono/runtime.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { SizeGroup } from "deco-sites/persono/loaders/Layouts/Size.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  colors: Color[];
  sizes?: SizeGroup;
}

const getUrl = () => {
  if (IS_BROWSER) {
    const url = window.location.href;
    return url;
  }
  return "";
};

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
  label,
  quantity,
  rawFiltersToApply,
  category,
  value,
}: FilterToggleValue & {
  rawFiltersToApply: Signal<Record<string, string>[]>;
  category: string;
}) {
  return (
    <div class="flex items-center gap-2">
      <input
        aria-checked={selected}
        type="checkbox"
        value={label}
        checked={selected}
        id={value}
        class="cursor-pointer checkbox rounded-sm w-4 h-4"
        onInput={() => {
          toggleSelectFilter({
            category,
            rawFiltersToApply,
            slug: value,
          });
        }}
      />
      <label for={value} class="text-sm cursor-pointer">
        {label}
      </label>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </div>
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

  console.log(rawFiltersToApply.value);
  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;
        const toggleSizeSelected = useSignal<boolean>(selected);
        const toggleColorSelected = useSignal<boolean>(selected);

        if (key === "baseColor") {
          return (
            <button
              onClick={() => {
                toggleSelectFilter({
                  category: key,
                  rawFiltersToApply,
                  slug: item.value,
                });
                toggleColorSelected.value = !toggleColorSelected.value;
              }}
            >
              <AvatarColor
                color={colors}
                tipOnTop={true}
                content={item.label}
                variant={toggleColorSelected.value ? "active" : "default"}
              />
            </button>
          );
        }

        if (key.toLowerCase().endsWith("size")) {
          return (
            <button
              onClick={() => {
                toggleSelectFilter({
                  category: key,
                  rawFiltersToApply,
                  slug: item.value,
                });
                toggleSizeSelected.value = !toggleSizeSelected.value;
              }}
            >
              <AvatarSize
                content={item.label}
                variant={toggleSizeSelected.value ? "active" : "default"}
              />
            </button>
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

function Filters({ filters, colors, sizes }: Props) {
  const rawFiltersToApply = useSignal<Record<string, string>[]>([{}]);
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

  const sortedSizeArray = sortedFilters.map((s) => {
    if (isToggle(s)) {
      const filtersOrdened = s.values.sort((a, b) => {
        if (!sizes) {
          return 0;
        }

        const indexA = sizes.size.findIndex((size) =>
          size.name.toLowerCase() === a.label.toLowerCase()
        );
        const indexB = sizes.size.findIndex((size) =>
          size.name.toLowerCase() === b.label.toLowerCase()
        );

        if (indexA === -1 && indexB !== -1) {
          return 1;
        } else if (indexB === -1 && indexA !== -1) {
          return -1;
        }

        return indexA - indexB;
      });
      return filtersOrdened;
    }
  });

  console.log("asas:", sortedSizeArray);

  sortedFilters.map((item) => {
    if (isToggle(item)) {
      item.values.map((v) => {
        if (v.selected == true) {
          rawFiltersToApply.value.push({ type: item.key, slugs: v.value });
        }
      });
    }
  });

  async function callUrl({
    transformedArray,
  }: {
    transformedArray: {
      type: string;
      slugs: string[];
    }[];
  }) {
    const url = getUrl();
    const response = await invoke["deco-sites/persono"].loaders.url({
      filters: transformedArray,
      origin: url,
    });

    if (!response || !response.url) {
      window.location.href = url;
      return null;
    }
    window.location.href = response.url;
  }

  return (
    <ul class="relative flex flex-col gap-6 p-4">
      <li class="flex flex-col gap-4 mb-20">
        {sortedFilters.filter(isToggle).map((filter) => (
          <li class="flex flex-col gap-4">
            <span>{filter.label}</span>
            <FilterValues
              rawFiltersToApply={rawFiltersToApply}
              colors={colors}
              {...filter}
            />
          </li>
        ))}
      </li>
      <div class="flex fixed left-0 bottom-0 w-full px-4 py-2 bg-base-100 justify-between items-center border-t">
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
            callUrl({ transformedArray });
          }}
          class="rounded-full btn-primary w-full text-base-100"
        >
          Aplicar Filtros
        </Button>
      </div>
    </ul>
  );
}

export default Filters;
