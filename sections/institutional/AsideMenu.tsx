import type { SectionProps } from "deco/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import AsideMenuMobile from "deco-sites/persono/islands/AsideMenuMobile.tsx";

export interface Props {
  sectionMenu: SectionMenu[];
}

//@title {{{sectionTitle}}}
interface SectionMenu {
  sectionTitle: string;
  sectionLink?: string;
  menuItems: {
    label: string;
    href: string;
  }[];
}

export function loader(ctx: Props, req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  const currentSection = ctx.sectionMenu.find((sectionItem) =>
    "/" + pathname.split("/")[1] + sectionItem?.sectionLink === pathname
  );

  return {
    ...ctx,
    pathname,
    currentSection,
  };
}

function AsideMenu(
  { sectionMenu, pathname, currentSection }: SectionProps<
    typeof loader
  >,
) {
  return (
    <aside class="lg:min-w-[200px]">
      <ul class="w-full flex-col gap-2 hidden lg:flex">
        {sectionMenu.map((sectionItem) => (
          <li>
            <div class="mb-2">
              {sectionItem?.sectionLink
                ? (
                  <a
                    class={`hover:text-primary ${
                      currentSection?.sectionLink === sectionItem?.sectionLink
                        ? "text-primary"
                        : ""
                    }`}
                    href={"/" + pathname.split("/")[1] +
                      sectionItem?.sectionLink}
                  >
                    {sectionItem?.sectionTitle}
                  </a>
                )
                : sectionItem?.sectionTitle}
            </div>
            {sectionItem?.menuItems.map(
              (item, index) => (
                <div class="flex items-center gap-2 text-sm mb-2" key={index}>
                  <Icon
                    width={16}
                    class="text-[#999]"
                    height={16}
                    id="ArrowRight"
                  />
                  <a
                    class="hover:text-primary"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </div>
              ),
            )}
          </li>
        ))}
      </ul>
      <AsideMenuMobile currentSection={currentSection} pathname={pathname} sectionMenu={sectionMenu}/>
    </aside>
  );
}

export default AsideMenu;
