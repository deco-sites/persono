import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  productsQtt?: number;
  showBreadcrumbProductQty?: boolean;
}

function Breadcrumb(
  { itemListElement = [], productsQtt, showBreadcrumbProductQty }: Props,
) {
  const items = itemListElement;

  return (
    <div class="breadcrumbs py-0 flex text-sm items-center gap-2">
      <ul>
        {items
          .filter(({ name }) => name)
          .map(({ name, item }) => (
            <li class="before:text-black before:!opacity-100 link">
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
      {productsQtt && showBreadcrumbProductQty && (
        <p class="text-gray-500">({productsQtt} produtos)</p>
      )}
    </div>
  );
}

export default Breadcrumb;
