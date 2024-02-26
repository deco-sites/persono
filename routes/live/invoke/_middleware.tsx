import { getCookies } from "std/http/mod.ts";
import { FreshContext } from "$fresh/server.ts";
import { DecoState } from "deco/types.ts";
import { CookieNames } from "$store/packs/types.ts";

const setCookies = (res: Response, deviceId: string, cookieName: string) => {
  res.headers.append(
    "Set-Cookie",
    `${cookieName}=${deviceId}; Expires=${new Date().setFullYear(
      new Date().getFullYear() + 1
    )}; Path=/; Secure; HttpOnly`
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
  >
) => {
  const res = await ctx.next!();
  const cookies = getCookies(req.headers);

  const cookieNames = (await ctx.state.invoke(
    "Cookie Config Names"
  )) as CookieNames;
  const AMMO_DEVICE_ID_HEADER = cookieNames.ammoDeviceIdCookie;

  if (cookies[AMMO_DEVICE_ID_HEADER]) return res;

  const deviceId = crypto.randomUUID();

  setCookies(res, deviceId, AMMO_DEVICE_ID_HEADER);

  return res;
};
