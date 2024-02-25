import { CookieNames } from "$store/packs/types.ts";

interface Props {
  cookies: CookieNames;
}

/**
 * @title Ammo Varejo - Configuração de nomes dos cookies da página
 */
const loader = ({ cookies }: Props): CookieNames => cookies;

export default loader;
