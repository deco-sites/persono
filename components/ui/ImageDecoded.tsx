import { Props as ImageProps } from "apps/website/components/Image.tsx";
import Image from "apps/website/components/Image.tsx";
import { imageSizeToUrl } from "deco-sites/persono/constants.tsx";

export interface Props {
  settings: ImageProps;
  imageBaseUrl: string;
}

function ImageDecoded({ settings, imageBaseUrl }: Props) {
  const { src, ...defaultProps } = settings;

  const extractImageType = (url: string) => {
    const pointIndex = url.lastIndexOf(".");

    if (pointIndex !== -1) {
      const extension = url.slice(pointIndex + 1).toLowerCase();
      return extension;
    }

    return "";
  };

  const imageType = extractImageType(src);

  return (
    <Image
      src={`${imageBaseUrl}${imageSizeToUrl}/${imageType}${src}`}
      {...defaultProps}
    />
  );
}

export default ImageDecoded;
