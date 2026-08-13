/**
 * Genera src/app/favicon.ico a partir de public/logo.png.
 *
 * Por qué existe: Next sirve `icon.png` con un hash en la query
 * (`/icon.png?icon.<hash>.png`). Google pide una URL de favicon estable y
 * su rastreador va primero a /favicon.ico. El convenio `app/favicon.ico` de
 * Next emite <link rel="icon" href="/favicon.ico" sizes="any"> sin hash.
 *
 * Uso: node scripts/make-favicon.mjs
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(new URL("../public/logo.png", import.meta.url));
const OUT = fileURLToPath(new URL("../src/app/favicon.ico", import.meta.url));

// Fondo de marca: las letras del logo son blancas y desaparecerían sobre el
// blanco de la pestaña o del resultado de búsqueda.
const BG = { r: 0x0c, g: 0x15, b: 0x22, alpha: 1 };

// Google recomienda múltiplos de 48; 16 y 32 son lo que pintan los navegadores.
const SIZES = [16, 32, 48];

// El logo es apaisado (~1.4:1). Ocupando el 92% del ancho, el trazo queda lo
// más grande posible sin tocar el borde del mosaico.
const FILL = 0.92;

const mark = await sharp(SRC).trim().toBuffer();

const pngs = await Promise.all(
  SIZES.map(async (size) => {
    const inner = await sharp(mark)
      .resize({
        width: Math.round(size * FILL),
        height: Math.round(size * FILL),
        fit: "inside",
      })
      .toBuffer();

    return sharp({
      create: { width: size, height: size, channels: 4, background: BG },
    })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toBuffer();
  }),
);

/* Contenedor ICO: cabecera de 6 bytes, una entrada de 16 por imagen y los PNG
   al final. Windows antiguo no lee PNG dentro de ICO; los navegadores sí. */
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // tipo: icono
header.writeUInt16LE(pngs.length, 4);

let offset = 6 + pngs.length * 16;
const entries = pngs.map((png, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(SIZES[i], 0); // ancho (0 significaría 256)
  entry.writeUInt8(SIZES[i], 1); // alto
  entry.writeUInt8(0, 2); // paleta: ninguna
  entry.writeUInt8(0, 3); // reservado
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});

await writeFile(OUT, Buffer.concat([header, ...entries, ...pngs]));
console.log(`favicon.ico -> ${SIZES.join(", ")} px`);
