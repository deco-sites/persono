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

  const currentRoute = currentSection?.sectionLink;

  return {
    ...ctx,
    pathname,
    currentRoute
  };
}

function AsideMenu(
  { sectionMenu, pathname: currentUrl, currentRoute }: SectionProps<
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
                      currentRoute === sectionItem?.sectionLink
                        ? "text-primary"
                        : ""
                    }`}
                    href={"/" + currentUrl.split("/")[1] +
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
      <div class="lg:hidden w-full pb-5">
        <div class="dropdown w-full text-sm font-normal">
          <label
            tabIndex={0}
            class="btn btn-secondary btn-block justify-between border-none"
          >
            {"Menu"}
            <Icon id="ChevronDown" width={26} height={26} />
          </label>
          <ul class="shadow menu dropdown-content z-10 bg-base-100 mt-5 rounded-box w-full gap-2">
            {sectionMenu.map((sectionItem) => (
              <>
                <li class="font-semibold">
                  <div class="">
                    {sectionItem?.sectionLink
                      ? (
                        <a
                          class={`hover:text-primary ${
                            currentRoute === sectionItem?.sectionLink
                              ? "text-primary"
                              : ""
                          }`}
                          href={"/" + currentUrl.split("/")[1] +
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
                        class="p-0 flex gap-2 items-center"
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
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
