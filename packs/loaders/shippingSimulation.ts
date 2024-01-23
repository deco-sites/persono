import { ShippingSimulation } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

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
  const headers = getHeaders(req, apiKey, true);

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
          headers: headers,
        },
      );

    const { data } = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default loader;
