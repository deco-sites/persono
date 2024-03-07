import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import { useCart } from "deco-sites/persono/packs/hooks/useCart.ts";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  sku: string;
}

export default function AddToCartButton(props: Props) {
  const { addItems } = useCart();
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await addItems({
        bagItems: [{ amount: 1, sku: props.sku }],
      });

      sendEvent({
        name: "add_to_cart",
        params: props.eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  const btnProps = { onClick, loading, "data-deco": "add-to-cart" };

  return (
    <Button {...btnProps} class="btn-primary h-12 btn-circle">
      Adicionar à sacola
    </Button>
  );
}
