import { DecoRequestInit } from "apps/utils/fetch.ts";

export const AMMO_DEVICE_ID_HEADER = "X-Ammo-Device-Id";
export const AMMO_TOKEN_HEADER = "X-Ammo-Token";
export const DECO_CACHE_OPTION = { cache: "stale-while-revalidate" } as DecoRequestInit["deco"];
export const IMAGES_LARGE_URL = "https://images-prod.mmartan.com.br/1536x1536/jpg"
export const IMAGES_SMALL_URL = "https://images-prod.mmartan.com.br/380x380/jpg"