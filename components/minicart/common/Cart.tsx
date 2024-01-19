import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { Discounts } from "deco-sites/persono/components/minicart/Discounts.tsx";
import {
  CartFreebie,
  FreebieChoice,
} from "deco-sites/persono/components/minicart/common/FreebieChoice.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { Discount } from "deco-sites/persono/packs/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  discounts: Discount[];
  freebie?: CartFreebie | null;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget?: number;
  freeShippingTextTemplate?: string;
  checkoutHref: string;
  onClose?: () => void;
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freebie,
  freeShippingTarget,
  freeShippingTextTemplate,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onClose,
}: Props) {
  const isEmpty = items.length === 0;
  const totalDiscounts = discounts?.reduce(
    (acc, { value }) => value + acc,
    0,
  );
  const calcSubtotal = items.reduce((acc, { price }) => acc + price.sale, 0);
  const calcTotal = calcSubtotal - totalDiscounts;

  return (
    <div class="flex w-full h-full flex-col justify-center items-center overflow-hidden">
      <header class="flex justify-between items-center px-4 py-2 border-b border-[#ccc] w-full">
        <h3 class="text-xl font-medium">Minha sacola</h3>
        <Button class="btn-ghost btn-circle" onClick={onClose}>
          <Icon id="XMark" size={20} strokeWidth={2} />
        </Button>
      </header>
      {isEmpty
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-primary"
              onClick={onClose}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            <ul
              role="list"
              class="p-4 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {freeShippingTarget && freeShippingTextTemplate
                ? (
                  <li class="p-2 w-full">
                    <FreeShippingProgressBar
                      total={total}
                      locale={locale}
                      currency={currency}
                      target={freeShippingTarget}
                      textTemplate={freeShippingTextTemplate}
                    />
                  </li>
                )
                : null}
              {freebie
                ? (
                  <FreebieChoice
                    freebie={freebie}
                    subtotal={calcSubtotal}
                    currency={currency}
                    locale={locale}
                  />
                )
                : null}
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>
            <footer class="w-full flex flex-col gap-4">
              {calcSubtotal !== calcTotal
                ? (
                  <div class="flex flex-col gap-4 px-4 pt-4 border-t border-[#ccc]">
                    <div class="w-full flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>
                        {formatPrice(calcSubtotal / 100, currency, locale)}
                      </span>
                    </div>
                    <Discounts
                      discounts={discounts}
                      currency={currency}
                      locale={locale}
                      totalDiscounts={totalDiscounts}
                    />
                  </div>
                )
                : null}
              <div class="border-t border-[#ccc] pt-4 mx-4 flex flex-col justify-end items-end gap-2">
                <div class="flex justify-between items-start w-full font-medium">
                  <span class="text-xl">Total</span>
                  <span class="text-2xl">
                    {formatPrice(calcTotal / 100, currency, locale)}
                  </span>
                </div>
                <span class="text-sm text-[#666]">
                  Frete e descontos serão informados no checkout.
                </span>
              </div>
              <div class="flex flex-col px-4 pb-4 justify-stretch gap-2">
                <a class="block" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn-primary btn-block"
                    disabled={loading || isEmpty}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: calcTotal,
                          items: items.reduce<AnalyticsItem[]>((acc, item) => {
                            if (item) {
                              return [...acc, itemToAnalyticsItem(item.sku)!];
                            }
                            return acc;
                          }, [] as AnalyticsItem[]),
                        },
                      });
                    }}
                  >
                    Fechar pedido
                  </Button>
                </a>
                <Button
                  data-deco="buy-button"
                  class="btn-accent btn-block"
                  disabled={loading || isEmpty}
                  onClick={onClose}
                >
                  Continuar comprando
                </Button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
