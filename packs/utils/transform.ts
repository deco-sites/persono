import {
  BreadcrumbList,
  ImageObject,
  ListItem,
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
}

interface ToVariantProps {
  sku: Sku;
  baseUrl: URL;
  category: string;
  title: string;
}

export function toProduct(
  ammoProduct: AmmoProduct,
  baseUrl: URL,
): Product {
  const { images, gtin, productUrl } = getWorkableAttributes(
    ammoProduct,
    baseUrl,
  );
  return {
    "@type": "Product",
    productID: ammoProduct.id,
    name: ammoProduct.title,
    description: ammoProduct?.description,
    sku: ammoProduct?.sku ?? ammoProduct.selectedSku!,
    image: images,
    gtin: gtin,
    url: productUrl,
    additionalProperty: [],
    brand: {
      "@type": "Brand",
      "@id": ammoProduct.brand,
    },
    category: ammoProduct.category ?? ammoProduct.macroCategory,
    inProductGroupWithID: ammoProduct?.groupKey,
    isVariantOf: undefined,
    offers: undefined,
  };
}

export function toProductListingPage(
  { vmDetails, url }: ProductListingPageProps,
): ProductListingPage {
  const { productCards } = vmDetails;
  return {
    "@type": "ProductListingPage",
    breadcrumb: toBreadcrumbList(url.origin, vmDetails),
    filters: [],
    products: productCards.map((p) => toProduct(p, url)),
    pageInfo: {
      currentPage: 1,
      nextPage: "",
      previousPage: "",
    },
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

const getWorkableAttributes = (
  ammoProduct: AmmoProduct,
  baseUrl: URL,
): WorkableAttributes => {
  const { skus, selectedSku, title, category } = ammoProduct;
  const workableSku = skus?.find(({ sku }) => sku === selectedSku);
  const workableUrl =
    new URL(workableSku?.url ?? ammoProduct.url!, baseUrl.origin).href;
  return workableSku
    ? {
      images: pickSkuImages(workableSku!, ammoProduct.title),
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
        additionalProperty: [],
      },
    }
    : {
      images: pickProductImages(ammoProduct),
      productUrl: workableUrl,
    };
};

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
      url: youtubeVideo,
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
});

/* const toSkuAggregateOffer = ({ price, stock, available }: Sku) => ({
  "@type": "AggregateOffer",
});
 */