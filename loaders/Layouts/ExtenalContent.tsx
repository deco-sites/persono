import { Layout } from "deco-sites/persono/components/ui/ExternalContent.tsx";

export interface Props {
  layout: Layout;
}

/** @title External Content Container Layout   */
const loader = ({ layout }: Props): Layout => layout;

export default loader;
