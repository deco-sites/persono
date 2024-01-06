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
  breadcrumbs?: Breadcrumb[];
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
  price: Price;
  size: string;
  sku: string;
  specifications: Specification[];
  stock: number;
  stocks: Stock[];
  tags: Tags;
  url: string;
  youtubeVideo?: string;
}

export interface Color {
  hex: string;
  id: string;
  name: string;
}

export interface KitItem {
  dimensions: string;
  name: string;
  quantity: string;
}

export interface Photos {
  banner: Banner;
  details: Detail[];
  panoramics: string[]; //unknown
  semiEnvironment: string;
  still: string;
}

export interface Banner {
  background?: string;
  foreground?: string;
  height: number;
  width: number;
}

export interface Detail {
  url: string;
}

export interface Price {
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


