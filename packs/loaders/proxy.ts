import { Route } from "apps/website/flags/audience.ts";
import { AppContext } from "$store/apps/site.ts";

const PAGE_SECURE_PATHS = [
  "/secure/perfil",
  "/secure/perfil/*",
  "/secure/perfil/dados-pessoais",
  "/secure/perfil/pedidos",
  "/secure/perfil/pedidos/*",
  "/secure/perfil/enderecos",
  "/secure/perfil/minha-carteira",
  "/secure/perfil/trocas-e-devolucoes",
  "/secure/perfil/trocas-e-devolucoes/*",
  "/secure/login",
  "/redefinir-senha",
];

const PAGE_PATHS = [
  "/pagaleve-checkout/*",
  "/nps/*",
  "/recriar-sacola/*",
  "/checkout",
  "/checkout/*",
  "/checkout-s",
  "/checkout-s/*",
  "/checkout-s/endereco",
  "/checkout-s/entrega",
  "/checkout-s/pagamento",
  "/checkout-s/resumo",
  "/checkout-s/sucesso",
];

const ASSETS_PATHS = [
  "/images",
  "/images/*",
  "/_next",
  "/_next/*",
  "/manifest.json",
  "/android-chrome-192x192.png",
];

const API_PATHS = [
  "/api/*",
];

export interface Props {
  /** @description ex: /p/fale-conosco */
  pagesToProxy?: string[];
}

/**
 * @title Ammo Varejo - Proxy Routes
 */
function loader(
  { pagesToProxy = [] }: Props,
  _req: Request,
  ctx: AppContext,
): Route[] {
  const url = new URL(
    ctx.publicUrl?.startsWith("http")
      ? ctx.publicUrl
      : `https://${ctx.publicUrl}`,
  );

  const internalDomainPaths = [
    ...PAGE_SECURE_PATHS,
    ...pagesToProxy,
  ].map((
    pathTemplate,
  ) => ({
    pathTemplate,
    handler: {
      value: {
        __resolveType: "deco-sites/persono/loaders/handlers/proxy.ts",
        url: url.origin,
        host: url.hostname,
        basePath: "/secure",
      },
    },
  }));

  const apiDomainPaths = [
    ...API_PATHS,
    ...ASSETS_PATHS,
    ...PAGE_PATHS,
  ].map((pathTemplate) => ({
    pathTemplate,
    handler: {
      value: {
        __resolveType: "deco-sites/persono/loaders/handlers/proxy.ts",
        url: url.origin,
        host: url.hostname,
      },
    },
  }));

  return [...internalDomainPaths, ...apiDomainPaths];
}

export default loader;
