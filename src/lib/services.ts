/**
 * Líneas de servicio — texto literal de docs/brochure_stg.pdf (pp. 4-5).
 */

export type ServiceSlug =
  | "cocina-refrigeracion"
  | "trabajos-electricos"
  | "generadores"
  | "sistemas-mecanicos"
  | "personal-en-sitio";

export interface Modalidad {
  title: string;
  description: string;
}

export interface Service {
  slug: ServiceSlug;
  folio: string;
  title: string;
  description: string;
  modalidades?: Modalidad[];
  waMessage: string;
  image: string;
  imageAlt: string;
  /**
   * Título de la página propia del servicio (/servicios/{slug}/). El layout
   * le añade "| STG Cancún", así que aquí NO se repite marca ni plaza.
   * Reordena las palabras del brochure: describe la línea con los términos
   * que la gente teclea, no con el rótulo corto de la tarjeta.
   */
  seoTitle: string;
  /** Meta description de esa página. ≤155 caracteres. */
  seoDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "cocina-refrigeracion",
    folio: "01",
    title: "Cocina & Refrigeración",
    description:
      "Mantenimiento a cocina fría, caliente y sistemas de refrigeración. Venta de refaccionamiento europeo.",
    waMessage:
      "Hola, STG. Me interesa una cotización de mantenimiento de cocina y refrigeración.",
    image: "/services/cocina.png",
    imageAlt: "Cocina industrial y sistemas de refrigeración comerciales",
    seoTitle: "Mantenimiento de cocina industrial y refrigeración",
    seoDescription:
      "Mantenimiento a cocina fría, caliente y sistemas de refrigeración en Cancún. Venta de refaccionamiento europeo. Servicio multimarca Rational, Hobart y Fagor.",
  },
  {
    slug: "generadores",
    folio: "02",
    title: "Generadores",
    description: "Venta, renta y servicio técnico a generadores eléctricos.",
    waMessage:
      "Hola, STG. Me interesa una cotización de venta, renta o servicio a generadores.",
    image: "/services/generadores.png",
    imageAlt: "Generador eléctrico industrial en cuarto de máquinas",
    seoTitle: "Generadores eléctricos: venta, renta y servicio técnico",
    seoDescription:
      "Venta, renta y servicio técnico a generadores eléctricos en Cancún. Servicio multimarca Cummins, John Deere, CAT, Volvo Penta y Perkins.",
  },
  {
    slug: "trabajos-electricos",
    folio: "03",
    title: "Trabajos Eléctricos",
    description:
      "Media y baja tensión: transformadores, tableros, canalización aérea y subterránea, derivación eléctrica.",
    waMessage:
      "Hola, STG. Me interesa una cotización de trabajos eléctricos.",
    image: "/services/electricos.png",
    imageAlt: "Tableros eléctricos y transformadores de media y baja tensión",
    seoTitle: "Trabajos eléctricos en media y baja tensión",
    seoDescription:
      "Trabajos eléctricos de media y baja tensión en Cancún: transformadores, tableros, canalización aérea y subterránea y derivación eléctrica.",
  },
  {
    slug: "sistemas-mecanicos",
    folio: "04",
    title: "Sistemas Mecánicos",
    description:
      "Cortinas, rampas de emergencia, bandas mecanizadas y andenes mecánicos.",
    waMessage:
      "Hola, STG. Me interesa una cotización de mantenimiento a sistemas mecánicos.",
    image: "/services/mecanicos.png",
    imageAlt: "Andenes mecánicos y rampas de emergencia industriales",
    seoTitle: "Mantenimiento a sistemas mecánicos y andenes",
    seoDescription:
      "Mantenimiento en Cancún a cortinas, rampas de emergencia, bandas mecanizadas y andenes mecánicos para instalaciones comerciales e industriales.",
  },
  {
    slug: "personal-en-sitio",
    folio: "05",
    title: "Personal en Sitio",
    description:
      "Contamos con dos modalidades de servicio en sitio para cubrir las necesidades operativas de nuestros clientes:",
    modalidades: [
      {
        title: "Mantenimiento a Instalaciones",
        description:
          "Personal técnico calificado asignado directamente en sus instalaciones.",
      },
      {
        title: "Personal de Limpieza",
        description:
          "Servicio de limpieza profesional en sitio para instalaciones comerciales e industriales.",
      },
    ],
    waMessage:
      "Hola, STG. Me interesa una cotización de personal en sitio.",
    image: "/services/personal.png",
    imageAlt: "Personal técnico calificado en sitio",
    seoTitle: "Personal técnico y de limpieza en sitio",
    seoDescription:
      "Personal técnico calificado asignado en sus instalaciones y limpieza profesional en Cancún, para instalaciones comerciales e industriales.",
  },
];
