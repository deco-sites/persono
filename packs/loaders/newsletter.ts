import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
import { NewsletterData } from "$store/packs/types.ts";

interface Props {
  /**
   * @title Email
   */
  email: string;
}

/**
 * @title Ammo Varejo - Inscrição na Newsletter
 */

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<NewsletterData | null> => {
  const { ammoc } = ctx;

  const headers = getHeaders(req, ctx);
  const { email } = props;

  try {
    const res = await ammoc["POST /api/newsletters"](
      {},
      {
        headers: headers,
        body: {
          email,
        },
      },
    );
    const { data } = await res.json();

    return data as NewsletterData;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default loader;
