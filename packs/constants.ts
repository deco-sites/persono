import { SortOption } from "apps/commerce/types.ts";
export const SORT_OPTIONS: SortOption[] = [
  { value: "", label: "Recomendados" },
  { value: "discount_desc", label: "Maior desconto" },
  { value: "price_asc", label: "Menor preço" },
];
export const PROPS_AMMO_API = {
  product: {
    simpleProps: [
      "cashback",
      "segment",
      "macroCategory",
      "category",
      "size",
      "line",
      "sizeType",
      "isActiveBundlePickupInStore",
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

export const PRICE_TYPES = [
  "Default",
  "Range",
  "FromTo",
  "NOTUSEInstallments",
  "NOTUSEJust",
  "Unavailable",
  "PDP",
];
