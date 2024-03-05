import { Props as ExternalContentProps } from "$store/components/ui/ExternalContent.tsx";
import type { Device } from "deco/utils/userAgent.ts";
import { useEffect, useRef } from "preact/compat";
import { useSignal } from "@preact/signals";

export interface Props extends ExternalContentProps {
  device: Device;
  url: string;
}

const ExternalFrame = ({
  contentLink,
  device,
  layout,
  url,
}: Props) => {
  const { containerHeight } = layout;
  const heightSetting = containerHeight[device];

  const frameRef = useRef<HTMLIFrameElement>(null);
  const loaded = useSignal(false);

  useEffect(() => {
    if (!loaded.value) {
      return;
    }
    const frameUrl = new URL(frameRef.current!.contentWindow!.location.href);
    const windowUrl = new URL(url);

    if (!frameUrl.pathname.endsWith(windowUrl.pathname)) {
      //window.location.href = frameUrl.href;
    }
  }, [loaded.value]);

  const handler = () => {
    if (!frameRef.current?.contentWindow?.location.host) {
      return;
    }
    loaded.value = true;
  };
  return (
    <iframe
      height={heightSetting}
      scrolling="no"
      width="100%"
      src={contentLink}
      frameBorder="0"
      ref={frameRef}
      onLoad={handler}
    />
  );
};

export default ExternalFrame;
