/**
 * Datos de contacto y constantes del sitio.
 * Fuente única: docs/brochure_stg.pdf y datos de contacto confirmados
 * por el cliente (2026-08) — no añadir datos que no vengan de ahí.
 */

export const SITE = {
  name: "Servicios Técnicos y de Generación",
  shortName: "STG",
  tagline:
    "Soluciones integrales de mantenimiento, refrigeración y generación de energía para empresas.",
  rfc: "STG250805RJ6",
  city: "Cancún, Quintana Roo",
  phoneDisplay: "998 707 54 27",
  phoneHref: "tel:+529987075427",
  phoneE164: "+52 998 707 5427",
  whatsappNumber: "529983170173",
  whatsappDisplay: "998 317 01 73",
  quoteEmail: "direccionoperaciones@stgmx.mx",

  /* — SEO — Dominio canónico. Se hornea en el export estático: cambiarlo
     aquí actualiza canonical, sitemap, robots, Open Graph y JSON-LD. */
  url: "https://stgmx.mx",
  locale: "es-MX",
  /* Fecha de última revisión de contenido; alimenta <lastmod> del sitemap.
     Actualizar solo cuando cambie el contenido, no en cada despliegue. */
  contentUpdated: "2026-08-12",
} as const;

/**
 * Ubicación y zona de servicio para schema.org.
 *
 * Coordenadas: literales del pin que compartió el cliente (2026-08-12),
 * https://maps.app.goo.gl/jwUwgW8V44qphxGC8 — un pin suelto, no una ficha de
 * Google Business Profile.
 *
 * `street` y `postalCode` van vacíos a propósito: el pin no trae domicilio y
 * geocodificarlo a la inversa solo da la calle más cercana (Av. Paseo
 * Kuzamil, CP 77539), que no es un dato confirmado. Publicar una dirección
 * equivocada en datos estructurados es peor que no publicar ninguna.
 * TODO(cliente): calle, número y CP para completar el PostalAddress.
 */
export const GEO = {
  locality: "Cancún",
  region: "Quintana Roo",
  country: "México",
  countryCode: "MX",
  latitude: 21.128933,
  longitude: -86.928741,
  mapUrl: "https://maps.app.goo.gl/jwUwgW8V44qphxGC8",
} as const;

/**
 * Perfiles oficiales para `sameAs` del JSON-LD. Vacío por decisión del
 * cliente: STG no tiene redes sociales (2026-08-12). Si algún día abre una,
 * basta añadir la URL aquí y entra sola a los datos estructurados.
 */
export const SOCIAL_PROFILES: readonly string[] = [];

/**
 * Términos objetivo del sitio. Google ignora <meta keywords>, pero esta lista
 * es la referencia editorial de la que salen title, description y JSON-LD, y
 * la consumen buscadores menores y rastreadores de IA.
 */
export const SEO_KEYWORDS = [
  "mantenimiento industrial en Cancún",
  "mantenimiento preventivo y correctivo",
  "servicio a generadores eléctricos Cancún",
  "renta de generadores Cancún",
  "mantenimiento de refrigeración comercial",
  "mantenimiento de cocina industrial",
  "refaccionamiento europeo para cocina",
  "trabajos eléctricos media y baja tensión",
  "transformadores y tableros eléctricos Quintana Roo",
  "sistemas mecánicos, andenes y rampas",
  "personal técnico en sitio",
  "STG Servicios Técnicos y de Generación",
] as const;

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT = waLink(
  "Hola, STG. Me interesa solicitar una cotización.",
);

export const CONTACTS = [
  {
    role: "Representante Legal",
    person: "Ana Cristina Bonales Álvarez",
    email: "direccion@stgmx.mx",
    icon: "person" as const,
  },
  {
    role: "Dirección de Operaciones",
    person: "Ing. Israel Estrada Rosado",
    email: "direccionoperaciones@stgmx.mx",
    icon: "helmet" as const,
  },
  {
    role: "Cotizaciones",
    person: null,
    email: "auxadministracion@stgmx.mx",
    icon: "chart" as const,
  },
  {
    role: "Servicio Técnico & Gerencia",
    person: null,
    email: "serviciotecnicocancun@stgmx.mx",
    phone: true,
    icon: "phone" as const,
  },
] as const;
