import { DecoRequestInit } from "apps/utils/fetch.ts";

export const AMMO_DEVICE_ID_HEADER = "X-Ammo-Device-Id";
export const AMMO_TOKEN_HEADER = "X-Ammo-Token";
export const DECO_CACHE_OPTION = {
  cache: "stale-while-revalidate",
} as DecoRequestInit["deco"];

export const PROPS_AMMO_API = {
  product: {
    simpleProperties: [
      "cashback",
      "segment",
      "size",
      "line",
      "sizeType",
      "isActiveBundlePickupInStore",
      "macroCategory",
    ],
    defaultPhotos: [
      "image",
      "hoverImage",
    ],
    complexProperties: [
      "tags",
      "bundle",
      "relatedFilters",
      "emotionalAttributes"
    ]
  },
  sku: {
    simpleProperties: [
      "size",
    ],
    defaultPhotos: [
      "still",
      "semiEnvironment",
    ],
    complexProperties: [
      "color",
      "tags",
      "kitItems",
    ]
  },
};
