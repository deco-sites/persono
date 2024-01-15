import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

export interface Props {
  coupon: string;
}

const action = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Bag> => {
  const {
    coupon,
  } = props;
  const { ammoc, apiKey } = ctx;
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];

  try {
    const response = await ammoc
      ["POST /api/bag/coupon"](
        {},
        {
          headers: {
            "x-api-key": apiKey,
            "x-ammo-device-id": deviceId,
          },
          body: {
            coupon,
          },
        },
      );

    const bag = await response.json();

    return bag.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default action;
