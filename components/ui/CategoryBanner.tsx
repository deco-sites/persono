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
  /** @description Text to be rendered on top of the image */
  title?: string;
  /** @description Banner title text color*/
  color: "primary" | "secondary" | "accent" | "black" | "white";
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description Image alt text */
    alt?: string;
  };
}

export interface bannerDefault {
  /** @description Banner title text color*/
  color: "primary" | "secondary" | "accent" | "black" | "white";
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

  const COLOR = {
    primary: "text-primary-content",
    secondary: "text-secondary-content",
    accent: "text-accent-content",
    black: "text-black",
    white: "text-white",
  } as const;

  if (!banner) {
    return (
      <div class="w-full bg-base-300">
        <div class="flex items-center justify-between mb-0 sm:mb-16 relative">
          <div class="w-full absolute">
            <div class="container">
              <h2
                class={` ${
                  device === "desktop"
                    ? "text-[3.5rem] px-4"
                    : "text-2xl font-medium px-7"
                } ${COLOR[bannerDefault?.color ?? "black"]}`}
              >
                {productBannerCategory}
              </h2>
            </div>
          </div>
          <Picture
            class={` ${
              device === "desktop" ? "h-48" : "h-28"
            } overflow-hidden w-full`}
            preload={true}
          >
            <Source
              media="(max-width: 768px)"
              src={bannerDefault!.image.mobile}
              width={270}
              height={377}
            />
            <Source
              media="(min-width: 768px)"
              src={bannerDefault!.image.desktop}
              width={800}
              height={1200}
            />
            <img
              src={bannerDefault?.image.desktop}
              class="w-full h-full object-cover"
              alt="banner category default image"
            />
          </Picture>
        </div>
      </div>
    );
  }

  const { title, image, color } = banner;

  return (
    <div class="w-full bg-base-300">
      <div class="flex items-center justify-between mb-0 sm:mb-16 relative">
        <div class="w-full absolute">
          <div class="container">
            <h2
              class={` ${
                device === "desktop"
                  ? "text-[3.5rem]"
                  : "text-2xl font-medium px-7"
              } ${COLOR[color]}`}
            >
              {title ?? productBannerCategory}
            </h2>
          </div>
        </div>
        <Picture
          class={` ${
            device === "desktop" ? "h-48" : "h-28"
          }  overflow-hidden w-full`}
          preload={true}
        >
          <Source
            media="(max-width: 768px)"
            src={image.mobile}
            width={270}
            height={377}
          />
          <Source
            media="(min-width: 768px)"
            src={image.desktop}
            width={800}
            height={1200}
          />
          <img
            src={image.desktop}
            class="w-full h-full object-cover"
            alt="banner category image"
          />
        </Picture>
      </div>
    </div>
  );
}

export const loader = (props: Props, req: Request, ctx: FnCustomContext) => {
  const { banners, page, bannerDefault } = props;
  const device = ctx.device;

  if (!page) {
    return {};
  }

  const productBannerCategory = page.seo?.title;

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
