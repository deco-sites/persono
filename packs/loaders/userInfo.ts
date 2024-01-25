import { UserInfo } from "$store/packs/types.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";
const loader = async (
  _props: null,
  req: Request,
  ctx: AppContext,
): Promise<UserInfo | null> => {
  const { ammoc, apiKey } = ctx;

  const headers = getHeaders(req, apiKey);

  try {
    const response = await ammoc
      ["GET /api/user"](
        {},
        {
          headers: headers,
        },
      );

    const { data } = await response.json();

    return data;
  } catch {
    return null;
  }
};

export default loader;