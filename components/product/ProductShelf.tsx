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
import { Device } from "deco/utils/device.ts";

export interface Props {
  products: Product[] | null;
  mobileTitle?: string;
  desktopTitle?: string;

  /** @description used for analytics event */

  itemListName?: string;
  cardLayout?: CardLayout;
  hasNotFoundPage?: boolean;
}

function ProductShelf({
  products,
  desktopTitle,
  mobileTitle,
  device,
  itemListName,
  cardLayout,
  hasNotFoundPage,
}: SectionProps<typeof loader>) {
  const id = useId();
  const prevButtonId = useId();
  const nextButtonId = useId();
  const arrowsvVisibleTop = hasNotFoundPage && device === "mobile";
  const isMobile = device === "mobile";
  const currentTitle = isMobile ? mobileTitle : desktopTitle;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container">
      {arrowsvVisibleTop && currentTitle
        ? (
          <HeaderWithArrows
            title={isMobile ? mobileTitle : desktopTitle}
            prevButtonId={prevButtonId}
            nextButtonId={nextButtonId}
          />
        )
        : (
          currentTitle && (
            <Header
              title={isMobile ? mobileTitle : desktopTitle}
              alignment={isMobile ? "left" : "center"}
            />
          )
        )}

      <div id={id} class="container grid grid-cols-[48px_1fr_48px] pb-28">
        <Slider class="carousel carousel-start sm:carousel-end  md:gap-8 justify-between col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item pl-6 sm:pl-0 last:pr-6 sm:last:pr-0 lg:w-[calc(25%-30px)] sm:w-[calc(33.3%-30px)] w-2/3"
            >
              <ProductCard
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
            class="justify-center btn btn-circle border disabled:border-neutral border-neutral disabled:bg-white bg-white z-10 absolute left-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer"
          >
            <Icon
              class="text-primary"
              size={20}
              id="ChevronLeft"
              strokeWidth={2}
            />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton
            id={nextButtonId}
            class="justify-center btn btn-circle disabled:border-neutral border-neutral disabled:bg-white bg-white z-10 absolute right-[-18px] top-[calc(50%-18px)] hidden sm:flex rounded-full cursor-pointer"
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
          disabledArrowColor="#666666"
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
