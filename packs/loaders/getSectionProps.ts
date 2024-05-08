import { LoaderContext } from "deco/types.ts";
import { Manifest } from "deco-sites/persono/manifest.gen.ts";
import type { Resolvable } from "deco/engine/core/resolver.ts";

export interface Props {
  sectionsIds: string[];
}

const loader = async (
  { sectionsIds }: Props,
  _: Request,
  { get }: LoaderContext<Manifest>,
): Promise<object | undefined> => {
  const resolvables: Record<string, Resolvable> = await get({
    __resolveType: "resolvables",
  });
  const sectionsProps = sectionsIds.reduce((sections, id) => {
    const props = resolvables[id];
    if (!props) {
      return sections;
    }

    return { ...sections, [id]: props };
  }, {});

  return sectionsProps;
};

export default loader;
