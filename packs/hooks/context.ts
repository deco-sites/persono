import { IS_BROWSER } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { withManifest } from "deco/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";
import { Bag, User, UserInfo } from "$store/packs/types.ts";

interface Context {
  cart: Bag;
  user: UserInfo | null;
}

// @ts-ignore <IDK why this is wrong>
const Runtime = withManifest<Manifest>();
const loading = signal<boolean>(true);
const context = {
  cart: signal<Bag | undefined>(undefined),
  user: signal<User | undefined | null>(null),
};

interface EnqueueOptions {
  isInitialLoader?: boolean;
}

let queue = Promise.resolve();
let abort = () => {};
const enqueue = (
  cb: (signal: AbortSignal) => Promise<Partial<Context>> | Partial<Context>,
  options?: EnqueueOptions,
) => {
  abort();

  loading.value = true;
  const controller = new AbortController();

  queue = queue.then(async () => {
    try {
      const { cart, user } = await cb(controller.signal);

      if (controller.signal.aborted) {
        throw { name: "AbortError" };
      }

      context.cart.value = { ...context.cart!.value, ...cart! };

      // Updating user context just on initial load because the enqueue function
      // is used for modify the bag and no user is returned when this occurs
      if (options?.isInitialLoader) {
        context.user.value = user?.user;
      }

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
  const { cart, user } = await Runtime.invoke(
    {
      cart: {
        key: "deco-sites/persono/loaders/cart.ts",
      },
      user: {
        key: "deco-sites/persono/loaders/userInfo.ts",
      },
    },
    { signal },
  );

  return {
    cart,
    user,
  };
};

if (IS_BROWSER) {
  enqueue(load, { isInitialLoader: true });

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
