import Avatar from "$store/components/ui/Avatar.tsx";
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

interface Props {
  filters: ProductListingPage["filters"];
  colors: Color[];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({
  url,
  selected,
  label,
  quantity,
  rawFiltersToApply,
  category,
}: FilterToggleValue & {
  rawFiltersToApply: Signal<Record<string, string>[]>;
  category: string;
}) {
  return (
    <div class="flex items-center gap-2">
      <input
        aria-checked={selected}
        class="checkbox"
        type="checkbox"
        value={label}
        onInput={(e) => {
          rawFiltersToApply.value.push({
            key: category,
            value: e.currentTarget.value,
          });
        }}
      />
      <span class="text-sm">{label}</span>
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

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "baseColor") {
          return (
            <a href={url} rel="nofollow">
              <AvatarColor
                color={colors}
                tipOnTop={true}
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key.toLowerCase().endsWith("size")) {
          return (
            <a href={url} rel="nofollow">
              <AvatarSize
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
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

function Filters({ filters, colors }: Props) {
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
            const transformedArray = rawFiltersToApply.value.reduce(
              (result, item) => {
                const existingItem = result.find((r) => r.key === item.key);

                if (existingItem) {
                  existingItem.value.push(item.value);
                } else {
                  result.push({ key: item.key, value: [item.value] });
                }

                return result;
              },
              [] as { key: string; value: string[] }[],
            );
            console.log(transformedArray);
          }}
          class="btn rounded-full bg-primary w-full text-base-100"
        >
          Aplicar Filtros
        </Button>
      </div>
    </ul>
  );
}

export default Filters;
