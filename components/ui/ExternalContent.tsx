import { FnContext } from "deco/types.ts";
import { SectionProps } from "deco/mod.ts";

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

interface Props {
  contentLink: string;
  layout: Layout;
}

const ExternalContent = ({
  contentLink,
  device,
  layout,
}: SectionProps<typeof loader>) => {
  const { containerHeight } = layout;
  const heightSetting = containerHeight[device];

  return (
    <iframe
      height={heightSetting}
      scrolling="no"
      width="100%"
      src={contentLink}
      frameBorder="0"
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
