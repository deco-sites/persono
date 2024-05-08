import type { SectionProps } from "deco/types.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

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
      <div class="lg:hidden w-full sm:pb-5 pb-8 ">
        <details class="dropdown w-full h-[70%] overflow-y-scroll text-sm font-normal static group open:left-0 open:px-8 open:fixed z-10">
          {/* Overlay div */}
          <div class="h-[100vh] fixed bg-base-100 w-full z-10 group-open:flex hidden top-4 left-0" />
          <summary class="btn text-sm font-normal relative z-20 w-full btn-secondary justify-between border-none">
            {currentSection?.sectionTitle}
            <Icon
              id="ChevronDown"
              class="group-open:rotate-180"
              width={26}
              height={26}
            />
          </summary>
          <ul class="menu flex-nowrap dropdown-content z-10 bg-base-100 mt-5 rounded-box w-full gap-2 left-0 px-8 h-full">
            {sectionMenu.map((sectionItem) => (
              <>
                <li class=" sm:text-md text-base">
                  <div class="">
                    {sectionItem?.sectionLink
                      ? (
                        <a
                          class={`hover:text-primary ${
                            currentSection?.sectionLink ===
                                sectionItem?.sectionLink
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
                </li>
                {sectionItem?.menuItems.map(
                  (item, index) => (
                    <li class="" key={index}>
                      <a
                        class="sm:ml-0 ml-1 flex gap-2 items-center"
                        href={item.href}
                      >
                        <Icon
                          width={20}
                          class="text-[#999] p-0"
                          height={20}
                          id="ArrowRight"
                        />
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </>
            ))}
          </ul>
        </details>
      </div>
    </aside>
  );
}

export default AsideMenu;
