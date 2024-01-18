import {
  AggregateOffer,
  BreadcrumbList,
  ImageObject,
  ListItem,
  Product,
  ProductGroup,
  ProductListingPage,
  PropertyValue,
} from "apps/commerce/types.ts";

import {
  AmmoProduct,
  Breadcrumb,
  Photos,
  Sku,
  VMDetails,
} from "$store/packs/types.ts";
import { InstallmentConfig } from "$store/apps/site.ts";
import { PROPS_AMMO_API } from "$store/packs/constants.ts";

interface ProductListingPageProps {
  vmDetails: VMDetails;
  url: URL;
  installmentConfig: InstallmentConfig;
}

interface SkuAndProduct {
  sku?: Sku;
  ammoProduct: AmmoProduct;
}

interface VariantProps extends Omit<SkuAndProduct, "sku"> {
  sku: Sku;
  baseUrl: URL;
  installmentConfig: InstallmentConfig;
}

interface AggregateOfferProps extends Omit<SkuAndProduct, "ammoProduct"> {
  ammoProduct?: AmmoProduct;
  installmentConfig: InstallmentConfig;
}

export function toProduct(
  ammoProduct: AmmoProduct,
  baseUrl: URL,
  installmentConfig: InstallmentConfig,
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
    additionalProperty: [
      ...toSimpleProperty(ammoProduct, PROPS_AMMO_API.product.simpleProperties),
    ],
    brand: {
      "@type": "Brand",
      "@id": ammoProduct.brand,
    },
    category: category ?? ammoProduct.macroCategory,
    inProductGroupWithID: ammoProduct?.groupKey,
    isVariantOf: workableSku
      ? toProductGroup({
        ammoProduct,
        sku: workableSku,
        baseUrl,
        installmentConfig,
      })
      : undefined,
    offers: toAggregateOffer({
      ammoProduct,
      sku: workableSku,
      installmentConfig,
    }),
  };
}

export function toProductListingPage(
  { vmDetails, url, installmentConfig }: ProductListingPageProps,
): ProductListingPage {
  const { productCards } = vmDetails;
  return {
    "@type": "ProductListingPage",
    breadcrumb: toBreadcrumbList(url.origin, vmDetails),
    //TODO: PLP filters
    filters: [],
    products: productCards.map((p) => toProduct(p, url, installmentConfig)),
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
  const { title } = ammoProduct;
  return sku
    ? [
      ...PROPS_AMMO_API.sku.defaultPhotos.map((i) => ({
        "@type": "ImageObject" as const,
        url: sku.photos[i as keyof Photos].toString(),
        additionalType: "image",
        alternateName: title,
        disambiguatingDescription: i,
      })),
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
    : PROPS_AMMO_API.product.defaultPhotos.map((i) => ({
      "@type": "ImageObject" as const,
      url: ammoProduct[i as keyof AmmoProduct]?.toString(),
      alternateName: title,
      additionalType: "image",
      disambiguatingDescription: i,
    }));
};

const toProductGroup = (
  { ammoProduct, sku, baseUrl, installmentConfig }: VariantProps,
): ProductGroup => {
  const { title, skus } = ammoProduct;
  const url = new URL(sku.url, baseUrl.origin).href;
  return {
    "@type": "ProductGroup" as const,
    productGroupID: ammoProduct.groupKey!,
    name: title,
    url,
    model: sku.ean,
    hasVariant: skus!.map((thisSku) => ({
      "@type": "Product" as const,
      category: ammoProduct.category,
      url: new URL(thisSku.url, baseUrl.origin).href,
      sku: thisSku.sku,
      productID: thisSku.sku,
      additionalProperty: [
        ...toSimpleProperty(thisSku, PROPS_AMMO_API.sku.simpleProperties),
      ],
      image: toImage({ sku: thisSku, ammoProduct }),
      offers: toAggregateOffer({ sku: thisSku, installmentConfig }),
    })),
    additionalProperty: [],
  };
};

const toAggregateOffer = (
  { ammoProduct, sku, installmentConfig }: AggregateOfferProps,
): AggregateOffer => {
  const { minInstallmentValue, maxInstallmentQtd } = installmentConfig;
  const highPrice = (ammoProduct?.price?.max ?? sku!.price.from) / 100;
  const lowPrice = (ammoProduct?.price?.min ?? sku!.price.to) / 100;
  const available = ammoProduct?.available ?? sku?.available!;
  const possibleInstallmentsQtd = Math.floor(lowPrice / minInstallmentValue) ||
    1;
  const installments = Array.from(
    {
      length: Math.min(possibleInstallmentsQtd, maxInstallmentQtd),
    },
    (_v, i) => +(lowPrice / (i + 1)).toFixed(2),
  );

  return {
    "@type": "AggregateOffer",
    highPrice,
    lowPrice,
    offerCount: 1,
    priceCurrency: "BRL",
    offers: [
      {
        "@type": "Offer",
        availability: available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        inventoryLevel: { value: sku?.stock },
        price: lowPrice ?? highPrice,
        priceSpecification: installments.map((value, i) => {
          const [description, billingIncrement] = !i
            ? ["À vista", lowPrice]
            : [i + 1 + " vezes sem juros", value];
          return {
            "@type": "UnitPriceSpecification",
            priceType: "https://schema.org/SalePrice",
            priceComponentType: "https://schema.org/Installment",
            description,
            billingDuration: i + 1,
            billingIncrement,
            price: lowPrice,
          };
        }),
      },
    ],
  };
};

const toSimpleProperty = (
  obj: AmmoProduct | Sku,
  properties: string[],
): PropertyValue[] => {
  type T = typeof obj;
  return Object.keys(obj!).reduce<PropertyValue[]>(
    (acc, k) => {
      if (
        !properties.find((v) => v === k) ||
        !obj![k as keyof T]
      ) {
        return [...acc];
      }
      return [...acc, {
        "@type": "PropertyValue" as const,
        name: k.toLocaleUpperCase(),
        propertyID: k,
        value: obj![k as keyof T]?.toString(),
      }];
    },
    [],
  );
};
