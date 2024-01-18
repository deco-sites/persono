import { DecoRequestInit } from "apps/utils/fetch.ts";

export const AMMO_DEVICE_ID_HEADER = "X-Ammo-Device-Id";
export const AMMO_TOKEN_HEADER = "X-Ammo-Token";
export const DECO_CACHE_OPTION = {
  cache: "stale-while-revalidate",
} as DecoRequestInit["deco"];

export const SIMPLE_PRODUCT_PROPERTIES = [
  "cashback",
  "segment",
  "size",
  "line",
  "sizeType",
  "isActiveBundlePickupInStore",
  "macroCategory"
];

export const SIMPLE_SKU_PROPERTIES = [
  "size",
];

export const SKU_DEFAULT_PHOTOS = [
    "still",
    "semiEnvironment"
]

export const PRODUCT_DEFAULT_PHOTOS = [
    "image",
    "hoverImage"
]