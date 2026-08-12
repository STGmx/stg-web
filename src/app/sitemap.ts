import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// `output: "export"` exige declararlo: se genera una sola vez en build.
export const dynamic = "force-static";

/**
 * Genera /sitemap.xml. Una sola URL: el sitio es una landing de una página y
 * las secciones son anclas, no rutas indexables por separado.
 *
 * `lastModified` sale de SITE.contentUpdated y no de la fecha de build, para
 * no declararle a Google un cambio de contenido en cada despliegue.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.url}/`,
      lastModified: new Date(SITE.contentUpdated),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
