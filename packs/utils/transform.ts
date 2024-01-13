import {
  BreadcrumbList,
  ImageObject,
  ListItem,
  Product,
  ProductListingPage,
} from "apps/commerce/types.ts";

import { AmmoProduct, Breadcrumb, Sku, VMDetails } from "$store/packs/types.ts";
import { IMAGES_PROD_URL } from "$store/packs/constants.ts";

interface ProductListingPageProps {
  vmDetails: VMDetails;
  url: URL;
}

interface WorkableAttributes {
  //Only full processed attribute
  images: ImageObject[];
  gtin?: string;
  productUrl: string;
}

const getWorkableAttributes = (
  ammoProduct: AmmoProduct,
): WorkableAttributes => {
  //If there's an workable SKU, this is an PDP return
  const workableSku = pickSku(ammoProduct);
  return workableSku
    ? {
      images: pickSkuImages(workableSku!, ammoProduct.title),
      gtin: workableSku!.ean,
      productUrl: workableSku!.url,
    }
    : {
      images: pickProductImages(ammoProduct),
      productUrl: ammoProduct.url!,
    };
};

const pickSku = ({ selectedSku, skus }: AmmoProduct): Sku | undefined =>
  skus?.find(({ sku }) => sku === selectedSku);

const pickSkuImages = (
  { photos, youtubeVideo }: Sku,
  name: string,
): ImageObject[] => {
  const imagesArray = [
    photos.still,
    photos.semiEnvironment,
    ...photos.details.map(({ url }) => url),
  ];
  const videoArray: ImageObject[] = youtubeVideo
    ? [{
      "@type": "ImageObject" as const,
      url: `${IMAGES_PROD_URL + youtubeVideo}`,
      alternateName: name,
      additionalType: "video",
    }]
    : [];

  return [
    ...imagesArray.map((url) => ({
      "@type": "ImageObject" as const,
      url: `${IMAGES_PROD_URL + url}`,
      alternateName: name,
      additionalType: "image",
    })),
    ...videoArray,
  ];
};

const pickProductImages = (
  { image, hoverImage, title }: AmmoProduct,
): ImageObject[] => {
  const imagesArray = [
    image,
    hoverImage,
  ];
  return imagesArray.map((url) => ({
    "@type": "ImageObject" as const,
    url: `${IMAGES_PROD_URL + url}`,
    alternateName: title,
    additionalType: "image",
  }));
};

export function toProduct(
  ammoProduct: AmmoProduct,
  baseUrl: URL,
): Product {
  const { images, gtin, productUrl } = getWorkableAttributes(ammoProduct);
  return {
    "@type": "Product",
    productID: ammoProduct.id,
    name: ammoProduct.title,
    description: ammoProduct?.description,
    sku: ammoProduct?.sku ?? ammoProduct.selectedSku!,
    image: images,
    gtin: gtin,
    url: new URL(productUrl, baseUrl.origin).href,
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
  return {
    "@type": "ProductListingPage",
    breadcrumb: toBreadcrumbList(url.origin, vmDetails),
    filters: [],
    products: [],
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
