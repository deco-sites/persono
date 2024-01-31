import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import {
  CartButton,
  MenuButton,
  SearchButton,
} from "$store/islands/Header/Buttons.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import UserButton from "deco-sites/persono/components/header/Buttons/User.tsx";
import type { SiteNavigationElement } from "deco-sites/persono/components/header/Menu.tsx";
import { Logo } from "deco-sites/persono/components/ui/Logo.tsx";
import NavItem from "./NavItem.tsx";

function Navbar({
  items,
  searchbar,
  device,
}: {
  items: SiteNavigationElement[];
  device: string;
  searchbar?: SearchbarProps;
}) {
  if (device !== "desktop") {
    return (
      <div class="flex flex-row justify-between items-center w-full px-4 py-5 gap-2 relative">
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
          <CartButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="container flex flex-row justify-between items-center w-full pl-2 pr-6 relative">
        <div class="flex-none w-40">
          <a href="/" aria-label="Store logo" class="block py-6 w-[160px]">
            <Logo />
          </a>
        </div>
        <div class="flex-auto flex justify-start gap-8 self-stretch">
          {items.map((item) => (
            <NavItem item={item} />
          ))}
        </div>
        <div class="flex-none flex items-center justify-end gap-10">
          <SearchButton />
          <UserButton />
          <CartButton />
        </div>
      </div>
      <Searchbar searchbar={searchbar} />
    </>
  );
}

export default Navbar;
