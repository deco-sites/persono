import { Section } from "deco/blocks/section.ts";
import type { SectionProps } from "deco/types.ts";

export interface Props {
  title: string;
  asideMenu: Section;
  sections: Page[];
}

// @title {{{title}}}
interface Page {
  section: Section[];
  title: string;
  url: string;
}

function InstitutionalPage({
  pathname,
  asideMenu: { Component: AsideComponent, props: asideProps },
  sections,
  title,
}: SectionProps<
  typeof loader
>) {
  const acctualSection = sections.find((sec) => pathname == sec.url);

  return (
    <>
      <>
        <div class="container flex flex-col lg:flex-row w-full mt-20 mb-28">
          <div class="w-full max-w-[220px]">
            <AsideComponent {...asideProps} />
          </div>
          <article class="w-full ml-24">
            <h3 class="text-3xl font-medium mb-10 lg:block max-w-[900px]">
              {acctualSection?.title ?? title}
            </h3>
            {acctualSection?.section.map(({ Component, props }) => (
              <Component {...props} />
            ))}
          </article>
        </div>
      </>
    </>
  );
}

export function loader(ctx: Props, req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  return {
    ...ctx,
    pathname,
  };
}

export default InstitutionalPage;
