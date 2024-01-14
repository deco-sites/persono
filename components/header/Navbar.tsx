import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "deco-sites/persono/components/header/Menu.tsx";
import { Logo } from "../ui/Logo.tsx";
import NavItem from "./NavItem.tsx";

function Navbar({ items, searchbar, device }: {
  items: SiteNavigationElement[];
  device: string;
  searchbar?: SearchbarProps;
}) {
  const platform = usePlatform();

  if (device !== "desktop") {
    return (
      <div class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2">
        <MenuButton />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          aria-label="Store logo"
        >
          <Logo isMobile />
        </a>

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>
    );
  }

  return (
    <div class="container hidden md:flex flex-row justify-between items-center w-full pl-2 pr-6 relative">
      <div class="flex-none w-40">
        <a
          href="/"
          aria-label="Store logo"
          class="block py-6 w-[160px]"
        >
          <Logo />
        </a>
      </div>
      <div class="flex-auto flex justify-start gap-8 self-stretch">
        {items.map((item) => <NavItem item={item} />)}
      </div>
      <div class="flex-none w-44 flex items-center justify-end gap-2">
        <SearchButton />
        <Searchbar searchbar={searchbar} />
        <a
          class="btn btn-circle btn-sm btn-ghost"
          href="/login"
          aria-label="Log in"
        >
          <Icon id="User" size={24} strokeWidth={0.4} />
        </a>
        <a
          class="btn btn-circle btn-sm btn-ghost"
          href="/wishlist"
          aria-label="Wishlist"
        >
          <Icon
            id="Heart"
            size={24}
            strokeWidth={2}
            fill="none"
          />
        </a>
        {platform === "vtex" && <CartButtonVTEX />}
        {platform === "vnda" && <CartButtonVDNA />}
        {platform === "wake" && <CartButtonWake />}
        {platform === "linx" && <CartButtonLinx />}
        {platform === "shopify" && <CartButtonShopify />}
        {platform === "nuvemshop" && <CartButtonNuvemshop />}
      </div>
    </div>
  );
}

export default Navbar;
