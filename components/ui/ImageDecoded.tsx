import { Props as ImageProps } from "apps/website/components/Image.tsx";
import Image from "apps/website/components/Image.tsx";
import { imageSizeToUrl } from "deco-sites/persono/constants.tsx";
import { FnContext } from "deco/types.ts";
import { SectionProps } from "deco/mod.ts";

export interface Props {
  image: ImageProps;
}

function ImageDecoded({ image }: SectionProps<typeof loader>) {
  const { src, ...defaultProps } = image;

  const extractImageType = (url: string) => {
    const pointIndex = url.lastIndexOf(".");

    if (pointIndex !== -1) {
      const extensao = url.slice(pointIndex + 1).toLowerCase();
      return extensao;
    }

    return "";
  };

  const imageType = extractImageType(src);

  const imageBaseUrl = "";
  return (
    <Image
      src={`${imageBaseUrl}${imageSizeToUrl}/${imageType}${src}`}
      {...defaultProps}
    />
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  console.log("ctx", ctx);
  return {
    ...props,
  };
};

export default ImageDecoded;
