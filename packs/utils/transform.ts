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

interface SkuAndProduct {
  sku?: Sku;
  ammoProduct: AmmoProduct;
}

interface VariantProps extends Omit<SkuAndProduct, "sku"> {
  sku: Sku;
  baseUrl: URL;
}

interface AggregateOfferProps extends Omit<SkuAndProduct, "ammoProduct"> {
  ammoProduct?: AmmoProduct;
}

interface ToOfferProps {
  price: {
    highPrice: number;
    lowPrice: number;
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

  return {
    "@type": "Product",
    productID: ammoProduct.id,
    name: title,
    description: ammoProduct?.description,
    sku: ammoProduct?.sku ?? selectedSku!,
    image: toImage({ sku: workableSku, ammoProduct }),
    gtin: workableSku?.ean,
    url: new URL(workableSku?.url ?? ammoProduct.url!, baseUrl.origin).href,
    //TODO - Product Additional Properties
    additionalProperty: [],
    brand: {
      "@type": "Brand",
      "@id": ammoProduct.brand,
    },
    category: category ?? ammoProduct.macroCategory,
    inProductGroupWithID: ammoProduct?.groupKey,
    isVariantOf: workableSku
      ? toProductGroup({ ammoProduct, sku: workableSku, baseUrl })
      : undefined,
    offers: toAggregateOffer({ ammoProduct, sku: workableSku }),
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

const toImage = ({ sku, ammoProduct }: SkuAndProduct): ImageObject[] => {
  const { title, hoverImage } = ammoProduct;
  return sku
    ? [
      {
        "@type": "ImageObject" as const,
        url: sku.photos.still,
        additionalType: "image",
        alternateName: title,
        disambiguatingDescription: "still",
      },
      {
        "@type": "ImageObject" as const,
        url: sku.photos.semiEnvironment,
        additionalType: "image",
        alternateName: title,
        disambiguatingDescription: "semiEnvironment",
      },
      ...sku.photos.details.map(({ url }, i) => ({
        "@type": "ImageObject" as const,
        url,
        additionalType: "image",
        alternateName: title,
        disambiguatingDescription: `detail-${i}`,
      })),
      ...sku.youtubeVideo
        ? [{
          "@type": "ImageObject" as const,
          url: `https://www.youtube.com/watch?v=${sku.youtubeVideo}`,
          additionalType: "video",
          alternateName: title,
          disambiguatingDescription: `video`,
        }]
        : [],
    ]
    : [{
      "@type": "ImageObject" as const,
      url: `${ammoProduct.image}`,
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
};

const toProductGroup = (
  { ammoProduct, sku, baseUrl }: VariantProps,
): ProductGroup => {
  const { title, skus } = ammoProduct;
  const url = new URL(sku.url, baseUrl.origin).href;
  return {
    "@type": "ProductGroup" as const,
    productGroupID: ammoProduct.groupKey!,
    name: title,
    url,
    model: sku.ean,
    hasVariant: skus!.map((thisSku) =>
      toVariant({ sku: thisSku, baseUrl, ammoProduct })
    ),
    //TODO - SKU additional properties
    additionalProperty: [],
  };
};

const toVariant = (
  { sku, ammoProduct, baseUrl }: VariantProps,
): ProductLeaf => ({
  "@type": "Product" as const,
  category: ammoProduct.category,
  url: new URL(sku.url, baseUrl.origin).href,
  sku: sku.sku,
  productID: sku.sku,
  additionalProperty: [],
  image: toImage({ sku, ammoProduct }),
  offers: toAggregateOffer({ sku }),
});

const toAggregateOffer = (
  { ammoProduct, sku }: AggregateOfferProps,
): AggregateOffer => {
  const highPrice = (ammoProduct?.price?.max ?? sku!.price.from) / 100;
  const lowPrice = (ammoProduct?.price?.min ?? sku!.price.to) / 100;
  return {
    "@type": "AggregateOffer",
    highPrice,
    lowPrice,
    offerCount: 1,
    priceCurrency: "BRL",
    offers: [
      toOffer({
        price: {
          highPrice,
          lowPrice,
        },
        available: ammoProduct?.available ?? sku?.available!,
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
  price: price.lowPrice ?? price.highPrice,
  //TODO: define installments ranges
  priceSpecification: [],
});
