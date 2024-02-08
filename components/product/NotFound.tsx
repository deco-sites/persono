/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */

import { redirect, type SectionProps } from "deco/mod.ts";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

interface Props {
  /**
   * @title Titulo com  termo
   * @description Adicione $term para no local que o termo buscado devera ser inserido. ex: Nenhum resultado encontrado para "$term".
   * */
  titleWithTerm: string;
  /**
   * @title Titulo sem Termo
   * */
  titleWithoutTerm: string;
  subtitle: string;
}

function NotFound({
  subtitle,
  titleWithTerm,
  notFoundTerm,
  titleWithoutTerm,
}: SectionProps<typeof loader>) {
  const replacedTitle = notFoundTerm
    ? titleWithTerm.replaceAll("$term", notFoundTerm)
    : titleWithoutTerm;

  return (
    <div class=" w-full flex flex-col items-center justify-center py-20 gap-1">
      <Icon id="MagnifyingGlassFound" height={49} width={49} />
      <span class="font-medium text-2xl mt-4 text-black">{replacedTitle}</span>
      <span class="font-normal text-base text-black">{subtitle}</span>
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);
  const notFoundTerm = url.searchParams.get("term");

  return {
    notFoundTerm,
    ...props,
  };
};

export default NotFound;
