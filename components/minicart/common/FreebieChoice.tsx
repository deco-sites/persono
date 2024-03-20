import Image from "apps/website/components/Image.tsx";
import { FreebieItem } from "deco-sites/persono/packs/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { formatPrice } from "deco-sites/persono/sdk/format.ts";

export interface CartFreebie {
  selectedSku?: FreebieItem;
  items: FreebieItem[];
  image: string;
  target: number;
}

export interface Props {
  freebie: CartFreebie;
  subtotal: number;
  currency: string;
  locale: string;
}

export function FreebieChoice({
  subtotal,
  freebie: {
    selectedSku,
    items,
    image,
    target,
  },
  currency,
  locale,
}: Props) {
  if (subtotal < target || !selectedSku) {
    return (
      <li class="flex justify-start items-center gap-4 pb-6 border-b border-gray-100">
        <Image
          class="rounded"
          src={image}
          alt="Brinde"
          width={108}
          height={108}
        />
        <p class="flex-grow text-primary sm:pr-[20%] w-[calc(100%-124px)]">
          Adicione mais{" "}
          {formatPrice((target - subtotal) / 100, currency, locale)}{" "}
          à sua sacola para ganhar  um presente especial
        </p>
      </li>
    );
  }

  return (
    <li class="flex justify-start items-center gap-4 bg-base-300 rounded">
      <Image
        class="rounded"
        src={selectedSku.image}
        alt={selectedSku.title}
        width={108}
        height={108}
      />
      <div
        class={`${
          items.length === 1 ? "gap-1" : "gap-2"
        } flex-grow w-[calc(100%-124px)] text-base flex flex-col pr-3 py-1`}
      >
        <p class="text-sm">Você ganhou um presente!</p>
        {items.length > 1
          ? (
            <div class="dropdown">
              <div
                tabIndex={0}
                role="button"
                class="btn btn-ghost border border-gray-100 flex flex-nowrap items-center justify-between group px-3 py-2"
              >
                <span class="truncate flex-grow text-left font-normal">
                  {selectedSku.title}
                </span>
                <Icon
                  id="ChevronDown"
                  size={20}
                  class="min-w-[20px] text-base-content group-focus:hidden"
                />
                <Icon
                  id="ChevronUp"
                  size={20}
                  class="min-w-[20px] text-base-content group-focus:block hidden"
                />
              </div>
              <ul
                tabIndex={0}
                class="dropdown-content mt-2 z-10 menu p-2 shadow bg-base-100 rounded-box w-full"
              >
                {items.map(({ title }) => (
                  <li>
                    <p>{title}</p>
                  </li>
                ))}
              </ul>
            </div>
          )
          : <p class="font-bold md:font-bold">{selectedSku.title}</p>}
        <p class="text-sm font-bold text-gray-600">Grátis</p>
      </div>
    </li>
  );
}
