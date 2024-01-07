import { DecoRequestInit } from "apps/utils/fetch.ts";

export const AMMO_DEVICE_ID_HEADER = "X-Ammo-Device-Id";
export const AMMO_TOKEN_HEADER = "X-Ammo-Token";
export const DECO_CACHE_OPTION = { cache: "stale-while-revalidate" } as DecoRequestInit["deco"];