import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  productsQtt?: number;
}

function Breadcrumb({ itemListElement = [], productsQtt }: Props) {
  const items = itemListElement;

  return (
    <div class="breadcrumbs flex text-sm items-center gap-2">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="before:text-black before:!opacity-100 link hover:text-blueNew">
              <a class="link hover:text-blueNew" href={item}>{name}</a >
            </li>
          ))}
      </ul>
      {productsQtt
        ? <p class="text-gray-500">({productsQtt} produtos)</p>
        : null}
    </div>
  );
}

export default Breadcrumb;
