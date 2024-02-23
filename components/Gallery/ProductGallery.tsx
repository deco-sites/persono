import type { Product } from "apps/commerce/types.ts";
import ProductCard, {
  Layout as CardLayout,
} from "deco-sites/persono/components/product/ProductCard/index.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

import { SectionProps } from "deco/mod.ts";
import { FnCustomContext } from "deco-sites/persono/packs/types.ts";

export interface Props {
  products: Product[] | null;
  mobileTitle?: string;
  desktopTitle?: string;

  /** @description used for analytics event */

  itemListName?: string;
  cardLayout?: CardLayout;
  hasNotFoundPage?: boolean;
}

function ProductGallery({
  products,
  desktopTitle,
  mobileTitle,
  device,
  itemListName,
  cardLayout,
  hasNotFoundPage,
}: SectionProps<typeof loader>) {
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

      <div class="container grid grid-cols-[48px_1fr_48px] pb-28">
        {products?.map((product, index) => (
          <ProductCard
            layout={cardLayout}
            itemListName={itemListName}
            product={product}
            index={index}
          />
        ))}
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
}: {
  title?: string;
}) => {
  return (
    <div class="w-full flex justify-around items-center ">
      <Header title={title} alignment="center" />
    </div>
  );
};

export default ProductGallery;
