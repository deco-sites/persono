import { FnContext } from "deco/types.ts";
import { SectionProps } from "deco/mod.ts";
import ExternalFrame from "$store/islands/ExternalFrame.tsx";

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
  contentLink: string;
  layout: Layout;
}

const ExternalContent = ({
  contentLink,
  device,
  layout,
}: SectionProps<typeof loader>) => {
  return (
    <ExternalFrame
      contentLink={contentLink}
      device={device}
      layout={layout}
    />
  );
};

export const loader = (props: Props, _: Request, ctx: FnContext) => {
  return {
    device: ctx.device,
    ...props,
  };
};

export default ExternalContent;
