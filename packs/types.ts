export interface AmmoProduct {
  //Default
  brand: string;
  category: string;
  id: string;
  macroCategory: string;
  segment: string;
  title: string;
  cashback?: string;

  //Only from PDP props
  breadcrumbs?: Breadcrumb[] | [Breadcrumb[]];
  bundle?: Bundle;
  active?: boolean;
  description?: string;
  emotionalAttributes?: string[]; //unknown
  groupKey?: string;
  isActiveBundlePickupInStore?: boolean;
  line?: string;
  relatedFilters?: string[]; //unknown
  selectedSku?: string;
  sizeType?: string;
  skus?: Sku[];
  template?: string;

  //Only from PLP and PL props
  available?: boolean;
  hoverImage?: string;
  image?: string;
  price?: PriceList;
  size?: string;
  sku?: string;
  tags?: Tags;
  url?: string;
}

export interface Breadcrumb {
  name: string;
  path?: string;
  position: number;
  hasSibling?: boolean;
}

export interface Bundle {
  componentAmount: number;
  hasSingleComponent: boolean;
}

export interface Sku {
  available: boolean;
  color: Color;
  ean?: string;
  isActivePickupInStore: boolean;
  isBundle: boolean;
  isOutlisted: boolean;
  kitItems: KitItem[];
  photos: Photos;
  price: SkuPrice;
  size: string;
  sku: string;
  specifications: Specification[];
  stock: number;
  stocks: Stock[];
  tags: Tags;
  url: string;
  youtubeVideo?: string;
}

// HEAD
export interface KitItem {
  dimensions: string;
  name: string;
  quantity: string;
}

export interface SkuPrice {
  from: number;
  to: number;
}

export interface Specification {
  id: string;
  label: string;
  value: string;
}

export interface Stock {
  distributorId: string;
  stock: number;
}

export interface Tags {
  bottom?: TagProps;
  topLeft?: TagProps;
}

export interface TagProps {
  type: string;
  value?: string;
}

export interface PriceList {
  max: number;
  min: number;
  type: number;
}

export interface VMDetails {
  //RETURN OF AN ENDPOINT

  filtersOrdered: string[];
  basePath: string;
  meta: Meta;
  appliedFilters: string[]; //unknown
  headerColors: HeaderColors;
  productCards: AmmoProduct[];
  skusTotal: number;
  sidebar: Sidebar[];
  breadcrumbs: Breadcrumb[] | [Breadcrumb[]];
  miniVms: string[]; //unknown
}

export interface Meta {
  index: boolean;
  title: string;
  description: string;
  shareImageUrl?: string;
  header: string;
  sidebarText?: string;
  footerText?: string;
}

export interface HeaderColors {
  foregroundColor?: string;
  backgroundColorFrom?: string;
  backgroundColorTo?: string;
}

export interface Sidebar {
  filterType: string;
  filterLabel: string;
  valuePrefix?: string;
  values: Value[];
}

export interface Value {
  type: string;
  slug: string;
  value: string;
}

export interface Recommendations {
  //RETURN OF AN ENDPOINT
  data: Data;
  meta: Meta;
}

export interface Data {
  products: AmmoProduct[];
}

export interface ProductDetails {
  //RETURN OF AN ENDPOINT
  data: AmmoProduct;
  meta: Meta;
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
  price: PriceList;
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
interface Detail {
  url: string;
}
interface Banner {
  background?: boolean;
  foreground?: boolean;
  width: number;
  height: number;
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
