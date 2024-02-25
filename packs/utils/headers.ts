import { getCookies } from "std/http/mod.ts";
import { AppContext } from "$store/apps/site.ts";
import { getSiteCookies } from "$store/packs/utils/utils.ts";
export function getHeaders(
  req: Request,
  ctx: AppContext,
  urlenconded?: boolean,
) {
  const { apiKey, cookieNames } = ctx;

  const { AMMO_DEVICE_ID_HEADER, AMMO_TOKEN_HEADER } = getSiteCookies(cookieNames);
  const cookieSite = getCookies(req.headers);
  const deviceId = cookieSite[AMMO_DEVICE_ID_HEADER];
  const token = cookieSite[AMMO_TOKEN_HEADER];

  const headers = new Headers({
    "x-api-key": apiKey,
    "x-ammo-device-id": deviceId,
    "x-ammo-token": token,
  });

  if (urlenconded) {
    headers.append("Content-Type", "application/x-www-form-urlencoded");
  }

  return headers;
}
