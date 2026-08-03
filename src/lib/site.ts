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
  whatsappNumber: "529983170173",
  whatsappDisplay: "998 317 01 73",
  quoteEmail: "direccionoperaciones@stgmx.mx",
} as const;

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
    role: "Ventas",
    person: null,
    email: "ventas@stgmx.mx",
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
