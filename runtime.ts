import type { Manifest } from "./manifest.gen.ts";
import type { Manifest as ManifestVNDA } from "apps/vnda/manifest.gen.ts";
import type { Manifest as ManifestVTEX } from "apps/vtex/manifest.gen.ts";
import { proxy } from "@deco/deco/web";
// @ts-ignore <IDK why this is wrong>
export const invoke = proxy<Manifest & ManifestVNDA & ManifestVTEX>();
