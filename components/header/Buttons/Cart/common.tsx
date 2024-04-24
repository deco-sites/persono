import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart, displayMenu } = useUI();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
    displayMenu.value = false;
  };

  return (
    <div class="indicator">
      {totalItems !== 0
        ? (
          <span class="bg-primary text-primary-content rounded-full absolute w-4 h-4 top-0 right-0 text-[10px] leading-4 text-center">
            {totalItems}
          </span>
        )
        : null}
      <Button
        class="btn-circle btn-sm btn-ghost hover:text-primary"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={12} />
      </Button>
    </div>
  );
}

export default CartButton;
