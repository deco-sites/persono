import { IS_BROWSER } from "$fresh/runtime.ts";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { EditableProps as CartProps } from "deco-sites/persono/components/minicart/Cart.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense, useEffect } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const SearchBar = lazy(() => import("$store/components/search/Searchbar.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  cart?: CartProps;
  imageBaseUrl?: string;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = ({ children }: { children: ComponentChildren }) => (
  <div class="bg-base-100 flex flex-col items-stretch justify-items-stretch h-full divide w-full sm:max-w-xl">
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers(
  { menu, searchbar, cart, imageBaseUrl, children, platform }: Props,
) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <>
      <Drawer // left drawer
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
        class="menu-drawer"
        showHeader
        aside={
          <Aside>
            <Menu {...menu} />
          </Aside>
        }
      />
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value || displaySearchDrawer.value}
        onClose={() => {
          displayCart.value = false;
          displaySearchDrawer.value = false;
        }}
        aside={
          <Aside>
            {displaySearchDrawer.value
              ? <SearchBar withHeader {...searchbar!} />
              : null}
            {displayCart.value
              ? (
                <Cart
                  {...cart}
                  imageBaseUrl={imageBaseUrl}
                  onClose={() => (displayCart.value = false)}
                />
              )
              : null}
          </Aside>
        }
      />
    </>
  );
}

export default Drawers;
