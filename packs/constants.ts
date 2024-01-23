export const AMMO_DEVICE_ID_HEADER = "X-Ammo-Device-Id";
export const AMMO_TOKEN_HEADER = "X-Ammo-Token";

export const PROPS_AMMO_API = {
  product: {
    simpleProps: [
      "cashback",
      "segment",
      "size",
      "line",
      "sizeType",
      "isActiveBundlePickupInStore",
      "macroCategory",
      "template",
    ],
    defaultPhotos: [
      "image",
      "hoverImage",
    ],
    simpleArrayProps: [
      "relatedFilters",
      "emotionalAttributes",
    ],
  },
  sku: {
    simpleProps: [
      "size",
    ],
    defaultPhotos: [
      "still",
      "semiEnvironment",
    ],
  },
};
