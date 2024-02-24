import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import type { Section } from "deco/blocks/section.ts";
interface TextConfigProps {
  productSettings?: {
    title: string;
    subtitle: string;
  };

  pageSettings?: {
    title: string;
    subtitle: string;
    redirectButtonText: string;
  };
}

export interface EditableProps {
  /**
   * @description Add $q in the title of the product settings to the place where the search term should be inserted. ex: No results found for "$q"."
   */
  textConfig?: TextConfigProps;
  children?: Section;
}

interface Props {
  notFoundSettings?: EditableProps;
  queryTerm?: string | null;
  device: string;
}

export const NotFound = ({ queryTerm, device, notFoundSettings }: Props) => {
  const { children, textConfig } = notFoundSettings ?? {};
  const { pageSettings, productSettings } = textConfig ?? {};
  const isMobile = device !== "desktop";

  const currentTitle = queryTerm
    ? productSettings?.title.replaceAll("$q", queryTerm)
    : pageSettings?.title;

  const currentSubtitle = queryTerm
    ? productSettings?.subtitle
    : pageSettings?.subtitle;

  return (
    <div class=" w-full flex flex-col items-center justify-center py-20 gap-1 px-3 ">
      <Icon id="MagnifyingGlassFound" height={49} width={49} />
      <span class="font-medium text-center text-2xl mt-4 text-black">
        {currentTitle}
      </span>
      {isMobile || queryTerm ? (
        <span class="font-normal text-base text-center text-black mb-24">
          {currentSubtitle}
        </span>
      ) : (
        <a
          href="/"
          class="btn no-animation text-md font-bold text-white bg-primary mt-6 mb-24"
        >
          {pageSettings?.redirectButtonText}
        </a>
      )}

      {children && <children.Component {...children.props} />}
    </div>
  );
};
