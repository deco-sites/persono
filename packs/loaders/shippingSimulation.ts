import { ShippingSimulation } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import { AMMO_DEVICE_ID_HEADER } from "$store/packs/constants.ts";

export interface Props {
  postalCode: string;
  sku: string;
}
const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ShippingSimulation> => {
  const { ammoc, apiKey } = ctx;
  const cookies = getCookies(req.headers);
  const deviceId = cookies[AMMO_DEVICE_ID_HEADER];

  const params = new URLSearchParams();

  params.set("sku", props.sku);
  params.set("postalCode", props.postalCode.replace(/[^0-9\.]+/g, ""));

  try {
    const response = await ammoc
      ["POST /api/bag/shipping/product-page"](
        {},
        {
          body: params,
        },
        {
          headers: {
            "x-api-key": apiKey,
            "x-ammo-device-id": deviceId,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

    const { data } = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default loader;
