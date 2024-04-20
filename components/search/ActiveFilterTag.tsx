import { FilterToggleValue } from "apps/commerce/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { invoke } from "deco-sites/persono/runtime.ts";
import { redirectWithFilters } from "deco-sites/persono/components/search/utils.ts";

export interface Props {
  appliedFilters: { filters: FilterToggleValue; type: string }[];
  basePath?: string;
}

interface GroupedDataItem {
  type: string;
  slugs: string[];
}

interface DataItem {
  filters: FilterToggleValue;
  type: string;
}

function deleteFilter({
  appliedFilters,
  clickedFilter,
  basePath,
}: {
  appliedFilters: { filters: FilterToggleValue; type: string }[];
  clickedFilter: {
    filters: FilterToggleValue;
    type: string;
  };
  basePath?: string;
}) {
  const rawNewAppliedFilters = appliedFilters.filter(
    (f) => f.filters.value !== clickedFilter.filters.value,
  );

  const newAppliedFilters = rawNewAppliedFilters.reduce(
    (acc: GroupedDataItem[], item: DataItem) => {
      const existingType = acc.find((group) => group.type === item.type);

      if (existingType) {
        existingType.slugs.push(item.filters.value);
      } else {
        acc.push({ type: item.type, slugs: [item.filters.value] });
      }

      return acc;
    },
    [],
  );

  redirectWithFilters({ transformedArray: newAppliedFilters, basePath });
}

function clearFilters({ basePath }: { basePath: string | undefined }) {
  redirectWithFilters({ transformedArray: [], basePath });
}

export default function ActiveFilterTag({ appliedFilters, basePath }: Props) {
  return (
    <div
      class={`${
        appliedFilters.length == 0
          ? "mb-6 hidden"
          : "flex text-sm flex-wrap gap-3 mb-4 sm:mt-4 sm:mb-9"
      }`}
    >
      {appliedFilters.map((af) => (
        <button
          onClick={() => {
            deleteFilter({
              appliedFilters: appliedFilters,
              clickedFilter: af,
              basePath,
            });
          }}
        >
          <span
            style={{ minWidth: "86px" }}
            class="py-1 gap-2 bg-black rounded-full px-3 flex flex-wrap justify-between items-center text-white"
          >
            {af.type.startsWith("is")
              ? af.filters.value[0].toUpperCase() + af.filters.value.slice(1)
              : af.filters.label}
            <Icon id="XMark" size={16} strokeWidth={2}></Icon>
          </span>
        </button>
      ))}
      <button
        class="font-bold text-sm"
        onClick={() => clearFilters({ basePath })}
      >
        Limpar filtros
      </button>
    </div>
  );
}
