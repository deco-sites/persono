export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row lg:gap-20 gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2 text-sm">
                  <span class="font-bold">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap`}>
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block link link-hover">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow text-sm">
                  <input
                    type="checkbox"
                    class="min-h-[0]"
                    aria-label={section.label + " footer Item"}
                  />
                  <div class="collapse-title font-bold min-h-[0] !p-0 flex gap-2">
                    <span>{section.label}</span>
                  </div>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pl-0 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
