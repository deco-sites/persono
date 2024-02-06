import { Item } from "$store/packs/types.ts";
import { state as storeState } from "$store/packs/hooks/context.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { withManifest } from "deco/clients/withManifest.ts";
import type { Manifest } from "$store/manifest.gen.ts";

const { cart, loading } = storeState;
const Runtime = withManifest<Manifest>();

const mapItemsToAnalyticsItems = (
  items: Item[],
): AnalyticsItem[] => {
  if (!items) {
    return [];
  }

  return items.map((item, index) => ({
    item_id: item.productId,
    item_name: item.title,
    coupon: "",
    discount: Number(item.price.max - item.price.min),
    index,
    item_variant: item.line,
    price: item.price.min,
    quantity: item.amount,
    affiliation: "Persono",
  }));
};

const wrap =
  // deno-lint-ignore no-explicit-any
  <T>(action: (p: T, init?: RequestInit | undefined) => Promise<any>) =>
  (p: T) =>
    storeState.enqueue(async (signal) => ({
      cart: await action(p, { signal }),
      loading: false,
    }));

const state = {
  cart,
  loading,

  addItems: wrap(
    Runtime.create("deco-sites/persono/loaders/actions/cart/addItem.ts"),
  ),
  addCoupon: wrap(
    Runtime.create("deco-sites/persono/loaders/actions/cart/addCoupon.ts"),
  ),
  removeCoupon: wrap(
    Runtime.create("deco-sites/persono/loaders/actions/cart/removeCoupon.ts"),
  ),
  simulate: wrap(
    Runtime.create("deco-sites/persono/loaders/shippingSimulation.ts"),
  ),
  mapItemsToAnalyticsItems: mapItemsToAnalyticsItems,
};

export const useCart = () => state;
