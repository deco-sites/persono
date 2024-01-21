import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

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
  const headers = getHeaders(req, apiKey);

  try {
    const response = await ammoc
      ["POST /api/bag/coupon"](
        {},
        {
          headers: headers,
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
