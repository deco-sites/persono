/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Product, Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import { DrawerHeader } from "deco-sites/persono/components/ui/DrawerHeader.tsx";
import He120PinV135 from "https://esm.sh/he@1.2.0?pin=v135";

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
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
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
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div
      class="container grid gap-8 px-4 py-6 overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      {withHeader
        ? (
          <DrawerHeader
            title="Buscar"
            onClose={() => displaySearchPopup.value = false}
          />
        )
        : null}
      <div class="flex justify-start items-center gap-4">
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
                class="join-item btn-ghost btn-circle hidden lg:inline-flex hover:text-primary"
                onClick={() => searchInputRef.current!.value = ""}
              >
                limpar
              </Button>
            )
            : null}
        </form>
        <Button
          type="button"
          class="join-item btn-ghost btn-circle w-4 hidden lg:inline-flex hover:text-error"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      </div>

      <div
        class={`overflow-y-scroll ${!hasProducts && !hasTerms ? "hidden" : ""}`}
      >
        <div class="gap-12 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[224px_1fr]">
          <div class="flex flex-col gap-4">
            <h3 class="text-base">
              {called.value ? "Sugestões" : termsTitle}
            </h3>
            <ul id="search-suggestion" class="flex flex-col gap-2">
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center link">
                    <span>
                      <Icon
                        id={called.value ? "MagnifyingGlass" : "ArrowRight"}
                        size={20}
                        class="text-[#666]"
                      />
                    </span>
                    <span
                      class="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: called.value
                          ? term.replace(
                            new RegExp(`/${term}/g`),
                            `<strong>${term}</strong`,
                          )
                          : term,
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-4 md:pt-0 gap-6 overflow-x-hidden">
            <h3 class="text-base flex justify-between items-center">
              <span>{called.value ? "Produtos sugeridos" : productsTitle}</span>
              <a href={`${action}?${name}=${query.value}`} class="text-sm link">
                Ver todos
              </a>
            </h3>
            <Slider class="carousel">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                >
                  <ProductCard
                    product={product}
                    index={index}
                    itemListName="Suggeestions"
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
