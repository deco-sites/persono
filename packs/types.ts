export interface AmmoProduct {
  //TODO: TYPE AMMA PRODUCT API
  name: string;
}

export interface Bag {
  id: string;
  address: string;
  billingAddress: string;
  paymentMethods: string;
  isGift: boolean;
  giftLetter: string;
  giftRecipient: string;
  hasOmsFreeShippingDiscount: boolean;
  useCredit: boolean;
  serverTime: string;
  items: Item[];
  subtotal: number;
  total: number;
  discounts: Discount[];
  coupon: string;
  freebie: Freebie;
  childBags: unknown[];
  withDeliverySplit: boolean;
}

export interface Discount {
  type: string;
  message: string;
  value: number;
  items?: DiscountItem[];
}

export interface DiscountItem {
  amount: number;
  id: string;
  title: string;
  value: number;
}

export interface Session {
  deviceId: string;
  bagId: string;
}

export interface Freebie {
  eligible: boolean;
  active: boolean;
  items: FreebieItem[];
  drawerText: string | null;
  drawerImage: string;
  vmLink: string;
  subtotalToActivate: number;
  valueToReach: number;
  selectedFreebie: string;
}

export interface FreebieItem {
  title: string;
  image: string;
  drawerText: string;
  sku: string;
  vmLink: string;
}

export interface Item {
  id: string;
  productId: string;
  sku: string;
  available: boolean;
  stock: number;
  amount: number;
  title: string;
  line: string;
  brand: Brand;
  segment: Segment;
  macroCategory: Segment;
  category: Segment;
  color: Color;
  photoStill: string;
  price: Price;
  size: string;
  groupKey: string;
  hasExchangeItem: boolean;
  isSurpriseBonusActivator: boolean;
  isSurpriseBonusGenerator: boolean;
  lockedAmountForSurpriseBonus?: boolean;
  hasChargeback: boolean;
  creditInvoice?: boolean;
  hasStockOnlyOnStores: boolean;
  url: string;
  isFreebie: boolean;
  ean: string;
  isRemoved: boolean;
  isEditedAfterPurchase: boolean;
  amsUserId?: boolean;
  hasAllocationProblem: boolean;
  cashback?: boolean;
  photos: Photos;
}
export interface Photos {
  still: string;
  semiEnvironment: string;
  environment: string;
  banner: Banner;
  details: Detail[];
  panoramics: string[];
}
export interface Detail {
  url: string;
}
export interface Banner {
  background?: boolean;
  foreground?: boolean;
  width: number;
  height: number;
}
export interface Price {
  min: number;
  max: number;
}
export interface Color {
  id: string;
  name: string;
  hex: string;
}
export interface Segment {
  id: string;
  name: string;
}
export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface BagItems {
  sku: string;
  amount: number;
}
