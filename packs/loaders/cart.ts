import { Bag } from "../types.ts";
import { AppContext } from "../../apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "../constants.ts";

const loader = async (
  _props: null,
  _req: Request,
  _ctx: AppContext,
): Promise<Bag | null> => {
  const { ammoc, apiKey } = _ctx;

  const cookies = getCookies(_req.headers);

  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];

  try {
    const response = await ammoc
      ["GET /bag"](
        {
          headers: {
            "x-api-key": apiKey,
            "x-ammo-device-id": deviceId,
          },
        },
      );

    const bag = await response.data.json();

    if (bag) return bag;

    return null;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default loader;
