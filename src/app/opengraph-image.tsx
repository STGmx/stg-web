import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";

// `output: "export"` exige declararlo: la imagen se renderiza una vez en build.
export const dynamic = "force-static";

export const alt =
  "STG · Mantenimiento, refrigeración y generación de energía en Cancún";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* El logo se incrusta como data URI: durante `next build` no hay servidor
   del que pedir /logo.png. */
const LOGO = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "logo.png"),
).toString("base64")}`;

const NAVY = "#0c1522";
const LINE = "#22334a";
const SILVER = "#d4dde8";
const SILVER_2 = "#94a6bc";
const ACCENT = "#74a7d8";

/** Tarjeta social 1200×630 en la papelería del sitio. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: NAVY,
          color: SILVER,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* retícula técnica de fondo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: `radial-gradient(120% 90% at 50% 0%, rgba(9,95,165,0.30) 0%, rgba(12,21,34,0) 60%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "68px 80px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img src={LOGO} width={180} height={127} alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 17,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: SILVER_2,
                }}
              >
                Cotizaciones
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  fontWeight: 700,
                  color: ACCENT,
                }}
              >
                {SITE.phoneDisplay}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginTop: 44,
              maxWidth: 900,
            }}
          >
            Especialistas en mantenimiento crítico y generación
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: SILVER_2,
              marginTop: 24,
              maxWidth: 860,
              lineHeight: 1.35,
            }}
          >
            Soluciones integrales para que las operaciones de tu empresa nunca
            se detengan · {SITE.city}
          </div>
        </div>

        {/* banda inferior: las cinco líneas de servicio en un solo renglón */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            background: "rgba(10,17,27,0.75)",
            padding: "28px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: SILVER_2,
              whiteSpace: "nowrap",
            }}
          >
            {SERVICES.map((s) => s.title).join("  ·  ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
