import type { VMConfig } from "$store/packs/utils/transform.ts";
import { AppContext } from "$store/apps/site.ts";

const getConfig = async (ctx: AppContext) => {
  const vmConfig = await ctx
    .invoke["deco-sites/persono"].loaders.config({
      fields: ["maxInstallments", "minInstallmentValue", "vmItemsPerPage"],
    }).then((c: VMConfig) => c);

  return vmConfig;
};

export default getConfig;
