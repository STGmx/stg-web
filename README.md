# Sitio web STG — Servicios Técnicos y de Generación

Landing de una sola página para STG (mantenimiento, refrigeración y generación de energía · Cancún, Q. Roo). Boceto v1 del rediseño (2026-07-26).

## Regla de contenido (dura)

**Fuente única de verdad: `docs/brochure_stg.pdf`.** Todo texto del sitio es literal del brochure o reordenamiento de sus palabras. Prohibido afirmar: Riviera Maya, 24/7, años de experiencia, certificaciones o cifras que no estén en el PDF. Plaza: solo Cancún. (Se retira "líderes" del tagline por indicación del cliente.)

## Stack

- Next.js 16 (App Router) + TypeScript estricto + Tailwind v4 (`@theme` en `globals.css`)
- Export estático (`output: "export"` → `out/`), sin backend ni API keys
- Tipografías: Source Serif 4 (titulares) + Source Sans 3 (texto) vía `next/font`
- Formulario compone mensaje → WhatsApp `998 317 01 73` o `mailto:` al correo de cotización (`SITE.quoteEmail`)

```bash
npm run dev      # desarrollo
npm run build    # export estático a out/
node scripts/shoot.mjs   # capturas responsive (requiere out/ servido en :8123)
```

Capturas: `python3 -m http.server 8123 -d out` y luego el script (usa el Chrome del sistema vía puppeteer-core; móvil a dsf 1 porque la página completa supera el límite de textura de Chrome con dsf 2; el script fuerza `loading=eager`+`decode()` porque fullPage pinta en blanco las imágenes lazy).

## SEO e indexación

Dominio canónico: **`https://stgmx.mx`** (sin www). Vive en `SITE.url` (`src/lib/site.ts`) y de ahí salen canonical, sitemap, robots, Open Graph y JSON-LD; cambiarlo ahí basta.

| Pieza | Archivo | Sale en |
| --- | --- | --- |
| Title, description, canonical, OG, Twitter, robots, iconos | `src/app/layout.tsx` | `<head>` de todas las páginas |
| Datos estructurados (Organization + 5 Service + OfferCatalog + WebSite + WebPage) | `src/lib/schema.ts` | `<script type="application/ld+json">` |
| `robots.txt` | `src/app/robots.ts` | `/robots.txt` |
| `sitemap.xml` | `src/app/sitemap.ts` | `/sitemap.xml` |
| Manifest web | `src/app/manifest.ts` | `/manifest.webmanifest` |
| Tarjeta social 1200×630 | `src/app/opengraph-image.tsx` | `/opengraph-image` |
| Verificación de Search Console | `public/google9af7261fc2b26199.html` | raíz del sitio |
| Redirección www→raíz, `noindex` del 404, MIME del OG, caché y seguridad | `netlify.toml` | cabeceras HTTP |

Notas del entorno: con `output: "export"` toda ruta de metadata (`robots`, `sitemap`, `manifest`, `opengraph-image`) necesita `export const dynamic = "force-static"` o el build falla. `not-found.tsx` no admite `export metadata`; Next ya le pone `noindex` solo.

Al cambiar contenido de la landing, actualizar `SITE.contentUpdated` — alimenta el `<lastmod>` del sitemap y no debe moverse en cada despliegue.

### Alta en Google (una sola vez, tras conectar el dominio)

1. En Netlify, fijar `stgmx.mx` como **primary domain** (la redirección de www ya está en `netlify.toml`).
2. Search Console → añadir propiedad. Con el archivo de verificación ya desplegado, basta pulsar *Verificar*. Conviene además dar de alta la propiedad de **dominio** vía DNS: cubre www, http y subdominios.
3. Sitemaps → enviar `sitemap.xml`.
4. Inspección de URLs → pegar `https://stgmx.mx/` → *Solicitar indexación*.
5. Comprobar la ficha en [Rich Results Test](https://search.google.com/test/rich-results) y la vista previa social en el depurador de LinkedIn/WhatsApp.
6. Crear el **Perfil de Empresa de Google** (Cancún): es la palanca más grande para búsquedas locales. Al tenerlo, pegar su URL en `SOCIAL_PROFILES` (`src/lib/site.ts`) para que entre en el `sameAs` del JSON-LD.

## Sistema de diseño

"Papelería de ingeniería sobre navy": base `#0C1522` (entorno nativo del logo), superficie `#121E2F`, tinta plata, acento único cobalto `#74A7D8`, botón primario placa blanca. **Cero amarillo en la UI** (el rayo del logo es la única nota cálida) y **verde solo para WhatsApp**. Servicios en retícula directa 2+2+ancho (las cinco líneas visibles de inmediato).

**Logos de terceros:** SIEMPRE monocromos plata sobre navy en reposo; al hover SOLO el logo recupera su color (la tarjeta se queda navy — pedido del cliente). Las versiones de color son variantes "para fondo oscuro": neutros oscuros → plata, cromáticos oscuros → mismo matiz con más valor (como los logos on-dark oficiales). Crudos en `public/logos-src/` (con manifests de origen); `scripts/process-logos.py` genera el par `{slug}.png` / `{slug}-color.png` hacia `public/marcas/` y `public/clientes/` (tinta oscura por defecto; placa clara con `LIGHT='["slug"]'`). Muro de marcas: retícula 5 columnas (generadores) y 4+4 (cocina, emblemas en diagonal), tamaño por `shape` (emblem/word/wide). Footer = cierre de documento (eco del sello del hero + declaración serif + CTAs + banda de directorio; sin RFC, por pedido del cliente). Contacto = mesa B2B: atención directa (teléfono grande + chips WA/correo), zona de operación con pin ("Cancún, Quintana Roo, México"), directorio reglado y formulario pegajoso.

## Pendientes del cliente

| Dato | Uso previsto |
| --- | --- |
| Razón social completa y dirección física | Footer / aviso de privacidad |
| Horario de atención (¿24/7 real?) | Contacto — no se afirma sin confirmación |
| Logos autorizados de clientes y marcas | Sustituir wordmarks tipográficos |
| Fotografías reales de trabajos/técnicos | Sustituir láminas SVG |
| Casos de servicio con datos (tiempos, alcance) | Sección de prueba social (fase 2) |
| Certificaciones / SLA por escrito | Solo si existen documentados |
| Logo vectorial oficial | Hoy se usa el PNG extraído del brochure |
| Dominio stgmx.mx apuntado a Netlify | Es lo único que falta para indexar; el sitio ya está en `index, follow` |
| URL del Perfil de Empresa de Google / LinkedIn | `SOCIAL_PROFILES` en `src/lib/site.ts` → `sameAs` del JSON-LD |
| Dirección física y horario | Subir el JSON-LD de `Organization` a `LocalBusiness` con `PostalAddress` y `openingHours` |
