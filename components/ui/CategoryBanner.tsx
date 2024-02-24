import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Logo } from "deco-sites/persono/components/ui/Logo.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import NotFound from "deco-sites/persono/sections/Product/NotFound.tsx";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

export interface bannerDefault {
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

export interface Props {
  /** @title Banners */
  banners: Banner[];
  /** @title Banner Default */
  bannerDefault: bannerDefault;
  page: ProductListingPage | null;
}

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner, productBannerCategory, bannerDefault, device } = props;

  if (!banner) {
    return device == "desktop"
      ? (
        <div
          style={{
            backgroundImage: `url(${bannerDefault?.image.desktop})`,
          }}
          class="h-48 w-full bg-cover bg-base-300 flex items-center justify-between overflow-hidden mb-0 sm:mb-16"
        >
          <h2 class="pl-20 text-[3.5rem] text-black">
            {productBannerCategory}
          </h2>
        </div>
      )
      : (
        <div
          style={{
            backgroundImage: `url(${bannerDefault?.image.mobile})`,
          }}
          class="h-28 w-full bg-cover bg-base-300 flex items-center justify-between overflow-hidden mb-0 sm:mb-16"
        >
          <h2 class="pl-6 text-2xl font-medium text-black">
            {productBannerCategory}
          </h2>
        </div>
      );
  }

  const { title, image } = banner;

  return device == "desktop"
    ? (
      <div
        style={{
          backgroundImage: `url(${
            image.desktop ?? bannerDefault.image.desktop
          })`,
        }}
        class="h-48 w-full bg-cover bg-base-300 flex items-center justify-between overflow-hidden mb-0 sm:mb-16"
      >
        <h2 class="pl-20 text-[3.5rem] text-black">
          {title ?? productBannerCategory}
        </h2>
      </div>
    )
    : (
      <div
        style={{
          backgroundImage: `url(${image.mobile ?? bannerDefault.image.mobile})`,
        }}
        class="h-28 w-full bg-cover bg-base-300 flex items-center justify-between overflow-hidden mb-0 sm:mb-16"
      >
        <h2 class="pl-6 text-2xl font-medium text-black">
          {title ?? productBannerCategory}
        </h2>
      </div>
    );
}

export const loader = (props: Props, req: Request, ctx: FnCustomContext) => {
  const { banners, page, bannerDefault } = props;
  const device = ctx.device;

  if (!page) {
    return {};
  }

  const productBannerCategory = page.products
    .map((p) => p.category)[0]
    ?.split(">")[0];

  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return {
    banner,
    productBannerCategory,
    bannerDefault,
    device: device || "desktop",
  };
};

export default Banner;
