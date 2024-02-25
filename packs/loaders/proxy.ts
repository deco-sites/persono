import { Route } from "apps/website/flags/audience.ts";
import { AppContext } from "$store/apps/site.ts";
import { getHeaders } from "$store/packs/utils/headers.ts";

const PAGE_PATHS = [
  "/checkout",
  "/checkout/*",
  "/checkout-s",
  "/checkout-s/*",
  "/checkout-s/endereco",
  "/checkout-s/entrega",
  "/checkout-s/pagamento",
  "/checkout-s/resumo",
  "/checkout-s/sucesso",
  "/perfil",
  "/perfil/*",
  "/perfil/dados-pessoais",
  "/perfil/pedidos",
  "/perfil/pedidos/*",
  "/perfil/enderecos",
  "/perfil/minha-carteira",
  "/perfil/clube-mmartan",
  "/login",
];

const ASSETS_PATHS = [
  "/images",
  "/images/*",
  "/_next",
  "/_next/*",
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
  req: Request,
  { publicUrl, apiKey }: AppContext,
): Route[] {
  const url = new URL(
    publicUrl?.startsWith("http") ? publicUrl : `https://${publicUrl}`,
  );
  const headers = getHeaders(req, apiKey, true);
  console.log(headers.entries())

  const internalDomainPaths = [
    ...PAGE_PATHS,
    ...ASSETS_PATHS,
    ...pagesToProxy,
  ].map((
    pathTemplate,
  ) => ({
    pathTemplate,
    handler: {
      value: {
        __resolveType: "website/handlers/proxy.ts",
        url: url.origin,
        host: url.hostname,
      },
    },
  }));

  const apiDomainPaths = API_PATHS.map((pathTemplate) => ({
    pathTemplate,
    handler: {
      value: {
        __resolveType: "website/handlers/proxy.ts",
        url: "https://dev.mmartan.com.br",
        host: url.hostname,
        customHeaders: [{
          key: "X-Ammo-Device-Id",
          value: "520af0a0-77d9-11ec-8e34-6158c87e0aae",
        }, {
          key: "X-Ammo-Token",
          value:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiY2ZlNTJmMjYtOTllNy00MDViLWFlZGEtODVlOGM2ZWQ1MDliIiwiaWF0IjoxNjkxMTI3MzU2fQ.4f-lB492HUIq639UrT5h1oH-Uf6tMwsgRJiw-3a4dYM",
        }, {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
        }],
      },
    },
  }));

  return [...internalDomainPaths, ...apiDomainPaths];
}

export default loader;
