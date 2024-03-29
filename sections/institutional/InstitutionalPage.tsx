import { Section } from "deco/blocks/section.ts";

export interface Props {
  title: string;
  asideMenu: Section;
  sections: Section[];
}

function InstitutionalPage({
  asideMenu: { Component: AsideComponent, props: asideProps },
  sections,
  title,
}: Props) {
  return (
    <>
      <>
        <div class="flex flex-col lg:flex-row px-4 w-full mt-[15px]">
          <div class="lg:max-w-[20%] max-w-full w-full">
            <AsideComponent {...asideProps} />
          </div>
          <article class="lg:pl-[30px] pl-0 max-w-full lg:max-w-[80%] w-full">
            <h3 class="hidden uppercase text-primary text-2xl font-medium leading-[36px] mb-5 border-b border-neutral-100 pb-[10px] lg:block">
              {title}
            </h3>
            {sections.map(({ Component, props }) => <Component {...props} />)}
          </article>
        </div>
      </>
    </>
  );
}

export default InstitutionalPage;
