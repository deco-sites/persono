import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@1.22.0/plugins/mod.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  // Using to render internal pages in localHost
  //port: 6006,
  plugins: plugins({ manifest }),
});
