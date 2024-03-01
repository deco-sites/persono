import { Props as ExternalContentProps } from "$store/components/ui/ExternalContent.tsx";
import type { Device } from "deco/utils/userAgent.ts";
//import { useEffect, useRef } from "preact/compat";

export interface Props extends ExternalContentProps {
  device: Device;
}

const ExternalFrame = ({
  contentLink,
  device,
  layout,
}: Props) => {
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

export default ExternalFrame;
