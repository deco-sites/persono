import { useCart } from "deco-sites/persono/packs/hooks/useCart.ts";
import Button from "./Cart/common.tsx";

function CartButton() {
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const {
    total = 0,
    items = [],
  } = cart.value ?? {};

  return (
    <Button
      currency="BRL"
      loading={loading.value}
      total={total}
      items={mapItemsToAnalyticsItems(items)}
    />
  );
}

export default CartButton;
