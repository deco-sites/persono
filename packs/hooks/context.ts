import { IS_BROWSER } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { withManifest } from "deco/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";
import { Bag } from "$store/packs/types.ts";

interface Context {
  cart: Bag;
}

// @ts-ignore <IDK why this is wrong>
const Runtime = withManifest<Manifest>();
const loading = signal<boolean>(true);
const context = {
  cart: signal<Bag | undefined>(undefined),
};

let queue = Promise.resolve();
let abort = () => {};
const enqueue = (
  cb: (signal: AbortSignal) => Promise<Partial<Context>> | Partial<Context>,
) => {
  abort();

  loading.value = true;
  const controller = new AbortController();

  queue = queue.then(async () => {
    try {
      const { cart } = await cb(controller.signal);

      if (controller.signal.aborted) {
        throw { name: "AbortError" };
      }

      context.cart.value = { ...context.cart!.value, ...cart! };

      loading.value = false;
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error(error);
      loading.value = false;
    }
  });

  abort = () => controller.abort();

  return queue;
};

const load = async (signal: AbortSignal) => {
  const { cart } = await Runtime.invoke(
    {
      cart: {
        key: "deco-sites/persono/loaders/cart.ts",
      },
    },
    { signal },
  );

  return {
    cart,
  };
};

if (IS_BROWSER) {
  enqueue(load);

  document.addEventListener(
    "visibilitychange",
    () => document.visibilityState === "visible" && enqueue(load),
  );
}

export const state = {
  ...context,
  loading,
  enqueue,
};
