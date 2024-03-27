import { AppContext } from "$store/apps/site.ts";
import { getSiteCookies } from "$store/packs/utils/utils.ts";
import { StringCodec } from "deco-sites/persono/packs/utils/stringCodec.ts";
import { getCookies } from "std/http/mod.ts";
export function getHeaders(
  req: Request,
  ctx: AppContext,
  urlenconded?: boolean,
) {
  const { apiKey, cookieNames } = ctx;

  const { AMMO_DEVICE_ID_HEADER, AMMO_TOKEN_HEADER } = getSiteCookies(
    cookieNames,
  );
  const cookieSite = getCookies(req.headers);
  const deviceId = parseCookie(AMMO_DEVICE_ID_HEADER, cookieSite);
  const token = parseCookie(AMMO_TOKEN_HEADER, cookieSite);

  const headers = new Headers({
    "x-api-key": apiKey,
  });

  if (deviceId) {
    headers.append("x-ammo-device-id", deviceId);
  }

  if (token) {
    headers.append("x-ammo-token", token);
  }

  if (urlenconded) {
    headers.append("Content-Type", "application/x-www-form-urlencoded");
  }

  return headers;
}

function parseCookie(key: string, cookies: Record<string, string>) {
  const rawValue = cookies[key];

  if (!rawValue) {
    return null;
  }

  try {
    const decodedRawValue = StringCodec.decode(rawValue);

    return decodedRawValue[key];
  } catch (_e) {
    return null;
  }
}
