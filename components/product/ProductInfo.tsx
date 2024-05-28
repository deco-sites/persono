import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSizeSelector from "$store/components/product/ProductSizeVariantSelector.tsx";
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

  // Script to dynamic visualization of product info
  const script = (id: string, externalSectionId: string) => {
    const content = document.getElementById(id);
    const externalContainer = document.getElementById(externalSectionId);
  
    if (!content || !externalContainer) return;
  
    let lastScrollTop = 0;
    let lastScrollDirection = "";
    let lastSideVisible = "";
    let lastContentHeight = 0;
    let heightContentChanged = false;
  
    // Function to check if an element is visible in the viewport
    const isElementInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const menuHeight = 80;
      return {
        topVisible: rect.top >= menuHeight && rect.top < window.innerHeight,
        bottomVisible: rect.bottom >= menuHeight && rect.bottom < window.innerHeight,
      };
    };
  
    // Function to set the content to "sticky" position
    const setSticky = (top: number) => {
      content.style.top = `${top}px`;
      content.style.position = "sticky";
    };
  
    // Function to set the content to "relative" position
    const setRelative = (paddingTop: number) => {
      content.style.position = "relative";
      content.style.top = "0px";
      externalContainer.style.paddingTop = `${paddingTop}px`;
    };
  
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const contentHeight = content.offsetHeight || 0;
  
      // Update content height if it has changed
      if (lastContentHeight !== contentHeight) {
        lastContentHeight = contentHeight;
        heightContentChanged = true;
      }
  
      const top = (lastContentHeight - windowHeight + 4) * -1;
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollTop ? "down" : "up";
      const { top: externalTop } = externalContainer.getBoundingClientRect();
      const { top: contentTop } = content.getBoundingClientRect();
      const { bottomVisible, topVisible } = isElementInViewport(content);
      const distanceFromTop = externalTop - contentTop;
  
      // Constants for scroll conditions
      const isScrollingDownAndBottomVisible = scrollDirection === "down" && bottomVisible && !topVisible;
      const isScrollingUpAndBottomVisible = scrollDirection === "up" && bottomVisible && !topVisible;
      const isScrollingDownAndTopVisible = topVisible && scrollDirection === "down";
      const isSwitchingToUpDirectionAndTopVisible =
        (lastScrollDirection === "up" && topVisible && lastSideVisible === "bottomVisible") ||
        (lastScrollDirection !== scrollDirection && topVisible && lastSideVisible === "topVisible");
  
      // Constant for combined condition
      const shouldSetStickyWhenScrollingDown = isScrollingDownAndBottomVisible && (lastScrollDirection !== "up" || lastSideVisible === "bottomVisible");
  
      // Update external container's paddingTop if content height changed
      if (heightContentChanged) {
        externalContainer.style.paddingTop = `${-distanceFromTop}px`;
      }
  
      // Reset the external container's paddingTop if top is visible and content height changed
      if (topVisible && externalContainer.style.paddingTop !== "0px" && lastSideVisible === "bottomVisible") {
        externalContainer.style.paddingTop = "0px";
      }
  
      // Case: Scrolling down and the bottom of the content is visible, but the top is not
      if (shouldSetStickyWhenScrollingDown || heightContentChanged) {
        setSticky(top);
        lastScrollDirection = "down";
        lastSideVisible = "bottomVisible";
        heightContentChanged = false;
      }
      // Case: Scrolling up and the bottom of the content is visible, but the top is not
      else if (isScrollingUpAndBottomVisible) {
        setRelative(-distanceFromTop);
        lastScrollDirection = "up";
        lastSideVisible = "bottomVisible";
      }
      // Case: Scrolling down and the top of the content is visible
      else if (isScrollingDownAndTopVisible) {
        setRelative(-distanceFromTop);
        lastScrollDirection = "down";
        lastSideVisible = "topVisible";
      }
      // Case: Switching to up direction and the top of the content is visible
      else if (isSwitchingToUpDirectionAndTopVisible) {
        setSticky(80);
        lastScrollDirection = "up";
        lastSideVisible = "topVisible";
      }
  
      // Update the last scroll position
      lastScrollTop = Math.max(scrollY, 0);
    };
  
    // Add the scroll event listener to the window
    addEventListener("scroll", handleScroll);
  
    // Return a cleanup function to remove the event listener
    return () => {
      removeEventListener("scroll", handleScroll);
    };
  };
  

  return (
    <section class="w-full h-full" id={externalSectionId}>
      <div
        class="flex flex-col w-full sm:pt-10 px-4 sm:px-0 "
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
