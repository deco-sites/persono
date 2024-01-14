import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { SiteNavigationElement } from "deco-sites/persono/components/header/Menu.tsx";
import { SectionProps } from "deco/mod.ts";
import { FnContext } from "deco/types.ts";
import Alert, { IAlert } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";

export interface Props {
  alerts: IAlert[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;
}

function Header({
  alerts,
  searchbar,
  navItems,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header class="border-b border-base-200">
      <Drawers
        menu={{ items }}
        searchbar={searchbar}
        platform={platform}
      >
        <Alert alerts={alerts} />
        <div class="border-t border-base-200 bg-base-100 w-full">
          <Navbar
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            device={device}
          />
        </div>
      </Drawers>
    </header>
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
