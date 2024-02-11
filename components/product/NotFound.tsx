/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */

import { type SectionProps } from "deco/mod.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { FnContext } from "deco/types.ts";

interface SubtitleProps {
  notFoundProductSubtitle: string;
  notFoundPageSubtitle: string;
  notFoundPageButtonText: string;
}

interface Props extends SubtitleProps {
  /**
   * @description Adicione $term para no local que o termo buscado devera ser inserido. ex: Nenhum resultado encontrado para "$term".
   * */
  notFoundProductTitle: string;

  notFoundPageTitle: string;
}

interface SubtitleComponent extends SubtitleProps {
  isMobile: boolean;
  notFoundTerm: string | null;
}

export const Subtitle = ({
  isMobile,
  notFoundPageButtonText,
  notFoundPageSubtitle,
  notFoundProductSubtitle,
  notFoundTerm,
}: SubtitleComponent) => {
  const subtitleText = (
    <span class="font-normal text-base text-center text-black">
      {notFoundTerm ? notFoundProductSubtitle : notFoundPageSubtitle}
    </span>
  );

  if (notFoundTerm) {
    return subtitleText;
  }

  return (
    <>
      {isMobile ? (
        subtitleText
      ) : (
        <a
          href="/"
          class="btn no-animation text-md font-bold text-white bg-primary mt-6"
        >
          {notFoundPageButtonText}
        </a>
      )}
    </>
  );
};

function NotFound({
  notFoundPageTitle,
  notFoundProductSubtitle,
  notFoundProductTitle,
  notFoundPageButtonText,
  notFoundTerm,
  notFoundPageSubtitle,
  isMobile,
}: SectionProps<typeof loader>) {
  const currentTitle = notFoundTerm
    ? notFoundProductTitle.replaceAll("$term", notFoundTerm)
    : notFoundPageTitle;

  return (
    <div class=" w-full flex flex-col items-center justify-center py-20 gap-1 px-3 ">
      <Icon id="MagnifyingGlassFound" height={49} width={49} />
      <span class="font-medium text-center text-2xl mt-4 text-black">
        {currentTitle}
      </span>
      <Subtitle
        isMobile={isMobile}
        notFoundTerm={notFoundTerm}
        notFoundPageButtonText={notFoundPageButtonText}
        notFoundPageSubtitle={notFoundPageSubtitle}
        notFoundProductSubtitle={notFoundProductSubtitle}
      />
    </div>
  );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const url = new URL(req.url);
  const notFoundTerm = url.searchParams.get("term");
  const isMobile = ctx.device === "mobile";

  return {
    notFoundTerm,
    isMobile,
    ...props,
  };
};

export default NotFound;
