import { Bag } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

export interface Props {
  sku: string;
}

/**
 * @title Ammo Varejo - Remoção de item na sacola
 */
const action = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Bag | undefined> => {
  const {
    sku,
  } = props;
  const { ammoc } = ctx;
  const headers = getHeaders(req, ctx);

  try {
    const response = await ammoc
      ["DELETE /api/bag/sku/:sku"](
        { sku },
        {
          headers: headers,
        },
      );

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export default action;
