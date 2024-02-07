/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */

import type { SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

interface Props {
  title: string;
  subtitle: string;
}

function NotFound({ subtitle, title }: SectionProps<typeof loader>) {
  return (
    <div class=" w-full flex flex-col items-center justify-center py-20 gap-1">
      <Icon id="MagnifyingGlassFound" height={49} width={49} />
      <span class="font-medium text-2xl mt-4   text-black">{title}</span>
      <span class="font-normal text-base text-black">{subtitle}</span>
    </div>
  );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const url = new URL(req.url);
  console.log("@@@ url ", url);
  return {
    ...props,
  };
};

export default NotFound;
