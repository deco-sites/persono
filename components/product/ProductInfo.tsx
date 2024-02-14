import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSizeSelector from "./ProductSizeVariantSelector.tsx";
import ProductColorSelector from "./ProductColorVariantSelector.tsx";
import BenefitsComponent from "../../sections/Product/Benefits.tsx";
import { useOfferWithoutTaxes } from "deco-sites/persono/sdk/useOfferWithoutTaxes.ts";
import AddCartButton from "$store/islands/AddToCartButton/CartButton.tsx";
import { Color } from "deco-sites/persono/loaders/Layouts/Colors.tsx";
import { Size } from "deco-sites/persono/loaders/Layouts/Size.tsx";
import { Benefits } from "../../loaders/Layouts/Benefits.tsx";
import { Resolved } from "deco/mod.ts";
import type { GroupedData } from "$store/sdk/useVariantPossiblities.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { ShippingSimulation as ShippingSimulationLoader } from "deco-sites/persono/packs/types.ts";

interface Props {
  colors: Color[];
  sizes: Size[];
  benefits: Benefits[];
  shippingSimulation: Resolved<ShippingSimulationLoader>;
  page: ProductDetailsPage | null;
}

function ProductInfo({ page, colors, sizes, benefits }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, name = "", gtin, isVariantOf, url } = product;
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

  return (
    <div class="flex flex-col w-full sm:mt-10 px-4 sm:px-0" id={id}>
      <Breadcrumb
        itemListElement={breadcrumb.itemListElement}
        productsQtt={breadcrumb.numberOfItems}
      />
      {/* Code and name */}
      <div class="sm:mt-6 mt-4 ">
        <div>
          {gtin && <span class="text-sm text-[#666]">Cod. {gtin}</span>}
        </div>
        <h1>
          <span class="font-medium text-xl sm:text-2xl capitalize">{name}</span>
        </h1>
      </div>
      {/* Prices */}
      <div class="sm:mt-6 mt-4  ">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-[#666] text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-medium text-xl text-black">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        <span class="text-sm text-[#666]">{installments}</span>
      </div>
      {/* Sku Selector */}
      <div class="sm:mt-6 mt-4 flex flex-col gap-4 ">
        <ProductSizeSelector
          sizes={sizes}
          url={url}
          possibilities={possibilities}
        />
        <ProductColorSelector
          colors={colors}
          url={url}
          possibilities={possibilities}
        />
      </div>
      {/* Add to Cart and Favorites button */}
      <div
        class={`mt-6 sm:mt-10 ${
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
          : <OutOfStock productID={productID} />}
      </div>
      {/* Benefities */}
      <div class={`${productBenefits?.length == 0 ? "hidden" : ""}`}>
        <BenefitsComponent
          productBenefits={productBenefits}
          adminBenefits={benefits}
        />
      </div>
      {/* Description card */}
      <div class="mt-6 sm:mt-7">
        {description && (
          <div class="flex flex-col divide-y border-t">
            <div class="collapse collapse-plus items-start">
              <input type="checkbox" />
              <div class="flex items-center collapse-title text-base after:text-2xl after:text-primary">
                Descrição
              </div>
              <div class="collapse-content max-w-lg">
                <p>{description}</p>
              </div>
            </div>

            <div class="collapse collapse-plus items-start">
              <input type="checkbox" />
              <div class="flex items-center collapse-title text-base after:text-2xl after:text-primary">
                Especificações
              </div>
              <div class="collapse-content max-w-lg flex flex-col gap-2">
                {product.isVariantOf?.hasVariant[0].additionalProperty &&
                  product?.isVariantOf?.hasVariant[0]?.additionalProperty.map(
                    (ad) =>
                      ad.propertyID == "TECNICALSPECIFICATION" &&
                        !ad.description?.startsWith("CUSTOM_")
                        ? (
                          <p>
                            {ad.description}:&ensp;{ad.value}
                          </p>
                        )
                        : null,
                  )}
              </div>
            </div>

            <div class="collapse collapse-plus items-start">
              <input type="checkbox" />
              <div class="flex items-center collapse-title text-base after:text-2xl after:text-primary">
                O que vai na embalagem?
              </div>
              <div class="collapse-content max-w-lg flex flex-col gap-2">
                {product.isVariantOf?.hasVariant[0].additionalProperty &&
                  product?.isVariantOf?.hasVariant[0]?.additionalProperty.map(
                    (ad) =>
                      ad.propertyID == "KITITEM"
                        ? (
                          <p>
                            {ad.value}&ensp;{ad.description}
                          </p>
                        )
                        : null,
                  )}
              </div>
            </div>

            <div class="collapse collapse-plus items-start">
              <input type="checkbox" />
              <div class="flex items-center collapse-title text-base after:text-2xl after:text-primary">
                Calcular frete
              </div>
              <div class="collapse-content max-w-lg pr-0">
                <div class="max-w-lg">
                  <ShippingSimulation sku={product.sku} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Shipping Simulation */}
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
    </div>
  );
}

export default ProductInfo;
