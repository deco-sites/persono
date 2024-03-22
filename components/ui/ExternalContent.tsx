import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import { useId } from "../../sdk/useId.ts";

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

const snippet = (rootId: string) => {
  const handleHeightMessage = ({ data }: MessageEvent) => {
    if (data?.type === "iframeHeight") {
      const iframe = document.getElementById(`${rootId}::external-content`);

      if (iframe) {
        iframe.style.height = `${data.height}px`;
      }
    }
  };

  addEventListener("message", handleHeightMessage);
};

const ExternalContent = (
  { device, layout, path }: SectionProps<typeof loader>,
) => {
  const { containerHeight } = layout;
  const id = useId();

  return (
    <>
      <iframe
        id={`${id}::external-content`}
        height={containerHeight[device]}
        scrolling="no"
        width="100%"
        src={"/secure" + path}
        frameBorder="0"
      />
      <script
        defer
        src={scriptAsDataURI(snippet, id)}
      />
    </>
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
