import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

const action = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<Bag> => {
  const { ammoc, apiKey } = ctx;
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];

  try {
    const response = await ammoc
      ["POST /api/bag/coupon/remove"](
        {},
        {
          headers: {
            "x-api-key": apiKey,
            "x-ammo-device-id": deviceId,
          },
        },
        {},
      );

    const bag = await response.json();

    return bag.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default action;
