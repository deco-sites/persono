import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { SocialItem } from "deco-sites/persono/components/footer/Social.tsx";
import {
  FastLink,
  SiteNavigationElement,
} from "deco-sites/persono/components/header/Menu.tsx";
import { SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import Alert, { IAlert } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import type { EditableProps as CartProps } from "deco-sites/persono/components/minicart/Cart.tsx";

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
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header class="h-[120px]" data-header>
        <div class="fixed top-0 left-0 w-full z-30 ">
          <Alert alerts={alerts} />
          <div class="border-b border-t border-base-200 bg-base-100 w-full">
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              device={device}
            />
          </div>
        </div>
      </header>
      <Drawers
        menu={{ items, fastLinks }}
        searchbar={searchbar}
        cart={cart}
        platform={platform}
      />
    </>
  );
}

export const loader = (
  props: Props,
  _req: Request,
  ctx: FnContext,
) => {
  const device = ctx.device;
  return {
    ...props,
    device: device || "desktop",
  };
};

export default Header;
