import { getCookies } from "std/http/mod.ts";
import { FreshContext } from "$fresh/server.ts";
import { DecoState } from "deco/types.ts";
import { CookieNames } from "$store/packs/types.ts";

const setCookies = (res: Response, deviceId: string, cookieName: string) => {
  res.headers.append(
    "Set-Cookie",
    `${cookieName}=${deviceId}; Expires=${new Date(
      Date.now() + 365 * 864e5,
    )}; Path=/; Secure; HttpOnly`,
  );
};

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

  if (cookies[AMMO_DEVICE_ID_HEADER]) return res;

  const url = new URL(req.headers.get("referer") ?? req.url);
  const TOKENS_URL_HEADER = cookieNames.queryStringTokens;
  const defaultToken = {
    [AMMO_DEVICE_ID_HEADER]: crypto.randomUUID(),
    [cookieNames.creationDateCookie]: new Date().getTime().toString(),
    [cookieNames.expirationDaysCookie]: "-1",
  };

  const tokens = TOKENS_URL_HEADER.reduce(
    (acc, { queryStringName, cookieName }) => {
      const rawToken = url.searchParams.get(queryStringName);
      if (!rawToken) {
        return acc;
      }

      const newToken = {
        [cookieName]: rawToken,
        [cookieNames.creationDateCookie]: new Date().getTime().toString(),
        [cookieNames.expirationDaysCookie]: "-1",
      };

      if (cookieName === AMMO_DEVICE_ID_HEADER) {
        const index = acc.indexOf(defaultToken);
        acc[index] = newToken;
        return acc;
      }

      return [...acc, newToken];
    },
    [defaultToken],
  );

  const cookieObj = defaultToken;

  setCookies(res, btoa(JSON.stringify(cookieObj)), AMMO_DEVICE_ID_HEADER);

  return res;
};
