import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// `output: "export"` exige declararlo: se genera una sola vez en build.
export const dynamic = "force-static";

/**
 * Genera /robots.txt en el export estático.
 *
 * Sin `disallow`: Googlebot necesita rastrear /_next/ (JS y CSS) para
 * renderizar la página; bloquearlo degrada la evaluación de la página.
 * El 404 se excluye con la cabecera `X-Robots-Tag` en netlify.toml, no aquí
 * — un robots.txt que bloquea la URL impide leer justamente ese noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
