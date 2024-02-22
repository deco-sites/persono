import { Product } from "apps/commerce/types.ts";
import ProductCard, {
  Layout as CardLayout,
} from "deco-sites/persono/components/product/ProductCard/index.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
  tablet?: 2 | 3 | 4;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    columns?: Columns;
  };
  cardLayout?: CardLayout;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const TABLET_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const DESKTOP_COLUMNS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

function ProductGallery({ products, layout, offset, cardLayout }: Props) {
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];
  const tablet = TABLET_COLUMNS[layout?.columns?.tablet ?? 3];

  return (
    <div class={`grid ${mobile} ${tablet} gap-x-2 gap-y-7 ${desktop} sm:gap-x-7 sm:gap-y-6 md:gap-x-11 md:gap-y-8`}>
      {products?.map((product, index) => (
        <ProductCard
          layout={cardLayout}
          product={product}
          preload={index === 0}
          index={offset + index}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
