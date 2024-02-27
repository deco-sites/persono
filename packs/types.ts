import { Props as SiteProps } from "$store/apps/site.ts";
import { FnContext as DefaultFnContext } from "deco/types.ts";

export interface CookieNames {
  ammoDeviceIdCookie: string;
  ammoTokenCookie: string;
  timestampCookie: string;
}

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
  emotionalAttributes?: EmotionalAttributes[];
  groupKey?: string;
  isActiveBundlePickupInStore?: boolean;
  line?: string;
  relatedFilters?: RelatedFilters;
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

export interface EmotionalAttributes {
  id: string;
  name: string;
  value: string;
}

export interface RelatedFilters {
  color: LinkAndLabel[];
  size: LinkAndLabel[];
  category: LinkAndLabel[];
}

export interface LinkAndLabel {
  link: string;
  label: string;
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
  custom?: TagProps;
}

export interface TagProps {
  type: string;
  value?: string;
  color?: string;
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
  appliedFilters: Value[];
  headerColors: HeaderColors;
  productCards: AmmoProduct[];
  skusTotal: number;
  sidebar: Sidebar[];
  breadcrumbs: Breadcrumb[] | [Breadcrumb[]];
  miniVms: string[]; //unknown
}

export interface VMDetailsRedirect {
  //RETURN OF AN ENDPOINT
  type: "redirect";
  location: string;
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
  discounts: Discount[];
  coupon: string;
  freebies: Freebie;
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
export interface Detail {
  url: string;
}
export interface Banner {
  background?: boolean;
  foreground?: boolean;
  width: number;
  height: number;
}
// HEAD
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

export interface Config {
  freeShipping: number;
  maxInstallments: number;
  minInstallmentValue: number;
  postalCodeLength: number;
  couponLength: number;
  creditCardNumberLength: number;
  creditCardCvvMinLength: number;
  searchPageLimit: number;
  searchItemsPerPage: number;
  vmItemsPerPage: number;
  searchAutoloadScrollThreshold: number;
  menuMaxCategories: number;
  productMaxAmount: number;
  wrHeadlineMaxLength: number;
  wrDashboardVmMaxItems: number;
  userActivityInterval: number;
  sellerIds: SellerIds;
  bucketUrl: string;
  searchTypeLabels: SearchTypeLabels;
  paymentMethodTypes: PaymentMethodTypes;
  priceFormats: PriceFormats;
  sizeTypes: SizeTypes;
  productSegmentIds: ProductSegmentIds;
  bedSizeValues: BedSizeValues;
  companyRegistrationExempt: string;
  homeComponentTypes: HomeComponentTypes;
  wrItemStatuses: WrItemStatuses;
  loggedUserTypes: LoggedUserTypes;
  resolveRouteIncludeTypes: ResolveRouteIncludeTypes;
  bagDiscountTypes: BagDiscountTypes;
  vmBannerTypes: VmBannerTypes;
  bagDrawerDiscounts: string[];
  userPingDefaults: UserPingDefaults;
  seller: Seller;
  features: Features;
  fbAppId: string;
  googleApiKey: string;
  birthdayDiscountBigBanner: BirthdayDiscountBigBanner;
  birthdayDiscountVmBanner: BirthdayDiscountVmBanner;
  searchTypes: SearchType[];
  opportunityTags: OpportunityTag[];
  contactSubjectTypes: ContactSubjectTypes;
  productAttributeIds: string[];
  surpriseBonus: SurpriseBonus;
  allProductsVm: string;
  collectionToApplyOpportunityTag: string;
  discountOpportunity: DiscountOpportunity;
  googleAuthenticationCredentials: GoogleAuthenticationCredentials;
  opennpsUrl: string;
  recaptchaShared: RecaptchaShared;
  orderReturns: OrderReturns;
  personoPdpRelease: PersonoPdpRelease;
  personoDtexPdpRelease: PersonoDtexPdpRelease;
  personoSupportFirmPdpRelease: PersonoSupportFirmPdpRelease;
  personoSupportMediumPdpRelease: PersonoSupportMediumPdpRelease;
  personoNasaPdpRelease: PersonoNasaPdpRelease;
  personoAdaptPdpRelease: PersonoAdaptPdpRelease;
  inviteCampaign: InviteCampaign;
  occasions: Occasions;
}

export interface SellerIds {
  mmartan: string;
  artex: string;
}

export interface SearchTypeLabels {
  product: string;
  weddingRegistry: string;
}

export interface PaymentMethodTypes {
  creditCard: string;
  slip: string;
}

export interface PriceFormats {
  range: string;
  single: string;
  simple: string;
}

export interface SizeTypes {
  bed: string;
}

export interface ProductSegmentIds {
  bed: string;
}

export interface BedSizeValues {
  twin: string;
  twinXl: string;
  twinKing: string;
  double: string;
  queen: string;
  king: string;
  kid: string;
}

export interface HomeComponentTypes {
  bigBanner: string;
  doubleBanner: string;
  vm: string;
  pillar: string;
  categorySlider: string;
  mosaic: string;
}

export interface WrItemStatuses {
  unavailable: string;
  availableForPurchase: string;
  purchasedStore: string;
  shipped: string;
  awaitingShipment: string;
  awaitingPayment: string;
}

export interface LoggedUserTypes {
  oms: string;
}

export interface ResolveRouteIncludeTypes {
  data: string;
  pageInfo: string;
}

export interface BagDiscountTypes {
  omsFreeShipping: string;
  paymentSlip: string;
  coupon: string;
}

export interface VmBannerTypes {
  top: string;
  bottom: string;
}

export interface UserPingDefaults {
  "google.com": SocialMedia;
  "facebook.com": SocialMedia;
  "instagram.com": SocialMedia;
}

export interface SocialMedia {
  utmSource: string;
  utmMedium: string;
}
export interface Seller {
  id: string;
  title: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
}

export interface Features {
  giftCard: boolean;
  bedSizeGuide: boolean;
  illustrations: boolean;
  productCardDescription: boolean;
  productCardAttributes: boolean;
  npsPurchase: boolean;
  surpriseBonus: boolean;
  memberGetMember: boolean;
  outlookShare: boolean;
  googleShare: boolean;
  footerPaymentMethodsWithSlip: boolean;
  menuWithLabels: boolean;
  glossary: boolean;
  pickupInStore: boolean;
  billingAddress: boolean;
  casacor: boolean;
  newsletter: boolean;
  newsletterFixed: boolean;
  newsletterModal: boolean;
  inspirationLinkInHeader: boolean;
  mgmTagInHeader: boolean;
  bfTagInHeaderLink: string;
  relatedFiltersOnPDP: boolean;
  neoAssistForm: boolean;
  architectsRouteEnabled: boolean;
  eventStreamEnabled: boolean;
  newsletterFirstPurchaseCoupon: NewsletterFirstPurchaseCoupon;
  getBagCall: boolean;
  signUp: SignUp;
  newsletterFirstPurchaseCouponOptions: NewsletterFirstPurchaseCouponOptions;
  giftMessage: boolean;
  whatsappOptinEnabled: boolean;
  hideSellerPhone: boolean;
  showWhatsapp: boolean;
  newWebTreeEnabled: boolean;
  loyaltyProgram: LoyaltyProgram;
  blackFriday: BlackFriday;
  freeShippingCampaigns: FreeShippingCampaign[];
  SEO: Seo;
  showWhatsappHeadline: boolean;
  omniCampaigns: OmniCampaigns;
  freeShippingOutlist: FreeShippingOutlist;
}

export interface NewsletterFirstPurchaseCoupon {
  enabled: boolean;
}

export interface SignUp {
  allowSignUpWithCpfOrCnpj: boolean;
  mainDocumentType: string;
}

export interface NewsletterFirstPurchaseCouponOptions {
  popupCloseIconColor: string;
  emailPopup: PopupContent;
  successSubscriptionPopup: PopupContent;
  newsletterBar: NewsletterBar;
}

export interface PopupContent {
  desktopImage: string;
  mobileImage: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  inputBackgroundColor: string;
  inputTextColor: string;
}

export interface NewsletterBar {
  desktopImage: string;
  mobileImage: string;
  backgroundColor: string;
  isCloseButtonExpanded: boolean;
  closeIconColor: string;
}

export interface LoyaltyProgram {
  loyaltyProgramEnabled: boolean;
  defaultCashbackValue: number;
  creditExpirationInDays: number;
  minimumHoursForCreditRelease: number;
  memberGetMemberCampaign: MemberGetMemberCampaign;
  cashbackOrderPercentageLimit: number;
  featureCancelCreditInRefund: boolean;
  emailReminderInDays: number;
  activeTransactionalEmails: string[];
  description: string;
  minAvailableDate: string;
}

export interface MemberGetMemberCampaign {
  referrerBonus: number;
  benefitType: string;
  benefitValue: number;
  minOrderValue: number;
  validTo: string;
}

export interface BlackFriday {
  blackFridayDate: string;
}

export interface FreeShippingCampaign {
  minBagValue: number;
  shippingMethodName: string;
  appliableShippingCategories: string[];
}

export interface Seo {
  dynamicRendering: DynamicRendering;
  arborescence: Arborescence;
}

export interface DynamicRendering {
  active: boolean;
  enabledOnlyForSpecificSku: boolean;
  skus: string[];
  ips: string[];
  userAgents: string[];
}

export interface Arborescence {
  availableForMigration: string[];
}

export interface OmniCampaigns {
  active: boolean;
  enabledCampaignTypes: string[];
}

export interface FreeShippingOutlist {
  outlist: string[];
  isEnabled: boolean;
  checkoutText: string;
  showBagConditionsText: boolean;
}

export interface BirthdayDiscountBigBanner {
  id: string;
  images: Images;
  callToAction: CallToAction;
}

export interface Images {
  small: Image;
  large: Image;
}

export interface CallToAction {
  text: string;
  link: Link;
}

export interface Link {
  type: string;
  url: string;
  presentation: string;
  name: string;
  _target: string;
}

export interface BirthdayDiscountVmBanner {
  images: Images;
  title: string;
}

export interface SearchType {
  type: string;
  title: string;
  placeholder: string;
}

export interface OpportunityTag {
  id: string;
  color: string;
  priority: number;
}

export interface ContactSubjectTypes {
  question: string;
  compliment: string;
  complaint: string;
  franchisee: string;
  bugReport: string;
}

export interface SurpriseBonus {
  startDate: string;
  endDate: string;
  bonusType: string;
  bonusValue: number;
  activationType: string;
  activationValue: number;
}

export interface DiscountOpportunity {
  mask: Mask;
  cutValue: number;
  minDiscountValue: number;
}

export interface Mask {
  single: Single;
  range: Range;
}

export interface Single {
  exact: string;
  rounded: string;
}

export interface Range {
  exact: string;
  "rounded-start-end": string;
  "rounded-start": string;
  "rounded-end": string;
}

export interface GoogleAuthenticationCredentials {
  clientId: string;
}

export interface RecaptchaShared {
  siteKey: string;
  enabled: boolean;
}

export interface OrderReturns {
  isFeatureEnabled: boolean;
  eligibleDays: number;
  showOrderAfterRequestedDays: number;
  requiredPictureReasons: string[];
  requiredObservationReasons: string[];
  reasons: Reasons;
  deadlineForContactingInDays: number;
  isUserDataFormEnabled: boolean;
}

export interface Reasons {
  abandonment: string;
  malfunction: string;
  broken: string;
  misleading_ad: string;
  dissatisfaction: string;
  did_not_purchase: string;
  purchased_wrong_prodct: string;
  others: string;
}

export interface PersonoPdpRelease {
  waitingListReleaseDate: string;
  saleReleaseDate: string;
  saleEndDate: string;
  sku: string;
  showBeforeWaitingListReleaseDate: boolean;
  packs: string[];
  content: Content;
}

export interface PersonoDtexPdpRelease {
  waitingListReleaseDate: string;
  saleReleaseDate: string;
  saleEndDate: string;
  sku: string;
  showBeforeWaitingListReleaseDate: boolean;
  packs: string[];
  content: Content;
}

export interface Content {
  presentation: Presentation;
  quotes: Quotes;
  detail: Detail;
  differentials: Differentials;
  aboutSleep: AboutSleep;
  package: Package;
  technicalSpecs: TechnicalSpecs;
  faq: Faq;
  warranty: Warranty;
  social: Social;
}

export interface Presentation {
  subtitle: string;
  title: string;
  sections: Section[];
}

export interface Section {
  key: string;
  dir: string;
  image: ImageInfo;
  title: Title;
  description: Description;
  group?: Group;
  download?: Download;
}

export interface Title {
  text: string;
  icon?: string;
  subtitle?: string;
}

export interface Description {
  text?: string;
  mt: number;
}

export interface Group {
  direction: string;
  fixWidth: boolean;
  items: Item[];
}

export interface Item {
  key: string;
  icon: string;
  width: number;
  title: string;
}

export interface Download {
  text: string;
  items: Item[];
}

export interface Quotes {
  title: string;
  items: QuoteItem[];
}

export interface QuoteItem {
  stars: number;
  text: string;
  name: string;
  achievements: number;
  label: string;
}

export interface Detail {
  title: string;
  items: DetailItem[];
}

export interface DetailItem {
  isLtr: boolean;
  showMask: boolean;
  showFullVideo: boolean;
  title: string;
  description: string;
  image: ImageInfo;
  desktopText?: DesktopText;
  ml?: number;
  list?: string[];
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface ImageInfo {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
  mr: number;
  hasMobile: boolean;
  domain: string;
}

export interface DesktopText {
  title?: string;
  image: ImageInfo;
  description?: string;
}

export interface Differentials {
  title: string;
  items: DifferentialItem[];
}

export interface DifferentialItem {
  title: string;
  persono: boolean;
  other_apps: boolean;
}

export interface AboutSleep {
  title: string;
  description: string;
  items: AboutSleepItem[];
}

export interface AboutSleepItem {
  key: string;
  icon: string;
  title: string;
  description: string;
}

export interface Package {
  title: string;
  items: PackageItem[];
}

export interface PackageItem {
  key: number;
  title: string;
  quantity: number;
}

export interface TechnicalSpecs {
  title: string;
  items: TechnicalSpecsItem[];
}

export interface TechnicalSpecsItem {
  key: string;
  title: string;
  items: TechnicalSpecItem[];
}

export interface TechnicalSpecItem {
  key: string;
  title: string;
  description: string;
}

export interface Faq {
  title: string;
  items: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Warranty {
  key: string;
  icon: string;
  title: string;
  description: string;
}

export interface Social {
  key: string;
  icon: string;
  title: string;
  description: string;
  items: SocialItem[];
}

export interface SocialItem {
  key: string;
  title: string;
  link: Link;
  icon: string;
}

export interface PersonoSupportFirmPdpRelease {
  waitingListReleaseDate: string;
  saleReleaseDate: string;
  saleEndDate: string;
  sku: string;
  showBeforeWaitingListReleaseDate: boolean;
}

export interface PersonoSupportMediumPdpRelease {
  waitingListReleaseDate: string;
  saleReleaseDate: string;
  saleEndDate: string;
  sku: string;
  showBeforeWaitingListReleaseDate: boolean;
}

export interface PersonoNasaPdpRelease {
  waitingListReleaseDate: string;
  saleReleaseDate: string;
  saleEndDate: string;
  sku: string;
  showBeforeWaitingListReleaseDate: boolean;
  packs: string[];
  content: Content;
}

export interface PersonoAdaptPdpRelease {
  waitingListReleaseDate: string;
  saleReleaseDate: string;
  saleEndDate: string;
  sku: string;
  showBeforeWaitingListReleaseDate: boolean;
  packs: string[];
  content: Content;
}

export interface InviteCampaign {
  id: string;
  hash: string;
  inviterCredit: number;
  formattedInviterCredit: string;
  inviteeDiscount: number;
  formattedInviteeDiscount: string;
  minInviteeBagTotal: number;
  formattedMinInviteeBagTotal: string;
  twitterShareText: string;
  whatsappShareText: string;
  termsUrl: string;
  expiresAt: string;
  createdAt: string;
}

export interface Occasions {
  blackFriday: Duration;
  blackFridayFinalDays: Duration;
  christmas: Duration;
}

export interface Duration {
  start: string;
  end: string;
}

export interface ShippingSimulation {
  addressForPostalCode: AddressForPostalCode;
  shippingOptions: ShippingOption[];
  Bag: Bag;
}

export interface AddressForPostalCode {
  postalCode: string;
  state: string;
  cityId: number;
  city: string;
  district: string;
  address: string;
  createdAt: string;
  deletedAt: string;
}

export interface ShippingOption {
  shippingMethod: ShippingMethod;
  cost: number;
  businessDaysUntilDelivery: number;
  minBusinessDaysUntilDelivery: number;
  maxBusinessDaysUntilDelivery: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  icon: string;
  group: string;
  site: string;
  idERP: number;
  category: string;
  active: boolean;
}

export interface UserInfo {
  user: User;
  lifeTimeValue: number;
  token: string;
  birthdayDiscountPeriod: BirthdayDiscountPeriod;
}

export interface User {
  id: string;
  crossSiteUserId: string;
  name: string;
  email: string;
  optin: boolean;
  whatsappOptin: boolean;
  phone: string;
  phoneOptional: string;
  cpf: string;
  cnpj: string;
  municipalRegistration: string;
  stateRegistration: string;
  legalRepresentative: string;
  birthDateYear: number;
  birthDateMonth: number;
  birthDateDay: number;
  birthDate: string;
  profilePicture: string;
  gender: string;
  weddingRegistry: string;
  hasPassword: boolean;
  group: string;
  site: string;
  inviterCoupon: string;
  inviteeCoupon: string;
  salesman: string;
  addresses: string;
  loyaltyProgramMemberSince: string;
}

export interface BirthdayDiscountPeriod {
  isEligible: boolean;
  startAt: string;
  endAt: string;
  nextPeriodAt: string;
}

export type FnCustomContext = SiteProps & DefaultFnContext;
export interface InstallmentConfig {
  maxInstallments: number;
  minInstallmentValue: number;
}
export interface VinhedoSku {
  type: string;
  label: string;
  total: number;
  productItems: ProductItem[];
  weddingItems: string[];
  productCards: ProductCard[];
}

export interface ProductItem {
  bundle: string;
  ERPTitle: string;
  active: boolean;
  available: boolean;
  brand: BrandItem;
  rawCategory: string;
  collection: string;
  color: string;
  description: string;
  details: string;
  ean: string;
  group: string;
  groupKey: string;
  hasRequiredData: boolean;
  height: number;
  hex: string;
  isBundle: boolean;
  isBlackFridayPromoItem: boolean;
  isNewRelease: boolean;
  keywords: string;
  kitItems: KitItem[];
  length: number;
  lineName: string;
  macroCategory: string;
  rawMacroCategory: string;
  stock: number;
  occasion: string;
  origin: string;
  dataOwner: string;
  priceOwner: string;
  outlet: boolean;
  photo180: string;
  photoBannerBG: string;
  photoBannerFG: string;
  photoDetails: string;
  photoSemiEnvironment: string;
  photoStill: string;
  priceFrom: number;
  priceTo: number;
  productId: string;
  profile: string;
  season: string;
  segment: string;
  rawSegment: string;
  site: string;
  sku: string;
  technicalFile: string;
  title: string;
  touch: string;
  unitOfMeasurement: string;
  virtual: boolean;
  weight: number;
  grossWeight: number;
  width: number;
  youtubeVideo: string;
  isActivePickupInStore: boolean;
  template: string;
  cashback: string;
  isOutlisted: boolean;
  customTagValue: string;
  customTagColor: string;
  attributes: Attributes;
  bedSize: string;
  stocks: Stock[];
}

export interface BrandItem {
  id: number;
  initials: string;
  name: string;
  shortName: string;
  description: string;
  logo: string;
  group: string;
  site: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface KitItem {
  name: string;
  quantity: string;
  dimensions: string;
}

export interface Attributes {
  baseColor: string;
  brandName: string;
  category: string;
  gender: string;
  curtainLength: string;
  curtainLuminosity: string;
  curtainSize: string;
  curtainType: string;
  isPromotion: boolean;
  line: string;
  size: string;
  sizeType: string;
  fabric: string;
  finishing: string;
  composition: string;
  threads: string;
}

export interface Stock {
  distributorId: string;
  stock: number;
}

export interface ProductCard {
  id: string;
  url: string;
  title: string;
  sku: string;
  size: string;
  brand: string;
  segment: string;
  macroCategory: string;
  category: string;
  image: string;
  hoverImage: string;
  price: Price;
  cashback: string;
  tags: Tags;
  available: boolean;
}

export interface Price {
  min: number;
  max: number;
  type: number;
}

export interface AutoComplete {
  data: Term[];
}

export interface Term {
  term: string;
}

export interface SkuSubscribe {
  data: SkuSubscribeData;
}

export interface SkuSubscribeData {
  id: string;
  sku: string;
  email: string;
  group: string;
  site: string;
  updatedAt: string;
  createdAt: string;
}

export interface Newsleter {
  data: NewsletterData;
}

export interface NewsletterData {
  id: string;
  email: string;
  newsletterCouponCode: string;
}

export interface VMFilters {
  /**
   * @title Tipo
   * @example category
   */
  type: string;
  /**
   * @title Slugs do filtro
   */
  slugs: string[];
}
