import { Product, Search } from "apps/commerce/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import Slider from "deco-sites/persono/components/ui/Slider.tsx";
import ProductCard from "deco-sites/persono/components/product/ProductCard/index.tsx";

interface SuggestionResultProps {
  showNotFound: boolean;
  showDefaultValue: boolean;
  termsTitle: string;
  searches:
    | Search[]
    | {
        href: string;
        term: string;
      }[];
  productsTitle: string;
  products: Product[];
  generalLink: string;
}

export function SuggestionResult({
  showNotFound,
  showDefaultValue,
  termsTitle,
  searches,
  productsTitle,
  products,
  generalLink,
}: SuggestionResultProps) {
  if (showNotFound) {
    return (
      <div class="flex flex-col gap-4 pt-14 px-4 md:py-6 text-center">
        <p class="text-xl">Nenhum resultado encontrado</p>
        <p class="text-base text-[#999]">
          Vamos tentar de outro jeito? Verifique a ortografia ou use um termo
          diferente
        </p>
      </div>
    );
  }

  return (
    <article class="gap-6 lg:gap-12 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[224px_1fr]">
      <div class="flex flex-col gap-4 lg:mx-0 mx-4 border-b pb-6 lg:border-none">
        <h3 class="text-base">
          {!showDefaultValue ? "Sugestões" : termsTitle}
        </h3>
        <ul id="search-suggestion" class="flex flex-col gap-2">
          {searches.map(({ term }) => (
            <li>
              <a href={`/s?q=${term}`} class="flex gap-4 items-center link">
                <span>
                  <Icon
                    id={!showDefaultValue ? "MagnifyingGlass" : "ArrowRight"}
                    size={20}
                    class="text-[#666]"
                  />
                </span>
                <span
                  class="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: showDefaultValue
                      ? term.replace(
                          new RegExp(`/${term}/g`),
                          `<strong>${term}</strong`
                        )
                      : term,
                  }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div class="flex flex-col pt-0 gap-6 overflow-x-hidden">
        <h3 class="text-base flex justify-between items-center lg:px-0 px-4">
          <span>
            {!showDefaultValue ? "Produtos encontrados" : productsTitle}
          </span>
          <a href={generalLink} class="text-sm link">
            Ver todos
          </a>
        </h3>
        <Slider class="carousel justify-between ">
          {products.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
            >
              <ProductCard search product={product} index={index} />
            </Slider.Item>
          ))}
        </Slider>
      </div>
    </article>
  );
}
