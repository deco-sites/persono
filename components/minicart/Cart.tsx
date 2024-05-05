import BaseCart from "deco-sites/persono/components/minicart/common/Cart.tsx";
import { EditableProps as FreeShippingProps } from "deco-sites/persono/components/minicart/common/FreeShippingProgressBar.tsx";
import { CartFreebie } from "deco-sites/persono/components/minicart/common/FreebieChoice.tsx";
import { useCart } from "deco-sites/persono/packs/hooks/useCart.ts";
import { getImageUrl } from "$store/packs/utils/utils.ts";
import { CartItemEditableProps } from "deco-sites/persono/components/minicart/common/CartItem.tsx";

export interface EditableProps {
  /** @description Use discount type to despise this discount */
  hiddenDiscounts?: string[];
  freeShipping?: FreeShippingProps;
  imageContainerSettings?:CartItemEditableProps
}

export interface Props extends EditableProps {
  onClose: () => void;
  imageBaseUrl?: string;
}

function Cart({
  hiddenDiscounts = [],
  freeShipping,
  onClose,
  imageBaseUrl,
  imageContainerSettings
}: Props) {
  const { cart, loading, addItems, mapItemsToAnalyticsItems } = useCart();
  const { items = [], total = 0, discounts = [] } = cart.value ?? {};
  const coupon = cart.value?.coupon;

  const freebie: CartFreebie | null | undefined =
    cart.value?.freebies?.eligible && cart.value?.freebies?.active
      ? {
        selectedSku: cart.value.freebies.items.find(
          (item) => item.sku === cart.value?.freebies.selectedFreebie,
        ),
        items: cart.value.freebies.items,
        image: cart.value.freebies.drawerImage,
        target: cart.value.freebies.subtotalToActivate,
      }
      : null;

  return (
    <BaseCart
      items={items.map((item) => ({
        image: {
          src: getImageUrl(imageBaseUrl, item.photoStill),
          alt: item.title,
        },
        quantity: item.amount,
        name: item.title,
        sku: item.sku,
        stock: item.stock,
        size: item.size,
        price: {
          sale: item.price.min,
          list: item.price.max,
        },
      }))}
      total={total}
      discounts={discounts.filter(
        (discount) => !hiddenDiscounts.includes(discount.type),
      )}
      loading={loading.value}
      freeShippingCompletedText={freeShipping?.completedText}
      freeShippingTextTemplate={freeShipping?.textTemplate}
      freeShippingTarget={freeShipping?.target}
      coupon={coupon}
      onClose={onClose}
      freebie={freebie}
      onUpdateQuantity={(amount: number, sku: string) =>
        addItems({ bagItems: [{ sku, amount }] })}
      itemToAnalyticsItem={(sku: string) => {
        const item = items.find((item) => (item.sku = sku));

        return item && mapItemsToAnalyticsItems([item!]).at(0);
      }}
      locale="pt-BR"
      checkoutHref="/checkout-s"
      currency="BRL"
      imageContainerSettings={imageContainerSettings}
    />
  );
}

export default Cart;
