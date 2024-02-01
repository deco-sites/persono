import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Benefits from "../../sections/Product/Benefits.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
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

  return (
    <div class="flex flex-col mt-10" id={id}>
      <Breadcrumb
        itemListElement={breadcrumb.itemListElement}
        productsQtt={breadcrumb.numberOfItems}
      />
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div>
          {gtin && <span class="text-sm text-[#666]">Cod. {gtin}</span>}
        </div>
        <h1>
          <span class="font-medium text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
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
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock" ? (
          <>
            {platform === "vtex" && (
              <>
                <AddToCartButtonVTEX
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  seller={seller}
                />
              </>
            )}
            {platform === "wake" && (
              <AddToCartButtonWake
                eventParams={{ items: [eventItem] }}
                productID={productID}
              />
            )}
            {platform === "linx" && (
              <AddToCartButtonLinx
                eventParams={{ items: [eventItem] }}
                productID={productID}
                productGroupID={productGroupID}
              />
            )}
            {platform === "vnda" && (
              <AddToCartButtonVNDA
                eventParams={{ items: [eventItem] }}
                productID={productID}
                additionalProperty={additionalProperty}
              />
            )}
            {platform === "shopify" && (
              <AddToCartButtonShopify
                eventParams={{ items: [eventItem] }}
                productID={productID}
              />
            )}
            {platform === "nuvemshop" && (
              <AddToCartButtonNuvemshop
                productGroupID={productGroupID}
                eventParams={{ items: [eventItem] }}
                additionalProperty={additionalProperty}
              />
            )}
          </>
        ) : (
          <OutOfStock productID={productID} />
        )}
      </div>
      {/* Benefities */}
      <div>
        <Benefits
          layout={[
            {
              title: "Suporte médio",
              description:
                "Proporciona equilíbrio entre firmeza e maciez, com apoio adequado",
              icon: { alt: "asas", src: "Cloud" },
            },
            {
              title: "Ideal para quem dorme de barriga para cima",
              description:
                "Dá suporte para a coluna cervical, mantendo uma posição natural",
              icon: { alt: "asas", src: "ArrowUp" },
            },
          ]}
        />
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        {description && (
          <div class="flex flex-col">
            <details class="py-5 px-4 first:border-t-2 border-b-2 border-neutral">
              <summary class="cursor-pointer flex justify-between items-center text-base">
                Descrição{" "}
                <Icon
                  id="PlusSign"
                  class="text-primary"
                  width={22}
                  height={22}
                  strokeWidth={0.01}
                  fill="currentColor"
                />
              </summary>
              <div
                class="ml-2 mt-2 max-w-sm"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
            <details class="py-5 px-4 border-b-2 border-neutral">
              <summary class="cursor-pointer flex justify-between items-center text-base">
                Descrição{" "}
                <Icon
                  id="PlusSign"
                  class="text-primary"
                  width={22}
                  height={22}
                  strokeWidth={0.01}
                  fill="currentColor"
                />
              </summary>
              <div
                class="ml-2 mt-2 max-w-sm"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>

            <details class="py-5 px-4 border-b-2 border-neutral">
              <summary class="cursor-pointer flex justify-between items-center text-base">
                Calcular frete{" "}
                <Icon
                  id="PlusSign"
                  class="text-primary"
                  width={22}
                  height={22}
                  strokeWidth={0.01}
                  fill="currentColor"
                />
              </summary>
              <div class="mt-5 max-w-sm">
                {platform === "vtex" && (
                  <ShippingSimulation
                    items={[
                      {
                        id: Number(product.sku),
                        quantity: 1,
                        seller: seller,
                      },
                    ]}
                  />
                )}
              </div>
            </details>
          </div>
        )}
      </div>
      {/* Shipping Simulation */}
      {/* Analytics Event */}
    </div>
  );
}

export default ProductInfo;
