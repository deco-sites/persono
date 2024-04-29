import { LoaderContext } from "deco/types.ts";
import { Manifest } from "deco-sites/persono/manifest.gen.ts";
import type { Resolvable } from 'deco/engine/core/resolver.ts'



export interface Props {
    sectionId: string
}

export default async function getSection(
    { sectionId }: Props,
    _: Request,
    { get }: LoaderContext<Manifest>,
  ): Promise<object | undefined> {
       const resolvables: Record<string, Resolvable> = await get({
        __resolveType: "resolvables",
        });
    
    console.log(sectionId)
    const props = resolvables[sectionId];
  
    if (!props) {
      throw new Error(`Section with id "${sectionId}" not found`);
    }

    return props;
  }