import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

const action = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<Bag> => {
  const { ammoc, apiKey } = ctx;
  const headers = getHeaders(req, apiKey);

  try {
    const response = await ammoc
      ["POST /api/bag/coupon/remove"](
        {},
        {
          headers: headers,
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
