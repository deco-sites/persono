import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "deco-sites/persono/components/product/ProductCard/index.tsx";
import { FnContext } from "deco/types.ts";
import { SectionProps } from "deco/mod.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  console.log("@@@ ctx ", ctx);
  return {
    ...props,
  };
};

function ProductShelf({
  products,
  title,
  description,
  layout,
}: SectionProps<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container ">
      <Header
        title={title}
        description={description || ""}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[230px] sm:w-[280px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                imageBaseUrl="https://images-prod.mmartan.com.br/"
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

export default ProductShelf;
