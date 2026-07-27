/**
 * Marcas y clientes — literal de docs/brochure_stg.pdf (pp. 6-7).
 * logo: ruta bajo public/ (procesado monocromo plata; versión a color en
 * `{slug}-color.png` para el hover) o null si no hay asset (fallback
 * tipográfico). shape gobierna el tamaño de exhibición.
 * TODO(cliente): logos autorizados.
 */

export type LogoShape = "emblem" | "word" | "wide";

export interface BrandEntry {
  name: string;
  slug: string;
  logo: string | null;
  shape: LogoShape;
}

export const BRAND_GROUPS: {
  label: string;
  serviceSlug: "generadores" | "cocina-refrigeracion";
  brands: BrandEntry[];
}[] = [
  {
    label: "Generadores & Motores",
    serviceSlug: "generadores",
    brands: [
      { name: "Cummins", slug: "cummins", logo: "/marcas/cummins.png", shape: "emblem" },
      { name: "John Deere", slug: "john-deere", logo: "/marcas/john-deere.png", shape: "emblem" },
      { name: "CAT", slug: "cat", logo: "/marcas/cat.png", shape: "word" },
      { name: "Volvo Penta", slug: "volvo-penta", logo: "/marcas/volvo-penta.png", shape: "wide" },
      { name: "Perkins", slug: "perkins", logo: "/marcas/perkins.png", shape: "word" },
    ],
  },
  {
    label: "Equipo de Cocina & Refrigeración",
    serviceSlug: "cocina-refrigeracion",
    // orden pensado para la retícula 4+4: emblemas repartidos en diagonal
    brands: [
      { name: "Rational", slug: "rational", logo: "/marcas/rational.png", shape: "word" },
      { name: "Hobart", slug: "hobart", logo: "/marcas/hobart.png", shape: "word" },
      { name: "Josper", slug: "josper", logo: "/marcas/josper.png", shape: "emblem" },
      { name: "Fagor", slug: "fagor", logo: "/marcas/fagor.png", shape: "word" },
      { name: "Manitowoc", slug: "manitowoc", logo: "/marcas/manitowoc.png", shape: "word" },
      { name: "Sammic", slug: "sammic", logo: "/marcas/sammic.png", shape: "emblem" },
      { name: "Robot Coupe", slug: "robot-coupe", logo: "/marcas/robot-coupe.png", shape: "word" },
      { name: "Zummex", slug: "zummex", logo: "/marcas/zummex.png", shape: "word" },
    ],
  },
];

export interface ClientEntry {
  name: string;
  slug: string;
  logo: string | null;
  shape: LogoShape;
}

export const CLIENTS: ClientEntry[] = [
  {
    name: "Zoetry Wellness & Spa Resorts",
    slug: "zoetry",
    logo: "/clientes/zoetry.png",
    shape: "emblem",
  },
  { name: "TOKS", slug: "toks", logo: "/clientes/toks.png", shape: "emblem" },
  {
    name: "Palladium Hotel Group",
    slug: "palladium",
    logo: "/clientes/palladium.png",
    shape: "word",
  },
  {
    name: "Carso Infraestructura y Construcción",
    slug: "carso",
    logo: "/clientes/carso.png",
    shape: "word",
  },
  {
    name: "Mercado Libre",
    slug: "mercado-libre",
    logo: "/clientes/mercado-libre.png",
    shape: "emblem",
  },
];

export const VALUES = [
  { name: "Honestidad", icon: "handshake" },
  { name: "Profesionalismo", icon: "diploma" },
  { name: "Compromiso", icon: "crosshair" },
  { name: "Lealtad", icon: "shield" },
  { name: "Ética", icon: "scale" },
  { name: "Humanismo", icon: "heart" },
] as const;
