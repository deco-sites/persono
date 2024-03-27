import { getCookies } from "std/http/mod.ts";
import { FreshContext } from "$fresh/server.ts";
import { DecoState } from "deco/types.ts";
import { CookieNames } from "$store/packs/types.ts";
import { encodeCookie } from "$store/packs/utils/utils.ts";

interface CookieObject {
  name: string;
  value: string;
}

const setCookies = (
  res: Response,
  cookiesObj: CookieObject[],
  domain: string,
) =>
  cookiesObj.map(({ name, value }) =>
    res.headers.append(
      "Set-Cookie",
      `${name}=${value}; Expires=${new Date(
        Date.now() + 365 * 864e5,
      )}; Path=/; Secure; Domain=${domain}`,
    )
  );

export const handler = async (
  req: Request,
  ctx: FreshContext<
    DecoState<
      Record<string | number | symbol, never>,
      Record<string | number | symbol, never>,
      //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
      Manifest
    >
  >,
) => {
  const res = await ctx.next!();
  const cookies = getCookies(req.headers);
  const cookieNames = (await ctx.state.invoke(
    "Cookie Config Names",
  )) as CookieNames;

  const AMMO_DEVICE_ID_HEADER = cookieNames.ammoDeviceIdCookie;
  const AMMO_TOKEN_HEADER = cookieNames.ammoTokenCookie;

  if (cookies[AMMO_TOKEN_HEADER]) return res;

  const url = new URL(req.headers.get("referer") ?? req.url);

  const TOKENS_URL_HEADER = cookieNames.queryStringTokens;

  const cookiesFromUrl = TOKENS_URL_HEADER.reduce<CookieObject[]>(
    (acc, { queryStringName, cookieName }) => {
      const rawToken = url.searchParams.get(queryStringName);

      if (rawToken) {
        return [...acc, {
          name: cookieName,
          value: encodeCookie({
            [cookieName]: rawToken,
            [cookieNames.creationDateCookie]: new Date().getTime().toString(),
            [cookieNames.expirationDaysCookie]: "-1",
          }),
        }];
      }

      return acc;
    },
    [],
  );

  const hasDeviceCookie = !!cookies[AMMO_DEVICE_ID_HEADER];

  if (hasDeviceCookie && !cookiesFromUrl.length) return res;

  const hasDeviceCookieUrl = cookiesFromUrl.some(({ name }) =>
    name === AMMO_DEVICE_ID_HEADER
  );

  if (!hasDeviceCookie && !hasDeviceCookieUrl) {
    cookiesFromUrl.push({
      name: AMMO_DEVICE_ID_HEADER,
      value: encodeCookie({
        [AMMO_DEVICE_ID_HEADER]: crypto.randomUUID(),
        [cookieNames.creationDateCookie]: new Date().getTime().toString(),
        [cookieNames.expirationDaysCookie]: "-1",
      }),
    });
  }

  const domain = url.origin.includes("localhost") ? "localhost" : ".persono.com.br"

  setCookies(res, cookiesFromUrl, domain);

  return res;
};
