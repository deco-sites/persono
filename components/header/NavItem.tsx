import Image from "apps/website/components/Image.tsx";
import type { SiteNavigationElement } from "deco-sites/persono/components/header/Menu.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="pt-3 flex items-center gap-2">
        <span class="group-hover:text-primary">
          {name}
        </span>
        {children && children.length > 0
          ? (
            <>
              <Icon
                id="ChevronDown"
                class="group-hover:hidden block"
                size={14}
              />
              <Icon id="ChevronUp" class="group-hover:block hidden" size={14} />
            </>
          )
          : null}
      </a>

      {children && children.length > 0 &&
        (
          <>
            <div class="-z-10 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.14)] border-t border-base-200 left-1/2 top-full -translate-x-1/2 w-[85%] absolute hidden hover:flex group-hover:flex bg-base-100 items-start self-stretch justify-between gap-6 py-10 px-20 rounded-b-[20px]">
              <ul class="flex flex-col justify-start gap-5 py-2">
                {children.map((node) => (
                  <li class="">
                    <a class="hover:text-primary" href={node.url}>
                      {node.name}
                    </a>
                  </li>
                ))}
              </ul>
              {image?.url && (
                <Image
                  class="rounded-xl"
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={349}
                  loading="lazy"
                />
              )}
            </div>
            <div class="group-hover:block hidden absolute w-screen h-screen bg-black opacity-[15%] top-0 left-0 -translate-x-[7%] -z-20 pointer-events-none" />
          </>
        )}
    </li>
  );
}

export default NavItem;
