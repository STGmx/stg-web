#!/usr/bin/env python3
"""
Procesa los logos crudos de public/logos-src/ a marcas monocromas plata
con alfa (regla del sistema: logos de terceros SIEMPRE plata sobre navy).

- Extracción de tinta OSCURA (por defecto): alpha = (255 - luminancia) * 1.55
- Extracción de tinta CLARA (logos de placa sólida / texto claro): alpha = lum * 1.55
  → añadir el slug a LIGHT_EXTRACTION tras inspección visual.

Salida: public/marcas/{slug}.png (prefijo brand-) y public/clientes/{slug}.png
(prefijo client-), recortados a bbox y máx. 640 px de ancho, tinta #C7D3E2.
También genera una hoja de contactos en el directorio indicado por $SHEET_DIR.
"""

import json
import os
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "logos-src"
TINT = (199, 211, 226)
NAVY = (12, 21, 34)

# slugs (sin prefijo) que requieren extracción clara
LIGHT_EXTRACTION: set[str] = set(json.loads(os.environ.get("LIGHT", "[]")))


def ink_alpha(path: Path) -> tuple[Image.Image, Image.Image] | None:
    """Devuelve (versión plata, versión color) con el mismo recorte."""
    im = Image.open(path).convert("RGBA")
    # aplanar sobre blanco para logos con transparencia
    base = Image.new("RGBA", im.size, (255, 255, 255, 255))
    base.alpha_composite(im)
    gray = base.convert("L")
    slug = path.stem.split("-", 1)[1]
    light = slug in LIGHT_EXTRACTION
    lut = [
        min(255, int((v if light else 255 - v) * 1.55)) for v in range(256)
    ]
    alpha = gray.point(lut)
    out = Image.new("RGBA", im.size, TINT + (0,))
    out.putalpha(alpha)
    bbox = alpha.getbbox()
    if not bbox:
        return None

    # versión color PARA FONDO NAVY (el hover ya no aclara la tarjeta):
    # conserva los colores de marca pero vuelve legibles los oscuros,
    # como las variantes "on dark" oficiales — neutros oscuros → plata,
    # cromáticos oscuros → mismo matiz con más valor.
    if light:
        # placa clara: mismas letras que la versión plata, color original
        color = base.copy()
        color.putalpha(alpha)
    else:
        import numpy as np

        rgb = np.asarray(base.convert("RGB")).astype(float)
        v = rgb.max(axis=2)
        mn = rgb.min(axis=2)
        sat = np.where(v > 0, (v - mn) / np.maximum(v, 1), 0.0)
        alpha_c = np.clip((255 - mn) * 1.35, 0, 255).astype("uint8")
        neutral = sat < 0.35
        v_neutral = np.clip(255 - v * 0.6, 170, 240)
        dark_rgb = rgb.copy()
        for c in range(3):
            dark_rgb[..., c] = np.where(neutral, v_neutral, dark_rgb[..., c])
        lift = np.where((~neutral) & (v < 170), 170 / np.maximum(v, 1), 1.0)
        for c in range(3):
            dark_rgb[..., c] = np.clip(
                dark_rgb[..., c] * np.where(neutral, 1.0, lift), 0, 255
            )
        color = Image.fromarray(dark_rgb.astype("uint8"), "RGB").convert("RGBA")
        color.putalpha(Image.fromarray(alpha_c))

    def finish(img: Image.Image) -> Image.Image:
        img = img.crop(bbox)
        if img.width > 640:
            img = img.resize(
                (640, round(img.height * 640 / img.width)), Image.LANCZOS
            )
        return img

    return finish(out), finish(color)


def main() -> None:
    sheet_dir = Path(os.environ.get("SHEET_DIR", str(SRC)))
    results = []
    for path in sorted(SRC.glob("*.png")):
        prefix, slug = path.stem.split("-", 1)
        dest_dir = ROOT / "public" / (
            "marcas" if prefix == "brand" else "clientes"
        )
        dest_dir.mkdir(parents=True, exist_ok=True)
        pair = ink_alpha(path)
        if pair is None:
            print(f"!! {path.name}: vacío tras extracción", file=sys.stderr)
            continue
        out, color = pair
        dest = dest_dir / f"{slug}.png"
        out.save(dest)
        color.save(dest_dir / f"{slug}-color.png")
        results.append((path.stem, out))
        print(f"ok {path.name} -> {dest.relative_to(ROOT)} {out.size} (+color)")

    # hoja de contactos sobre navy para inspección
    if results:
        cell_w, cell_h, pad = 300, 150, 16
        cols = 4
        rows = (len(results) + cols - 1) // cols
        sheet = Image.new(
            "RGB", (cols * cell_w, rows * cell_h), NAVY
        )
        for i, (_, logo) in enumerate(results):
            thumb = logo.copy()
            thumb.thumbnail((cell_w - 2 * pad, cell_h - 2 * pad))
            x = (i % cols) * cell_w + (cell_w - thumb.width) // 2
            y = (i // cols) * cell_h + (cell_h - thumb.height) // 2
            sheet.paste(thumb, (x, y), thumb)
        sheet_path = sheet_dir / "contact-sheet.png"
        sheet.save(sheet_path)
        print(f"hoja: {sheet_path}")
        print("orden:", ", ".join(name for name, _ in results))


if __name__ == "__main__":
    main()
