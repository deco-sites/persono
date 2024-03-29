import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

/**
 * @title Ammo Varejo - Remoção de cupom na sacola
 */
const action = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<Bag> => {
  const { ammoc } = ctx;
  const headers = getHeaders(req, ctx);

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
