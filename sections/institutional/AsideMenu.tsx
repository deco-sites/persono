import type { SectionProps } from "deco/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

export interface Props {
  sectionMenu: {
    sectionTitle: string;
    sectionLink?: string;
    menuItems: {
      label: string;
      href: string;
    }[];
  }[];
  /**
   * @default center
   */
  desktopButtonAlign?: "center" | "left";
}

export function loader(ctx: Props, req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  return {
    ...ctx,
    pathname,
  };
}

function AsideMenu(
  { sectionMenu, pathname: currentUrl, desktopButtonAlign }: SectionProps<
    typeof loader
  >,
) {
  const currentSection = sectionMenu.find((sectionItem) =>
    sectionItem?.menuItems.find((item) => item.href === currentUrl)
  );

  const currentRoute = currentSection?.menuItems.find((item) =>
    item.href === currentUrl
  );

  return (
    <aside class="lg:min-w-[200px]">
      <ul class="w-full flex flex-col gap-2">
        {sectionMenu.map((sectionItem) => (
          <li>
            <div class="mb-2">
              {sectionItem?.sectionLink
                ? (
                  <a href={sectionItem?.sectionLink}>
                    {sectionItem?.sectionTitle}
                  </a>
                )
                : sectionItem?.sectionTitle}
            </div>
            {sectionItem?.menuItems.map(
              (item, index) => (
                <div class="flex items-center gap-2 text-sm" key={index}>
                  <Icon
                    width={16}
                    class="text-[#999]"
                    height={16}
                    id="ArrowRight"
                  />
                  <a
                    class=""
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
      <div class="lg:hidden w-full pb-5">
        <div class="dropdown w-full text-sm font-normal">
          <label
            tabIndex={0}
            class="btn btn-secondary btn-block justify-between border-none"
          >
            {currentRoute?.label ?? "Menu"}
            <Icon id="ChevronDown" width={26} height={26} />
          </label>
          <ul class="shadow menu dropdown-content z-10 bg-base-100 mt-5 rounded-box w-full gap-2">
            {sectionMenu.map((sectionItem) => (
              <>
                <li class="text-primary font-semibold">
                  {sectionItem?.sectionTitle}
                </li>
                {sectionItem?.menuItems.map(
                  (item, index) => (
                    <li key={index}>
                      <Icon id="ArrowRight" />
                      <a
                        class=""
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
