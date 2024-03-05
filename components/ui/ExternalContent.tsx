import { FnContext } from "deco/types.ts";
import { SectionProps } from "deco/mod.ts";
import ExternalFrame from "$store/islands/ExternalFrame.tsx";
import { Device } from "deco/utils/userAgent.ts";

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

interface LoaderReturn extends Props {
  device: Device
  url: string
}

const ExternalContent = (props: SectionProps<typeof loader>) => {
  const a = props as LoaderReturn
  console.log(props)
  return (
    <ExternalFrame
      contentLink={a!.contentLink}
      device={a.device}
      layout={a.layout}
      url={a.url}
    />
  );
};

export const loader = (props: Props, req: Request, ctx: FnContext): LoaderReturn | Response => {
  const refer = req.headers.get("referer");
  const url = req.url;
  
  if (refer) {
    const newHeaders = new Headers({
      location: req.url,
    });

    req.headers.forEach((value, key) => {
      if (key === "referer") {
        return;
      }
      newHeaders.append(key, value);
    });

    const res = new Response("porra", {
      status: 307,
      headers: newHeaders,
    });

    return res
  }
  return {
    device: ctx.device,
    url,
    ...props,
  };
};

export default ExternalContent;
