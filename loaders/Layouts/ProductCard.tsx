import { Layout } from "deco-sites/persono/components/product/ProductCard/index.tsx";

export interface Props {
  /** @title Product Card layout props */
  layout: Layout;
}

/** @title Product Card Layout */
const loader = ({ layout }: Props): Layout => layout;

export default loader;
