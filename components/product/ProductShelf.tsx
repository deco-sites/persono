import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductCard, {
  Layout as CardLayout,
} from "deco-sites/persono/components/product/ProductCard/index.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

import { SectionProps } from "deco/mod.ts";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";

export interface Props {
  title?: { desktop: string; mobile?: string };
  products: Product[] | null;
  /** @description used for analytics event */
  itemListName?: string;
  cardLayout?: CardLayout;
  mobileTopNavigation?: boolean;
  hasRelatedProducts?: boolean;
}

function ProductShelf({
  products,
  title,
  device,
  itemListName,
  cardLayout,
  mobileTopNavigation,
  hasRelatedProducts,
}: SectionProps<typeof loader>) {
  const id = useId();
  const prevButtonId = useId();
  const nextButtonId = useId();
  const arrowsvVisibleTop = mobileTopNavigation && device === "mobile";

  const { desktop, mobile } = title ?? {};
  const isMobile = device === "mobile";
  const currentTitle = isMobile ? mobile ?? desktop : desktop;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container">
      {arrowsvVisibleTop && currentTitle ? (
        <HeaderWithArrows
          title={currentTitle}
          prevButtonId={prevButtonId}
          nextButtonId={nextButtonId}
        />
      ) : (
        currentTitle && (
          <Header
            title={currentTitle}
            alignment={isMobile ? "left" : "center"}
          />
        )
      )}

      <div id={id} class="container grid grid-cols-[48px_1fr_48px] pb-28">
        <Slider
          class={`carousel carousel-start sm:carousel-end md:gap-8 col-span-full row-start-2 row-end-5`}
        >
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item pl-6 sm:pl-0 last:pr-6 sm:last:pr-0 lg:w-[calc(25%-25px)] sm:w-[calc(33.3%-30px)] w-2/3"
            >
              <ProductCard
                isMobile={isMobile}
                hasRelatedProducts={hasRelatedProducts}
                layout={cardLayout}
                itemListName={itemListName}
                product={product}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton
            id={prevButtonId}
            class="justify-center btn btn-circle border border-neutral  bg-white disabled:border-neutral disabled:bg-white  disable:bg-white z-10 absolute left-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer"
          >
            <Icon
              class="text-primary rotate-180"
              size={20}
              id="ChevronRight"
              strokeWidth={2}
            />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton
            id={nextButtonId}
            class="justify-center btn btn-circle border-neutral bg-white disabled:border-neutral disabled:bg-white z-10 absolute right-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer"
          >
            <Icon
              class="text-primary"
              size={20}
              id="ChevronRight"
              strokeWidth={2}
            />
          </Slider.NextButton>
        </div>

        <SliderJS
          rootId={id}
          prevButtonId={prevButtonId}
          nextButtonId={nextButtonId}
        />
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnCustomContext) => {
  const device = ctx.device;
  return {
    device,
    ...props,
  };
};

const HeaderWithArrows = ({
  title,
  prevButtonId,
  nextButtonId,
}: {
  title?: string;
  prevButtonId: string;
  nextButtonId: string;
}) => {
  return (
    <div class="w-full flex justify-around items-center ">
      <Slider.PrevButton
        id={prevButtonId}
        class="justify-center btn btn-circle border disabled:border-neutral border-neutral disabled:bg-white bg-white rounded-full cursor-pointer"
      >
        <Icon class="text-primary" size={20} id="ChevronLeft" strokeWidth={2} />
      </Slider.PrevButton>

      <Header title={title} alignment="center" />

      <Slider.NextButton
        id={nextButtonId}
        class="justify-center go btn btn-circle border disabled:border-neutral border-neutral disabled:bg-white bg-white rounded-full cursor-pointer"
      >
        <Icon
          class="text-primary"
          size={20}
          id="ChevronRight"
          strokeWidth={2}
        />
      </Slider.NextButton>
    </div>
  );
};

export default ProductShelf;
