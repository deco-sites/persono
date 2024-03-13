import { FilterEditableProps } from "deco-sites/persono/components/search/Filters.tsx";

export interface Filter {
  /** @title Filter settings props */
  filterSettings: FilterEditableProps;
}

/** @title Filter Settings */
const loader = ({ filterSettings }: Filter): FilterEditableProps =>
  filterSettings;

export default loader;
