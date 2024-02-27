import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { SkuSubscribeData } from "$store/packs/types.ts";

interface Props {
  /**
   * @title Email
   */
  email: string;
  /**
   * @title Sku
   */
  sku: string;
}

/**
 * @title Ammo Varejo - Inscrição em SKU
 */

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<SkuSubscribeData | null> => {
  const { ammoc } = ctx;

  const headers = getHeaders(req, ctx);
  const { email, sku } = props;

  try {
    const res = await ammoc["POST /api/sku-availability-subscription"](
      {},
      {
        headers: headers,
        body: {
          sku,
          email,
        },
      },
    );
    const { data } = await res.json();

    return data as SkuSubscribeData;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default loader;
