import {
  AggregateOffer,
  BreadcrumbList,
  ImageObject,
  ListItem,
  Offer,
  Product,
  ProductGroup,
  ProductLeaf,
  ProductListingPage,
} from "apps/commerce/types.ts";

import { AmmoProduct, Breadcrumb, Sku, VMDetails } from "$store/packs/types.ts";

interface ProductListingPageProps {
  vmDetails: VMDetails;
  url: URL;
}

interface WorkableAttributes {
  images: ImageObject[];
  gtin?: string;
  isVariantOf?: ProductGroup;
  productUrl: string;
  offers: AggregateOffer;
}

interface ToVariantProps {
  sku: Sku;
  baseUrl: URL;
  category: string;
  title: string;
}

interface ToOfferProps {
  price: {
    max: number;
    min: number;
  };
  stock?: number;
  available: boolean;
}

export function toProduct(
  ammoProduct: AmmoProduct,
  baseUrl: URL,
): Product {
  const { skus, selectedSku, title, category } = ammoProduct;
  const workableSku = skus?.find(({ sku }) => sku === selectedSku);
  const workableUrl =
    new URL(workableSku?.url ?? ammoProduct.url!, baseUrl.origin).href;

  //If it have an workable SKU, so its a PDP!
  const { images, gtin, productUrl, isVariantOf, offers }: WorkableAttributes =
    workableSku
      ? {
        images: pickSkuImages(workableSku!, title),
        gtin: workableSku!.ean,
        productUrl: workableUrl,
        isVariantOf: {
          "@type": "ProductGroup" as const,
          productGroupID: ammoProduct.groupKey!,
          name: title,
          url: workableUrl,
          model: workableSku!.ean,
          hasVariant: skus!.map((sku) =>
            toVariant({ sku, baseUrl, category, title })
          ),
          //TODO - SKU additional properties
          additionalProperty: [],
        },
        offers: toSkuAggregateOffer(workableSku!),
      }
      : {
        images: pickProductImages(ammoProduct),
        productUrl: workableUrl,
        offers: toProductAggregateOffer(ammoProduct),
      };

  return {
    "@type": "Product",
    productID: ammoProduct.id,
    name: title,
    description: ammoProduct?.description,
    sku: ammoProduct?.sku ?? selectedSku!,
    image: images,
    gtin: gtin,
    url: productUrl,
    //TODO - Product Additional Properties
    additionalProperty: [],
    brand: {
      "@type": "Brand",
      "@id": ammoProduct.brand,
    },
    category: category ?? ammoProduct.macroCategory,
    inProductGroupWithID: ammoProduct?.groupKey,
    isVariantOf,
    offers,
  };
}

export function toProductListingPage(
  { vmDetails, url }: ProductListingPageProps,
): ProductListingPage {
  const { productCards } = vmDetails;
  return {
    "@type": "ProductListingPage",
    breadcrumb: toBreadcrumbList(url.origin, vmDetails),
    //TODO: PLP filters
    filters: [],
    products: productCards.map((p) => toProduct(p, url)),
    //TODO: PLP pagination
    pageInfo: {
      currentPage: 1,
      nextPage: "",
      previousPage: "",
    },
    //TODO: PLP sort options
    sortOptions: [],
  };
}

const toBreadcrumbList = (
  origin: string,
  { breadcrumbs }: VMDetails,
): BreadcrumbList => {
  const itemListElement = toItemListElement(breadcrumbs, origin);
  return {
    "@type": "BreadcrumbList",
    itemListElement,
    numberOfItems: itemListElement.length,
  };
};

const toItemListElement = (
  breadcrumbs: Breadcrumb[] | [Breadcrumb[]],
  origin: string,
): ListItem[] =>
  breadcrumbs.flat(1).reduce<ListItem[]>(
    (acc, { path, name, position, hasSibling }) => {
      const item = path ? new URL(new URL(path).pathname, origin).href : "";
      const newItem: ListItem = {
        "@type": "ListItem" as const,
        name,
        item,
        position,
        additionalType: hasSibling ? "hasSibling" : undefined,
      };
      return [
        ...acc,
        newItem,
      ];
    },
    [],
  );

const pickSkuImages = (
  { photos, youtubeVideo }: Sku,
  name: string,
): ImageObject[] => [
  {
    "@type": "ImageObject" as const,
    url: photos.still,
    additionalType: "image",
    alternateName: name,
    disambiguatingDescription: "still",
  },
  {
    "@type": "ImageObject" as const,
    url: photos.semiEnvironment,
    additionalType: "image",
    alternateName: name,
    disambiguatingDescription: "semiEnvironment",
  },
  ...photos.details.map(({ url }, i) => ({
    "@type": "ImageObject" as const,
    url,
    additionalType: "image",
    alternateName: name,
    disambiguatingDescription: `detail-${i}`,
  })),
  ...youtubeVideo
    ? [{
      "@type": "ImageObject" as const,
      url: `https://www.youtube.com/watch?v=${youtubeVideo}`,
      additionalType: "video",
      alternateName: name,
      disambiguatingDescription: `video`,
    }]
    : [],
];

const pickProductImages = (
  { image, hoverImage, title }: AmmoProduct,
): ImageObject[] => [{
  "@type": "ImageObject" as const,
  url: `${image}`,
  alternateName: title,
  additionalType: "image",
  disambiguatingDescription: "main",
}, {
  "@type": "ImageObject" as const,
  url: `${hoverImage}`,
  alternateName: title,
  additionalType: "image",
  disambiguatingDescription: "hover",
}];

const toVariant = (
  { sku, category, title, baseUrl }: ToVariantProps,
): ProductLeaf => ({
  "@type": "Product" as const,
  category,
  url: new URL(sku!.url, baseUrl.origin).href,
  sku: sku.sku,
  productID: sku.sku,
  additionalProperty: [],
  image: pickSkuImages(sku, title),
  offers: toSkuAggregateOffer(sku),
});

const toSkuAggregateOffer = (
  { price, stock, available }: Sku,
): AggregateOffer => {
  const { from, to } = price;
  const max = from / 100;
  const min = to / 100;
  return {
    "@type": "AggregateOffer",
    highPrice: max,
    lowPrice: min,
    offerCount: 1,
    priceCurrency: "BRL",
    offers: [
      toOffer({
        price: { max, min },
        stock,
        available,
      }),
    ],
  };
};

const toProductAggregateOffer = (
  { price, available }: AmmoProduct,
): AggregateOffer => {
  const { max, min } = price!;
  const highPrice = max / 100;
  const lowPrice = min / 100;
  return {
    "@type": "AggregateOffer",
    highPrice,
    lowPrice,
    offerCount: 1,
    priceCurrency: "BRL",
    offers: [
      toOffer({
        price: {
          max: highPrice,
          min: lowPrice,
        },
        available: available!,
      }),
    ],
  };
};

const toOffer = ({ price, stock, available }: ToOfferProps): Offer => ({
  "@type": "Offer",
  availability: available
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock",
  inventoryLevel: { value: stock },
  price: price.min ?? price.max,
  //TODO: define installments ranges
  priceSpecification: [],
});
