import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSizeSelector from "./ProductSizeVariantSelector.tsx";
import ProductColorSelector from "./ProductColorVariantSelector.tsx";
import ProductBenefits from "../../sections/Product/ProductBenefits.tsx";
import { useOfferWithoutTaxes } from "deco-sites/persono/sdk/useOfferWithoutTaxes.ts";
import AddCartButton from "$store/islands/AddToCartButton/CartButton.tsx";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { SizeGuideGroup } from "deco-sites/persono/loaders/Layouts/SizeGuide.tsx";
import { Benefits } from "../../loaders/Layouts/Benefits.tsx";
import { Resolved, SectionProps } from "deco/mod.ts";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { ShippingSimulation as ShippingSimulationLoader } from "deco-sites/persono/packs/types.ts";
import {
  type EditableProps as NotFoundProps,
  NotFound,
} from "deco-sites/persono/components/product/NotFound.tsx";
import { FnContext } from "deco/types.ts";
import ProductInfoCollapse from "deco-sites/persono/islands/ProductInfoCollapse.tsx";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { PageFolder } from "deco-sites/persono/islands/PageFolder.tsx";

interface Props {
  colors: Color[];
  sizes: Size[];
  sizeGuide: SizeGuideGroup[];
  benefits: Benefits[];
  categoryModalDisplay?: string[];
  shippingSimulation: Resolved<ShippingSimulationLoader>;
  page: ProductDetailsPage | null;
  notFoundSettings?: NotFoundProps;
  showBreadcrumbProductQty?: boolean;
}

function ProductInfo({
  page,
  colors,
  sizes,
  benefits,
  notFoundSettings,
  device,
  showBreadcrumbProductQty,
  sizeGuide,
}: SectionProps<typeof loader>) {
  const id = useId();
  const externalSectionId = useId();

  const productInfoSectionId = `${id}-product-info`;

  if (page === null) {
    return <NotFound device={device} notFoundSettings={notFoundSettings} />;
  }

  const { breadcrumbList, product } = page;
  const { offers, name = "", gtin, isVariantOf, url, sku } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    installments,
    availability,
  } = useOfferWithoutTaxes(offers);
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const productBenefits = product.isVariantOf?.hasVariant[0].additionalProperty
    ?.filter((p) => {
      if (p.identifier?.startsWith("CUSTOM")) return p.value;
    });

  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities: GroupedData = useVariantPossibilities(
    hasVariant,
    isVariantOf,
  );

  const productsNotAvailable: string[] = [""];

  hasVariant.map((p) => {
    if (p.offers?.offers[0].availability === "https://schema.org/OutOfStock") {
      productsNotAvailable.push(p.sku);
    }
  });

  const script = (id: string, externalSectionId: string) => {
    const content = document.getElementById(id);
    const externalContainer = document.getElementById(externalSectionId);

    // Verifica se os elementos necessários existem
    if (!content || !externalContainer) return;

    const windowHeight = window.innerHeight;
    const contentHeight = content.offsetHeight || 0;
    const top = (contentHeight - windowHeight + 4) * -1;
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const validation1 =
        scrollY - externalContainer.clientHeight + contentHeight / 2 > 0;
      const validation2 = scrollY - contentHeight / 2 < 0;

      if (content.style.top === `${80}px` && scrollY < lastScrollTop) {
        lastScrollTop = scrollY <= 0 ? 0 : scrollY;
        return;
      }

      if (validation1) {
        content.style.position = "sticky";
        content.style.top = `${80}px`;
      } else if (validation2) {
        content.style.position = "sticky";
        content.style.top = `${top}px`;
      }

      lastScrollTop = scrollY <= 0 ? 0 : scrollY;
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  };

  return (
    <section class="w-full h-full" id={externalSectionId}>
      <div
        class="flex flex-col w-full sm:mt-10 px-4 sm:px-0 my-10"
        id={productInfoSectionId}
      >
        <Breadcrumb
          itemListElement={breadcrumb.itemListElement}
          showBreadcrumbProductQty={showBreadcrumbProductQty}
          productsQtt={breadcrumb.numberOfItems}
        />
        {/* Code and name */}
        <div class="sm:mt-6 mt-4 ">
          <div>
            {gtin && <span class="text-sm text-gray-600">Cod. {gtin}</span>}
          </div>
          <h1>
            <span class="font-medium text-xl sm:text-2xl">{name}</span>
          </h1>
        </div>
        {/* Prices */}
        <div class="sm:mt-6 mt-4  ">
          <div class="flex flex-row gap-2 items-center">
            {(listPrice ?? 0) > price && (
              <span class="line-through text-gray-600 text-xs">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="font-medium text-xl text-black">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>
          <span class="text-sm text-gray-600">{installments}</span>
        </div>

        {/* Sku Selector */}
        <div class="sm:mt-6 mt-4  flex-col gap-4 ">
          <ProductSizeSelector
            category={product.category?.split(
              ">",
            )[product.category?.split(">").length - 1] ?? ""}
            sizes={sizes}
            sizeGuide={sizeGuide}
            url={url}
            productsNotAvailable={productsNotAvailable}
            possibilities={possibilities}
            device={device}
          />
          <ProductColorSelector
            colors={colors}
            url={url}
            productsNotAvailable={productsNotAvailable}
            possibilities={possibilities}
          />
        </div>
        {/* Add to Cart and Favorites button */}
        <div
          class={`mt-6 sm:mt-10  ${
            productBenefits?.length == 0 ? "mb-5" : "mb-10"
          } flex flex-col`}
        >
          {availability === "https://schema.org/InStock"
            ? (
              <>
                <AddCartButton
                  eventParams={{ items: [eventItem] }}
                  sku={product.sku}
                />
              </>
            )
            : <OutOfStock sku={sku} />}
        </div>
        <PageFolder activate={device !== "desktop"}>
          {/* Benefities */}
        <div class={`${productBenefits?.length == 0 ? "hidden" : ""}`}>
          <ProductBenefits
            productBenefits={productBenefits}
            adminBenefits={benefits}
          />
        </div>

        {/* Description card */}

          {/* Description card */}

          <div class="mt-6 sm:mt-7  ">
            {description && (
              <div class="flex flex-col divide-y border-t">
                {description && (
                  <ProductInfoCollapse title="Descrição">
                    <p class="text-base font-normal">{description}</p>
                  </ProductInfoCollapse>
                )}

                <ProductInfoCollapse title="Especificações">
                  <div class="flex flex-col gap-2">
                    {product.isVariantOf?.hasVariant[0].additionalProperty &&
                      product?.isVariantOf?.hasVariant[0]?.additionalProperty
                        .map(
                          (ad) =>
                            ad.propertyID == "TECNICALSPECIFICATION" &&
                              !ad.description?.startsWith("CUSTOM_")
                              ? (
                                <p class="text-base font-normal">
                                  {ad.description}:&ensp;{ad.value}
                                </p>
                              )
                              : null,
                        )}
                  </div>
                </ProductInfoCollapse>

                <ProductInfoCollapse title="O que vai na embalagem?">
                  <div class="flex flex-col gap-2">
                    {product.isVariantOf?.hasVariant[0].additionalProperty &&
                      product?.isVariantOf?.hasVariant[0]?.additionalProperty
                        .map(
                          (ad) =>
                            ad.propertyID == "KITITEM"
                              ? (
                                <p class="text-base font-normal">
                                  {ad.value}&ensp;{ad.description}
                                </p>
                              )
                              : null,
                        )}
                  </div>
                </ProductInfoCollapse>

                {/* Shipping Simulation */}

                <div class="collapse items-start collapse-open pl-0">
                  <div class="flex  pl-0 items-center collapse-title text-base after:text-2xl after:text-primary">
                    Calcular frete
                  </div>
                  <div class="collapse-content w-full pr-0 pl-0">
                    <ShippingSimulation sku={product.sku} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analytics Event */}

          <SendEventOnView
            id={id}
            event={{
              name: "view_item",
              params: {
                item_list_id: "product",
                item_list_name: "Product",
                items: [eventItem],
              },
            }}
          />
        </PageFolder>
        <div class="h-3 invisible" />

        {device === "desktop" && (
          <script
            defer
            src={scriptAsDataURI(
              script,
              productInfoSectionId,
              externalSectionId,
            )}
          />
        )}
      </div>
    </section>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  const device = ctx.device;
  return {
    device,
    ...props,
  };
};

export default ProductInfo;
