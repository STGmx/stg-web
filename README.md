# Sitio web STG — Servicios Técnicos y de Generación

Landing de una sola página para STG (mantenimiento, refrigeración y generación de energía · Cancún, Q. Roo). Boceto v1 del rediseño (2026-07-26).

## Regla de contenido (dura)

**Fuente única de verdad: `docs/brochure_stg.pdf`.** Todo texto del sitio es literal del brochure o reordenamiento de sus palabras. Prohibido afirmar: Riviera Maya, 24/7, años de experiencia, certificaciones o cifras que no estén en el PDF. Plaza: solo Cancún. (Se retira "líderes" del tagline por indicación del cliente.)

## Stack

- Next.js 16 (App Router) + TypeScript estricto + Tailwind v4 (`@theme` en `globals.css`)
- Export estático (`output: "export"` → `out/`), sin backend ni API keys
- Tipografías: Source Serif 4 (titulares) + Source Sans 3 (texto) vía `next/font`
- Formulario compone mensaje → WhatsApp `998 707 54 27` o `mailto:ventas@stgmx.mx`

```bash
npm run dev      # desarrollo
npm run build    # export estático a out/
node scripts/shoot.mjs   # capturas responsive (requiere out/ servido en :8123)
```

Capturas: `python3 -m http.server 8123 -d out` y luego el script (usa el Chrome del sistema vía puppeteer-core; móvil a dsf 1 porque la página completa supera el límite de textura de Chrome con dsf 2; el script fuerza `loading=eager`+`decode()` porque fullPage pinta en blanco las imágenes lazy).

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
| Dominio stgmx.mx conectado | Retirar `noindex` en `layout.tsx` |
