import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { color as shopify } from "apps/shopify/mod.ts";
import { color as vnda } from "apps/vnda/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { color as wake } from "apps/wake/mod.ts";
import { color as linx } from "apps/linx/mod.ts";
import { color as nuvemshop } from "apps/nuvemshop/mod.ts";
import { Section } from "deco/blocks/section.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "$store/manifest.gen.ts";
import { App, AppMiddlewareContext as AMC } from "deco/mod.ts";

import Ammo from "$store/packs/utils/client.ts";
import { fetchSafe } from "$store/packs/utils/fetch.ts";
import { createHttpClient } from "apps/utils/http.ts";
export type DefaultProps = {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
} & CommerceProps;

export type Props = {
  /**
  @title Ammo Device Id
  */
  ammoDeviceId: string;

  /**
  @title Ammo Token
  */
  ammoToken: string;

  /**
  @title Ammo Store Public URL
  @default https://mmartan.com.br/api/
  */
  publicUrl: string;
} & DefaultProps;

export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "custom";

export let _platform: Platform = "custom";

const color = (platform: string) => {
  switch (platform) {
    case "vtex":
      return vtex;
    case "vnda":
      return vnda;
    case "wake":
      return wake;
    case "shopify":
      return shopify;
    case "linx":
      return linx;
    case "nuvemshop":
      return nuvemshop;
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};

let firstRun = true;

export default function Site({
  theme,
  ...stateSite
  //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
}: Props): App<Manifest, Props, [ReturnType<typeof commerce>]> {
  _platform = stateSite.platform || stateSite.commerce?.platform || "custom";

  const ammoc = createHttpClient<Ammo>({
    base: stateSite.publicUrl,
    fetcher: fetchSafe,
  });

  const state = { ...stateSite, ammoc };

  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` 🐁 ${rgb24("Storefront", color("deco"))} | ${
        rgb24(
          _platform,
          color(_platform),
        )
      } \n`,
    );
  }

  return {
    state,
    manifest,
    dependencies: [
      commerce({
        ...state,
        global: theme ? [...(state.global ?? []), theme] : state.global,
      }),
    ],
  };
}

export type Storefront = ReturnType<typeof Site>;
export type AppMiddlewareContext = AMC<Storefront>;
//@ts-ignore to avoid AC error
export type AppContext = AC<Storefront>;
export { onBeforeResolveProps } from "apps/website/mod.ts";
