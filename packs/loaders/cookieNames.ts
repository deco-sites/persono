import { CookieNames } from "$store/packs/types.ts";

interface Props {
  cookies: CookieNames;
}

const loader = ({ cookies }: Props): CookieNames => cookies;

export default loader;
