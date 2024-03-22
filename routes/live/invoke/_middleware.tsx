import { getCookies } from "std/http/mod.ts";
import { FreshContext } from "$fresh/server.ts";
import { DecoState } from "deco/types.ts";
import {
  CookieNames,
  QueryStringToken as BaseQSToken,
} from "$store/packs/types.ts";

interface QueryStringToken extends BaseQSToken {
  rawToken: string;
}

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
  const url = new URL(req.headers.get("referer") ?? req.url);
  const cookies = getCookies(req.headers);
  //console.log(url);
  const cookieNames = (await ctx.state.invoke(
    "Cookie Config Names",
  )) as CookieNames;

  const AMMO_DEVICE_ID_HEADER = cookieNames.ammoDeviceIdCookie;
  const TOKENS_URL_HEADER = cookieNames.queryStringTokens;

  const queryStringTokens = TOKENS_URL_HEADER.reduce<QueryStringToken[]>(
    (acc, { queryStringName, cookieName }) => {
      const rawToken = url.searchParams.get(queryStringName);
      if (!rawToken) {
        return acc;
      }
      return [...acc, { rawToken, queryStringName, cookieName }];
    },
    [],
  );

  if (cookies[AMMO_DEVICE_ID_HEADER]) return res;


  const cookieObj = {
    [AMMO_DEVICE_ID_HEADER]: crypto.randomUUID(),
    [cookieNames.creationDateCookie]: new Date().getTime().toString(),
    [cookieNames.expirationDaysCookie]: "-1",
  };

  setCookies(res, btoa(JSON.stringify(cookieObj)), AMMO_DEVICE_ID_HEADER);

  return res;
};
