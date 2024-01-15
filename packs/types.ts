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
  discounts: string[];
  freebie: Freebie;
  childBags: string[];
  withDeliverySplit: boolean;
}

export interface Session {
  deviceId: string;
  bagId: string;
}

export interface Freebie {
  eligible: boolean;
  active: boolean;
  items: string[];
  drawerText: string;
  drawerImage: string;
  vmLink: string;
  subtotalToActivate: string;
  valueToReach: string;
  selectedFreebie: string;
}

interface Item {
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
interface Photos {
  still: string;
  semiEnvironment: string;
  environment: string;
  banner: Banner;
  details: Detail[];
  panoramics: string[];
}
interface Detail {
  url: string;
}
interface Banner {
  background?: boolean;
  foreground?: boolean;
  width: number;
  height: number;
}
interface Price {
  min: number;
  max: number;
}
interface Color {
  id: string;
  name: string;
  hex: string;
}
interface Segment {
  id: string;
  name: string;
}
interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface BagItems {
  sku: string;
  amount: number;
}
