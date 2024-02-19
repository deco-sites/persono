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

interface Props {
  filters: ProductListingPage["filters"];
  colors: Color[];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({
  key,
  values,
  colors,
}: FilterToggle & { colors: Color[] }) {
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
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, colors }: Props) {
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

  console.log(sortedFilters);

  return (
    <ul class="relative flex flex-col gap-6 p-4">
      {sortedFilters.filter(isToggle).map((filter) => (
        <li class="flex flex-col gap-4">
          <span>{filter.label}</span>
          <FilterValues colors={colors} {...filter} />
        </li>
      ))}
      <div class="flex fixed left-0 bottom-0 w-full px-4 py-2 bg-base-100 justify-between items-center border-t">
        <Button class="btn rounded-full bg-primary w-full text-base-100">
          Aplicar Filtros
        </Button>
      </div>
    </ul>
  );
}

export default Filters;
