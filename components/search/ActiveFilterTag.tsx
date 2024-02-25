import { FilterToggleValue } from "apps/commerce/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { invoke } from "deco-sites/persono/runtime.ts";

export interface Props {
  appliedFilters: { filters: FilterToggleValue; type: string }[];
}

interface GroupedDataItem {
  type: string;
  slugs: string[];
}

interface DataItem {
  filters: FilterToggleValue;
  type: string;
}

const getUrl = () => {
  if (IS_BROWSER) {
    const url = window.location.href;
    return url;
  }
  return "";
};

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

function deleteFilter({
  appliedFilters,
  clickedFilter,
}: {
  appliedFilters: { filters: FilterToggleValue; type: string }[];
  clickedFilter: {
    filters: FilterToggleValue;
    type: string;
  };
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

  callUrl({ transformedArray: newAppliedFilters });
}

export default function ActiveFilterTag({ appliedFilters }: Props) {
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
            });
          }}
        >
          <span
            style={{ minWidth: "86px" }}
            class="py-1 gap-3 bg-black opacity-80 rounded-full px-3 flex flex-wrap justify-between items-center text-white"
          >
            {af.filters.label}
            <Icon id="XMark" size={16} strokeWidth={2}></Icon>
          </span>
        </button>
      ))}
    </div>
  );
}
