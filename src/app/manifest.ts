import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// `output: "export"` exige declararlo: se genera una sola vez en build.
export const dynamic = "force-static";

/** Genera /manifest.webmanifest (instalación en móvil e icono de marca). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.tagline,
    lang: SITE.locale,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0c1522",
    theme_color: "#0c1522",
    categories: ["business", "utilities"],
    // Rutas de public/, no las de app/icon.png: el convenio de archivo añade
    // un hash a la URL y el manifest necesita rutas estables.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
