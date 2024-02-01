import {
  AggregateOffer,
  BreadcrumbList,
  Filter,
  ImageObject,
  ListItem,
  Product,
  ProductDetailsPage,
  ProductGroup,
  ProductListingPage,
  PropertyValue,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

import {
  AmmoProduct,
  Breadcrumb,
  Config,
  Photos,
  Sku,
  VMDetails,
} from "$store/packs/types.ts";
import { PROPS_AMMO_API, SORT_OPTIONS } from "$store/packs/constants.ts";
import { typeChecher } from "$store/packs/utils/utils.ts";

export type PDPConfig = Pick<Config, "minInstallmentValue" | "maxInstallments">;
export type VMConfig = Pick<
  Config,
  "minInstallmentValue" | "maxInstallments" | "vmItemsPerPage"
>;

interface ProductListingPageProps {
  vmDetails: VMDetails;
  url: URL;
  vmConfig: VMConfig;
}

interface ProductDetailsPageProps {
  ammoProduct: AmmoProduct;
  url: URL;
  pdpConfig: PDPConfig;
}

interface SkuAndProduct {
  sku?: Sku;
  ammoProduct: AmmoProduct;
  config: VMConfig | PDPConfig;
}

interface VariantProps extends Required<SkuAndProduct> {
  baseUrl: URL;
}

export function toProduct(
  ammoProduct: AmmoProduct,
  baseUrl: URL,
  config: VMConfig | PDPConfig,
): Product {
  const { skus, selectedSku, title, macroCategory, segment, brand } =
    ammoProduct;
  const workableSku = skus?.find(({ sku }) => sku === selectedSku);

  return {
    "@type": "Product",
    productID: ammoProduct.id,
    name: title.trim(),
    description: ammoProduct?.description,
    sku: ammoProduct?.sku ?? selectedSku!,
    image: toImage({ sku: workableSku, ammoProduct }),
    gtin: workableSku?.ean,
    url: new URL(workableSku?.url ?? ammoProduct.url!, baseUrl.origin).href,
    additionalProperty: [
      ...toAdditionalProperties(
        ammoProduct,
        PROPS_AMMO_API.product.simpleProps,
      ),
    ],
    brand: {
      "@type": "Brand",
      "@id": brand,
      name: brand,
    },
    category: `${segment}>${macroCategory}${
      macroCategory === ammoProduct.category ? "" : `>${ammoProduct.category}`
    }`,
    inProductGroupWithID: ammoProduct?.groupKey,
    isVariantOf: workableSku
      ? toProductGroup({
        ammoProduct,
        sku: workableSku,
        baseUrl,
        config,
      })
      : undefined,
    offers: toAggregateOffer({
      ammoProduct,
      sku: workableSku,
      config,
    }),
  };
}

export function toProductListingPage(
  { vmDetails, url, vmConfig }: ProductListingPageProps,
): ProductListingPage {
  const { productCards, meta } = vmDetails;
  return {
    "@type": "ProductListingPage",
    breadcrumb: toBreadcrumbList(url.origin, vmDetails),
    seo: {
      title: meta.title,
      description: meta.description,
      canonical: "",
    },
    pageInfo: toPageInfo(url, vmConfig, vmDetails),
    filters: toFilters(vmDetails, url),
    products: productCards.map((p) => toProduct(p, url, vmConfig)),
    sortOptions: SORT_OPTIONS,
  };
}

export function toProductDetailsPage(
  { ammoProduct, url, pdpConfig }: ProductDetailsPageProps,
): ProductDetailsPage {
  return {
    "@type": "ProductDetailsPage",
    breadcrumbList: toBreadcrumbList(url.origin, ammoProduct),
    product: toProduct(ammoProduct, url, pdpConfig),
    seo: {
      title: ammoProduct.title.trim(),
      description: ammoProduct?.description ?? "",
      canonical: "",
    },
  };
}

const toBreadcrumbList = (
  origin: string,
  { breadcrumbs }: VMDetails | AmmoProduct,
): BreadcrumbList => {
  const itemListElement = toItemListElement(breadcrumbs!, origin);
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
  breadcrumbs?.flat(1).reduce<ListItem[]>(
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

const toFilters = (
  { sidebar, appliedFilters, basePath }: VMDetails,
  url: URL,
): Filter[] => {
  return sidebar.map((
    { filterType, filterLabel, values },
  ) => {
    return {
      "@type": "FilterToggle",
      label: filterLabel,
      key: filterType,
      quantity: 0,
      values: values.sort((a, b) => a.value.localeCompare(b.value)).map((v) => {
        const selected = !!appliedFilters.filter(({ type }) =>
          type === filterType
        ).find(({ value }) => value === v.value);
        const slugs = selected
          ? appliedFilters.map(({ slug }) => slug).filter((
            f,
          ) => f != v.slug)
          : appliedFilters.map(({ slug }) => slug).concat([v.slug]);
        return {
          label: v.value,
          value: v.value,
          selected,
          url: new URL(
            basePath + "/" +
              slugs.join("/"),
            url.origin,
          ).href,
          quantity: 0,
        };
      }),
    };
  });
};

const toPageInfo = (
  url: URL,
  { vmItemsPerPage }: VMConfig,
  { skusTotal }: VMDetails,
) => {
  const totalPages = Math.ceil(skusTotal / vmItemsPerPage);
  const params = url.searchParams;
  const actualPage = Number(params.get("page") ?? 1);
  const hasNextPage = totalPages > actualPage;
  const hasPreviousPage = actualPage > 1;
  const nextPage = new URLSearchParams(params);
  const previousPage = new URLSearchParams(params);

  if (hasNextPage) {
    nextPage.set("page", (actualPage + 1).toString());
  }

  if (hasPreviousPage) {
    previousPage.set("page", (actualPage - 1).toString());
  }

  return {
    nextPage: hasNextPage ? `?${nextPage}` : undefined,
    previousPage: hasPreviousPage ? `?${previousPage}` : undefined,
    currentPage: actualPage - 1,
    records: skusTotal,
    recordPerPage: vmItemsPerPage,
  };
};

const toImage = (
  { sku, ammoProduct }: Omit<SkuAndProduct, "config">,
): ImageObject[] => {
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
      ...sku.photos.panoramics.map((v, i) => ({
        "@type": "ImageObject" as const,
        url: v,
        additionalType: "image",
        alternateName: title,
        disambiguatingDescription: `panoramics-${i}`,
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
  { ammoProduct, sku, baseUrl, config }: VariantProps,
): ProductGroup => {
  const { title, skus } = ammoProduct;
  const url = new URL(sku.url, baseUrl.origin).href;
  return {
    "@type": "ProductGroup" as const,
    productGroupID: ammoProduct.groupKey!,
    name: title.trim(),
    url,
    model: sku.ean,
    hasVariant: skus!.map((thisSku) => ({
      "@type": "Product" as const,
      category: ammoProduct.category,
      url: new URL(thisSku.url, baseUrl.origin).href,
      sku: thisSku.sku,
      productID: thisSku.sku,
      additionalProperty: [
        ...toAdditionalProperties(thisSku, PROPS_AMMO_API.sku.simpleProps),
      ],
      image: toImage({ sku: thisSku, ammoProduct }),
      offers: toAggregateOffer({ sku: thisSku, config }),
    })),
    additionalProperty: skus!.reduce<PropertyValue[]>(
      (acc, { color, size }) => {
        const result = acc;
        const uniqueValues = new Set(acc.map(({ value }) => value));

        if (!uniqueValues.has(color.name)) {
          result.push({
            "@type": "PropertyValue" as const,
            propertyID: "COLOR",
            name: "color",
            value: color.name,
            unitCode: color.hex,
            valueReference: "PROPERTY",
          });
        }
        if (!uniqueValues.has(size)) {
          result.push({
            "@type": "PropertyValue",
            propertyID: "SIZE",
            name: "size",
            value: size,
            valueReference: "PROPERTY",
          });
        }
        return result;
      },
      [],
    ),
  };
};

const toAggregateOffer = (
  { ammoProduct, sku, config }: Partial<SkuAndProduct>,
): AggregateOffer => {
  const { minInstallmentValue, maxInstallments } = config!;
  const highPrice = (ammoProduct?.price?.max ?? sku!.price.from) / 100;
  const lowPrice = (ammoProduct?.price?.min ?? sku!.price.to) / 100;
  const available = ammoProduct?.available ?? sku?.available!;
  const possibleInstallmentsQtd =
    Math.floor(lowPrice / (minInstallmentValue / 100)) ||
    1;
  const installments = Array.from(
    {
      length: Math.min(possibleInstallmentsQtd, maxInstallments),
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
        seller: ammoProduct?.brand ?? "persono",
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            priceType: "https://schema.org/ListPrice",
            price: highPrice,
          },
          {
            "@type": "UnitPriceSpecification",
            priceType: "https://schema.org/SalePrice",
            price: lowPrice,
          },
          ...installments.map<UnitPriceSpecification>(
            (value, i) => {
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
            },
          ),
        ],
      },
    ],
  };
};

const toAdditionalProperties = (
  obj: AmmoProduct | Sku,
  simplePropertiesList: string[],
): PropertyValue[] => {
  type T = typeof obj;
  const sku = obj as Sku;

  const tagsProperties = (): PropertyValue[] => {
    const tags = obj.tags;
    if (!tags) return [];
    return Object.entries(tags).map((v) => ({
      "@type": "PropertyValue" as const,
      propertyID: "TAG",
      name: "tag",
      identifier: v[0].toUpperCase(),
      value: v[1].type,
      valueReference: v[1].value,
    }));
  };

  const colorProperty = (): PropertyValue => ({
    "@type": "PropertyValue" as const,
    propertyID: "COLOR",
    name: "color",
    value: sku.color.name,
    unitCode: sku.color.hex,
    valueReference: "SPECIFICATION",
  });

  const specificationsProperties = (): PropertyValue[] =>
    sku.specifications.map(({ id, value, label }) => ({
      "@type": "PropertyValue" as const,
      propertyID: "TECNICALSPECIFICATION",
      name: "tecnicalSpecification",
      identifier: id,
      value,
      description: label,
    }));

  const kitItemsProperties = (): PropertyValue[] =>
    sku.kitItems.map(({ name, quantity, dimensions }) => ({
      "@type": "PropertyValue" as const,
      propertyID: "KITITEM",
      name: "kitItem",
      value: name,
      description: dimensions,
      valueReference: quantity,
    }));

  const simpleProperties = () =>
    Object.keys(obj!).reduce<PropertyValue[]>(
      (acc, k) => {
        if (
          !simplePropertiesList.find((v) => v === k) ||
          !obj![k as keyof T]
        ) {
          return [...acc];
        }
        return [...acc, {
          "@type": "PropertyValue" as const,
          propertyID: k.toUpperCase(),
          name: k,
          value: obj![k as keyof T]?.toString(),
          valueReference: typeChecher<AmmoProduct>(obj as AmmoProduct, "id")
            ? undefined
            : "SPECIFICATION",
        }];
      },
      [],
    );

  return [
    ...simpleProperties(),
    ...typeChecher<AmmoProduct>(obj as AmmoProduct, "id")
      ? PROPS_AMMO_API.product.simpleArrayProps.flatMap((i) => {
        const prop = obj[i as keyof T];
        if (!prop) return [];
        const propName = prop.toString();
        return Object.values(prop).map((p) => ({
          "@type": "PropertyValue" as const,
          propertyID: propName.toUpperCase(),
          name: propName,
          value: p,
        }));
      })
      : [
        colorProperty(),
        ...specificationsProperties(),
        ...kitItemsProperties(),
      ],
    ...tagsProperties(),
  ];
};
