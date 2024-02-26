import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Product, Suggestion } from "apps/commerce/types.ts";
import { SuggestionResult } from "deco-sites/persono/components/search/SuggestionResult.tsx";
import { DrawerHeader } from "deco-sites/persono/components/ui/DrawerHeader.tsx";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";

interface Link {
  label: string;
  href: string;
}

export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Featured Info
   * @description This data will be displayed on the first render of Search Bar
   */
  featured: {
    termsTitle?: string;
    topSearches: Link[];
    productsTitle?: string;
    products: Product[] | null;
  };

  /**
   * @title Featured Info
   * @description This data will be displayed on the first render of Search Bar
   */

  /** @description used for analytics event on suggestion product */

  itemListName?: string;

  /** @title Suggestions Integration   */
  loader: Resolved<Suggestion | null>;
}

export interface Props extends EditableProps {
  withHeader?: boolean;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  withHeader,
  featured: {
    productsTitle = "Produtos mais vendidos",
    products: featuredProducts,
    termsTitle = "Mais buscados",
    topSearches: featuredSearches,
  },
  itemListName,
}: Props) {
  const id = useId();
  const { displaySearchPopup, displaySearchDrawer } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading, called, query } = useSuggestions(loader);
  const { products: payloadProducts = [], searches: payloadSearches = [] } =
    payload.value ?? {};

  const { products, searches } = called.value
    ? {
      products: payloadProducts,
      searches: payloadSearches,
    }
    : {
      products: featuredProducts ?? [],
      searches: featuredSearches.map(({ label, ...item }) => ({
        term: label,
        ...item,
      })),
    };
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (
      displaySearchPopup.value === true ||
      displaySearchDrawer.value === true
    ) {
      setTimeout(() => searchInputRef.current?.focus(), 500);
    }
  }, [displaySearchPopup.value, displaySearchDrawer.value]);

  return (
    <div
      class="container lg:gap-8 gap-6 overflow-y-auto lg:overflow-y-hidden flex flex-col lg:py-6 pb-4"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      {withHeader
        ? (
          <DrawerHeader
            title="Buscar"
            onClose={() => {
              displaySearchPopup.value = false;
              displaySearchDrawer.value = false;
            }}
          />
        )
        : null}
      <div class="flex justify-start items-center gap-4 lg:px-0 px-4 -mt-2 lg:mt-0">
        <form
          id={id}
          action={action}
          class="join gap-2 flex-grow px-3 sm:pr-6 py-2 items-center rounded-full border border-[#CCC] focus-within:border-black"
        >
          <Button
            type="submit"
            class="join-item btn-ghost btn-circle w-4 hover:text-primary"
            aria-label="Search"
            for={id}
            tabIndex={-1}
          >
            {loading.value
              ? <span class="loading loading-spinner loading-xs" />
              : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
          </Button>
          <input
            ref={searchInputRef}
            id="search-input"
            class="input join-item flex-grow text-base placeholder:text-[#666] !outline-0 border-none px-0"
            name={name}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setQuery(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          {query?.value
            ? (
              <Button
                type="button"
                class="join-item btn-ghost btn-circle hover:text-primary"
                onClick={() => (searchInputRef.current!.value = "")}
              >
                limpar
              </Button>
            )
            : null}
        </form>
        <Button
          type="button"
          class="join-item btn-ghost btn-circle w-4 hidden lg:inline-flex hover:text-error"
          onClick={() => (displaySearchPopup.value = false)}
        >
          <Icon id="XMark" size={20} strokeWidth={2} />
        </Button>
      </div>
      {loading.value
        ? (
          <div class="flex lg:flex-row flex-col gap-12 px-4">
            <ul class="flex flex-col gap-4 max-w-[224px] w-full">
              <li class="skeleton w-40 h-4"></li>
              <li class="skeleton w-32 h-4 mt-2"></li>
              <li class="skeleton w-32 h-4"></li>
              <li class="skeleton w-32 h-4"></li>
            </ul>
            <div class="flex flex-col gap-5 w-full">
              <ul class="flex justify-between">
                <li class="skeleton w-40 h-4"></li>
                <li class="skeleton w-20 h-4"></li>
              </ul>
              <ul class="flex justify-between gap-8 w-full overflow-x-hidden">
                {Array.from({ length: 5 }).map(() => (
                  <li class="flex flex-col gap-2.5">
                    <div class="skeleton w-36 h-52"></div>
                    <ul class="flex flex-col gap-1">
                      <li class="skeleton w-36 h-4"></li>
                      <li class="skeleton w-1/2 h-4"></li>
                      <li class="skeleton w-1/2 h-4"></li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        : (
          <SuggestionResult
            action={action}
            itemListName={itemListName}
            showNotFound={!hasProducts && !hasTerms}
            showDefaultValue={!called.value}
            termsTitle={termsTitle}
            searches={searches}
            productsTitle={productsTitle}
            products={products}
            generalLink={`${action}?${name}=${query.value}`}
          />
        )}
    </div>
  );
}

export default Searchbar;
