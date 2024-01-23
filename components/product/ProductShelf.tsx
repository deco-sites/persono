import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "deco-sites/persono/components/product/ProductCard/index.tsx";
import ShelfSectionHeader from "deco-sites/persono/components/ui/ShelfSectionHeader.tsx";
import { SectionProps } from "deco/mod.ts";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  layout?: {
    headerAlignment?: { desktop: "center" | "left"; mobile: "center" | "left" };
  };
}

function ProductShelf({
  products,
  title,
  layout,
}: // imageBaseUrl !! Remover após integração de produtos
SectionProps<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container ">
      <ShelfSectionHeader
        title={title}
        alignment={
          layout?.headerAlignment ?? { desktop: "center", mobile: "left" }
        }
      />

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 pb-28"
      >
        <Slider class="carousel carousel-center  justify-around sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                // imageBaseUrl={imageBaseUrl} !! Remover após integração de produtos
                product={product}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnCustomContext) => {
  const imageBaseUrl = ctx.imageBaseUrl;
  return {
    imageBaseUrl,
    ...props,
  };
};

export default ProductShelf;
