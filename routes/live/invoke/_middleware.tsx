import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";
import { FreshContext } from "$fresh/server.ts";
import { DecoState } from "deco/types.ts";



const setCookies = (res: Response, deviceId: string) => {
  res.headers.append(
    "Set-Cookie",
    `${AMMO_DEVICE_ID_HEADER}=${deviceId}; Expires=${
      new Date().setFullYear(
        new Date().getFullYear() + 1,
      )
    }; Path=/; Secure; HttpOnly`,
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
>,) => {
  const res = await ctx.next!();
  const cookies = getCookies(req.headers);

  const deviceId = crypto.randomUUID();

  if (cookies[AMMO_DEVICE_ID_HEADER]) return res;

  setCookies(res, deviceId);

  return res;
};
