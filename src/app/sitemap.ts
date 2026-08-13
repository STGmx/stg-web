import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";

// `output: "export"` exige declararlo: se genera una sola vez en build.
export const dynamic = "force-static";

/**
 * Genera /sitemap.xml: la home más una página por línea de servicio.
 *
 * `lastModified` sale de SITE.contentUpdated y no de la fecha de build, para
 * no declararle a Google un cambio de contenido en cada despliegue.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.contentUpdated);

  return [
    {
      url: `${SITE.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE.url}/servicios/${service.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
