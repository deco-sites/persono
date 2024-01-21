import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

export function getHeaders(
  req: Request,
  apiKey: string,
  urlenconded = false,
) {
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];
  const token = cookies["X-Ammo-Token:"];

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
