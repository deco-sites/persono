import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { SocialItem } from "deco-sites/persono/components/footer/Social.tsx";
import {
  FastLink,
  SiteNavigationElement,
} from "deco-sites/persono/components/header/Menu.tsx";
import { SectionProps } from "deco/mod.ts";
import Alert, { IAlert } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import type { EditableProps as CartProps } from "deco-sites/persono/components/minicart/Cart.tsx";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";

export interface Props {
  alerts: IAlert[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[];
  /**
   * @description Links used on mobile bottom menu
   */
  fastLinks?: FastLink[];
  /**
   * @description Links used on mobile bottom menu
   */
  socialLinks?: SocialItem[];

  /** @title Cart Settings */
  cart?: CartProps;
}

function Header({
  alerts,
  searchbar,
  navItems,
  fastLinks,
  device,
  cart,
  imageBaseUrl,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header class="h-[120px]" data-header>
        <div class="fixed top-0 left-0 w-full z-30 ">
          <Alert alerts={alerts} />
          <div class="border-b border-t border-base-300 bg-base-100 w-full relative">
            <Navbar
              imageBaseUrl={imageBaseUrl}
              items={items}
              searchbar={searchbar && { ...searchbar }}
              device={device}
            />
          </div>
        </div>
      </header>
      <Drawers
        imageBaseUrl={imageBaseUrl}
        menu={{ items, fastLinks }}
        searchbar={searchbar}
        cart={cart}
        platform={platform}
      />
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnCustomContext) => {
  const device = ctx.device;
  const imageBaseUrl = ctx.imageBaseUrl;
  return {
    ...props,
    imageBaseUrl,
    device: device || "desktop",
  };
};

export default Header;
