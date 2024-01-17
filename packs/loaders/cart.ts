import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<Bag> => {
  const { ammoc, apiKey } = ctx;
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];

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

    const { data } = await response.json();

    return data?.bag;
  } catch (error) {
    throw new Error(error);
  }
};

export default loader;
