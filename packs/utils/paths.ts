interface ResolveRouteProps {
  path: string;
  page: number;
}

interface GetPageProps {
  basePath: string;
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
      getPage: (props: GetPageProps) =>
        href(`product-catalog/get-page-info`, { ...props }),
    },
    recommendation: {
      sku: () => href("recommendation"),
    },
  };
};

export default paths;
