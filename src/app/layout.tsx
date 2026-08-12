import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SEO_KEYWORDS, SITE } from "@/lib/site";
import { buildGraph } from "@/lib/schema";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

/* Título ~53 caracteres: entra completo en el SERP de escritorio y móvil,
   con el término principal al frente y la marca al cierre. */
const TITLE = "Mantenimiento industrial y generadores en Cancún | STG";

/* Description de 149 caracteres: entra completa antes del corte de Google
   (~155) y cubre las líneas de servicio del brochure sin afirmar nada que no
   esté en él. */
const DESCRIPTION =
  "Mantenimiento preventivo, correctivo y de emergencia en Cancún: cocina y refrigeración, generadores, trabajos eléctricos y personal técnico en sitio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.shortName} Cancún`,
  },
  description: DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "business",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  // El teléfono se enlaza a mano con tel:; sin esto Safari inventa enlaces
  // sobre folios y códigos técnicos de la página.
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    title: SITE.shortName,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1522",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.locale}
      className={`${sourceSerif.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // Grafo schema.org: Organization + catálogo de servicios + WebSite
          // + WebPage. Contenido propio y estático, sin datos de usuario.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildGraph(TITLE, DESCRIPTION)),
          }}
        />
      </body>
    </html>
  );
}
