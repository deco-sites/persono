import { Bag, BagItems } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

export interface Props {
  bagItems: BagItems[];
}

const action = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Bag | null> => {
  const {
    bagItems,
  } = props;
  const { ammoc, apiKey } = ctx;
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];
  console.log(bagItems);
  try {
    const response = await ammoc
      ["PUT /api/bag/item"](
        {},
        {
          headers: {
            "x-api-key": apiKey,
            "x-ammo-device-id": deviceId,
          },
          body: bagItems,
        },
      );

    const bag = await response.json();

    if (bag) return bag.data;

    return null;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default action;
