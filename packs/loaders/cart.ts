import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<Bag | null> => {
  const { ammoc, apiKey } = ctx;
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];
  console.log("passou aqui")
  try {
    const response = await ammoc
      ["GET /api/bag"](
        {
          headers: {
            "x-api-key": apiKey,
            "x-ammo-device-id": deviceId,
          },
        },
      );

    const bag = await response.json();

    if (bag) return bag.data.bag;

    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export default loader;
