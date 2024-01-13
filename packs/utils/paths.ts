interface ResolveRouteProps {
  path: string;
  page: number;
}

const paths = (publicUrl: string) => {
  const href = (path: string, extraUrlParams?: object) => {
    const extraParams = extraUrlParams
      ? "?" +
        new URLSearchParams({
          ...Object.fromEntries(
            Object.entries(extraUrlParams).filter(([_, value]) => !!value),
          ),
        })
      : "";

    return new URL(path + extraParams, publicUrl).href;
  };

  return {
    productCatalog: {
      resolveRoute: (props: ResolveRouteProps) =>
        href(`product-catalog/resolve-route`, { ...props }),
    },
    recommendation: {
      sku: () => href("recommendation"),
    },
    product: {
      sku: (sku: string) => href(`product/sku/${sku}`),
    },
  };
};

export default paths;
