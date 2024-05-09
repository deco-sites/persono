import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  sectionMenu: SectionMenu[];
  currentSection: SectionMenu | undefined;
  pathname: string;
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

function AsideMenuMobile(
  { sectionMenu, pathname, currentSection }: Props,
) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (openCollapse) {
      const timeoutId = setTimeout(() => {
        setShowContent(true);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      setShowContent(false);
    }
  }, [openCollapse]);

  useEffect(() => {
    if (!showContent) {
      const timeoutId = setTimeout(() => {
        setOpenCollapse(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [showContent]);

  return (
    <div class={`${openCollapse? "" : "mb-8"}`}>
      <div
        class={`fixed w-full h-full bg-white transition-[max-height] duration-300 ease-linear left-0 top-0 z-10 flex ${
          openCollapse ? "max-h-screen" : "max-h-0"
        } `}
      />
      <div
        class={`lg:hidden w-full flex flex-col container z-20 ${
          openCollapse ? "fixed px-8 left-0" : "relative"
        }`}
      >
        <button
          class="flex justify-between w-full text-white px-3 py-2 bg-black rounded-full"
          onClick={() => setOpenCollapse(!openCollapse)}
        >
          {currentSection?.sectionTitle}
          <Icon
            id="ChevronDown"
            class={`${openCollapse ? "rotate-180" : ""}`}
            width={26}
            height={26}
          />
        </button>
        <section
          class={`w-full bg-white flex flex-col transition-[max-height] duration-500 ease-linear ${
            openCollapse ? "max-h-screen " : "max-h-0 "
          } overflow-hidden`}
        >
          <section
            class={`menu px-4 pb-4 `}
          >
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
          </section>
        </section>
      </div>
    </div>
  );
}

export default AsideMenuMobile;
