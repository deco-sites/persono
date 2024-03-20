import { SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";

interface ContentDevices {
  mobile: number;
  tablet: number;
  desktop: number;
}
export interface Layout {
  /**
   * @description Using height in pixels
   */
  containerHeight: ContentDevices;
}

export interface Props {
  layout: Layout;
}

const ExternalContent = (
  { device, layout, path }: SectionProps<typeof loader>,
) => {
  const { containerHeight } = layout;

  return (
    <iframe
      height={containerHeight[device]}
      scrolling="no"
      width="100%"
      src={"/secure" + path}
      frameBorder="0"
    />
  );
};

export const loader = (
  props: Props,
  req: Request,
  ctx: FnContext,
) => {
  const url = new URL(req.url);

  return {
    device: ctx.device,
    path: url.pathname,
    ...props,
  };
};

export default ExternalContent;
