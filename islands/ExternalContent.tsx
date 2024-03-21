import { IS_BROWSER } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import { useEffect } from "preact/hooks";

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

const iframeHeight = signal(0);

const handleHeightMessage = ({ data }: MessageEvent) => {
  if (data?.type === "iframeHeight") {
    iframeHeight.value = data.height;
  }
};

const ExternalContent = (
  { device, layout, path }: SectionProps<typeof loader>,
) => {
  const { containerHeight } = layout;

  useEffect(() => {
    if (IS_BROWSER) {
      addEventListener("message", handleHeightMessage);

      return () => {
        removeEventListener("message", handleHeightMessage);
      };
    }
  }, []);

  return (
    <iframe
      height={iframeHeight.value || containerHeight[device]}
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
