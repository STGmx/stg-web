/**
 * Datos estructurados schema.org (JSON-LD) del sitio.
 *
 * Regla de contenido dura del proyecto: aquí SOLO entran hechos que ya están
 * en docs/brochure_stg.pdf o confirmados por el cliente. Nada de horarios,
 * años de experiencia, certificaciones, calificaciones ni dirección física.
 *
 * Se emite un único grafo (@graph) con nodos enlazados por @id, que es como
 * Google prefiere consumir varias entidades de una misma página.
 */

import { GEO, SITE, SOCIAL_PROFILES, CONTACTS } from "./site";
import { SERVICES } from "./services";
import { BRAND_GROUPS } from "./brands";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const PAGE_ID = `${SITE.url}/#webpage`;
const LOGO_ID = `${SITE.url}/#logo`;

/** Rol del directorio → contactType normalizado de schema.org. */
const CONTACT_TYPES: Record<string, string> = {
  "Representante Legal": "customer service",
  "Dirección de Operaciones": "technical support",
  Cotizaciones: "sales",
  "Servicio Técnico & Gerencia": "technical support",
};

const areaServed = [
  {
    "@type": "City",
    name: GEO.locality,
    containedInPlace: {
      "@type": "State",
      name: GEO.region,
      containedInPlace: { "@type": "Country", name: GEO.country },
    },
  },
];

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  alternateName: SITE.shortName,
  legalName: SITE.name,
  url: `${SITE.url}/`,
  logo: {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${SITE.url}/logo.png`,
    contentUrl: `${SITE.url}/logo.png`,
    width: 456,
    height: 322,
    caption: SITE.name,
  },
  image: { "@id": LOGO_ID },
  description: SITE.tagline,
  telephone: SITE.phoneE164,
  email: SITE.quoteEmail,
  // Sin nodo `address`: el cliente decidió no publicar datos de ubicación
  // (2026-08-12). Queda solo `areaServed`, que declara dónde se presta el
  // servicio sin afirmar dónde está la empresa.
  areaServed,
  knowsLanguage: ["es-MX"],
  // Marcas atendidas: refuerza la relevancia temática de la entidad.
  knowsAbout: [
    ...new Set([
      ...SERVICES.map((s) => s.title),
      ...BRAND_GROUPS.flatMap((g) => g.brands.map((b) => b.name)),
    ]),
  ],
  contactPoint: CONTACTS.map((contact) => ({
    "@type": "ContactPoint",
    contactType: CONTACT_TYPES[contact.role] ?? "customer service",
    name: contact.role,
    email: contact.email,
    ...("phone" in contact && contact.phone
      ? { telephone: SITE.phoneE164 }
      : {}),
    areaServed: GEO.countryCode,
    availableLanguage: ["es-MX"],
  })),
  ...(SOCIAL_PROFILES.length > 0 ? { sameAs: [...SOCIAL_PROFILES] } : {}),
};

/** Una línea de servicio del brochure → nodo Service enlazado al proveedor. */
const services = SERVICES.map((service) => ({
  "@type": "Service",
  "@id": `${SITE.url}/#service-${service.slug}`,
  name: service.title,
  serviceType: service.title,
  description: service.modalidades
    ? `${service.description} ${service.modalidades
        .map((m) => `${m.title}: ${m.description}`)
        .join(" ")}`
    : service.description,
  provider: { "@id": ORG_ID },
  areaServed,
  url: `${SITE.url}/#${service.slug}`,
  ...(service.modalidades
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Modalidades de ${service.title}`,
          itemListElement: service.modalidades.map((m) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: m.title,
              description: m.description,
            },
          })),
        },
      }
    : {}),
}));

const offerCatalog = {
  "@type": "OfferCatalog",
  "@id": `${SITE.url}/#catalogo`,
  name: "Líneas de servicio STG",
  // Sin `price`: STG cotiza por proyecto, no hay tarifa pública que declarar.
  itemListElement: services.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@id": service["@id"] },
    areaServed,
  })),
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  alternateName: SITE.shortName,
  description: SITE.tagline,
  publisher: { "@id": ORG_ID },
  inLanguage: SITE.locale,
};

/**
 * @param title Título indexable de la página (el mismo del <title>).
 * @param description Meta description de la página.
 */
export function buildGraph(title: string, description: string) {
  const webPage = {
    "@type": "WebPage",
    "@id": PAGE_ID,
    url: `${SITE.url}/`,
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": LOGO_ID },
    inLanguage: SITE.locale,
    dateModified: SITE.contentUpdated,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${SITE.url}/`,
        },
      ],
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...organization, hasOfferCatalog: { "@id": offerCatalog["@id"] } },
      offerCatalog,
      ...services,
      website,
      webPage,
    ],
  };
}
