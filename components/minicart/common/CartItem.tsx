import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  sku: string;
  name: string;
  size: string;
  quantity: number;
  stock: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface CartItemEditableProps {
  /** @format color */
  backgroundColor?: string;
  blendMode?: boolean;
}

export interface Props {
  item: Item;
  locale: string;
  currency: string;
  onUpdateQuantity: (quantity: number, sku: string) => Promise<void>;
  itemToAnalyticsItem: (sku: string) => AnalyticsItem | null | undefined;
  imageContainerSettings?: CartItemEditableProps;
}

function CartItem(
  {
    item,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
    imageContainerSettings,
  }: Props,
) {
  const { image, name, size, price: { sale, list }, quantity } = item;
  const [loading, setLoading] = useState(false);

  const { backgroundColor = "#e6eaeb", blendMode } = imageContainerSettings ??
    {};

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div class="flex items-start justify-stretch gap-4">
      <div
        style={{
          backgroundColor,
          mixBlendMode: blendMode ? "multiply" : "normal",
        }}
        class="w-[108px] h-[150px] flex items-center justify-center rounded"
      >
        <Image
          {...image}
          style={{ aspectRatio: "1 / 1" }}
          width={108}
          height={150}
          fit="contain"
          class="rounded bg-gradient-to-bl "
        />
      </div>
      <div class="flex flex-col flex-grow gap-6">
        <div class="relative flex flex-col gap-1">
          <p class="text-base0 w-full max-w-[223px]">{name}</p>
          <p class="text-sm capitalize">Tamanho {size.toLowerCase()}</p>
          <div class="flex items-center gap-2">
            {list !== sale
              ? (
                <p class="line-through text-gray-600 text-xs">
                  {formatPrice(list / 100, currency, locale)}
                </p>
              )
              : null}
            <p class="text-base">
              {formatPrice(sale / 100, currency, locale)}
            </p>
          </div>
        </div>
        <QuantitySelector
          disabled={loading}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            await onUpdateQuantity(quantity, item.sku);

            const analyticsItem = itemToAnalyticsItem(item.sku);
            const diff = quantity - item.quantity;
            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
      </div>
      <Button
        class="btn-circle btn-ghost hover:text-error w-4"
        onClick={withLoading(async () => {
          await onUpdateQuantity(0, item.sku);

          const analyticsItem = itemToAnalyticsItem(item.sku);
          if (analyticsItem) {
            sendEvent({
              name: "remove_from_cart",
              params: {
                items: [{ ...analyticsItem, quantity: 0 }],
              },
            });
          }
        })}
      >
        <Icon id="Trash" size={20} />
      </Button>
    </div>
  );
}

export default CartItem;
