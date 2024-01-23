import { Bag, BagItems } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

export interface Props {
  bagItems: BagItems[];
}

const action = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Bag> => {
  const {
    bagItems,
  } = props;
  const { ammoc, apiKey } = ctx;
  const headers = getHeaders(req, apiKey);

  try {
    const response = await ammoc
      ["PUT /api/bag/item"](
        {},
        {
          headers: headers,
          body: bagItems,
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
