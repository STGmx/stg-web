import Image from "next/image";
import type { CSSProperties } from "react";
import { WA_DEFAULT } from "@/lib/site";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import {
  IconSnowflake,
  IconBolt,
  IconPower,
  IconGear,
  IconTeam,
  IconWhatsApp,
} from "./icons";

const GLYPHS: Record<ServiceSlug, typeof IconSnowflake> = {
  "cocina-refrigeracion": IconSnowflake,
  "trabajos-electricos": IconBolt,
  generadores: IconPower,
  "sistemas-mecanicos": IconGear,
  "personal-en-sitio": IconTeam,
};

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="h-inicio"
      className="relative flex min-h-svh flex-col overflow-hidden bg-navy pt-28"
    >
      {/* fondo: fotografía industrial con filtro duotono navy + grano */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/services/electricos.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_62%] opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-stg-blue/25 mix-blend-color" />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-navy/90" />
        <div
          className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
      </div>

      {/* — composición central: sello + titular + CTAs — */}
      <div className="wrap relative z-10 flex flex-1 flex-col items-center justify-center py-8 text-center">
        {/* sello: filete — logo — filete (sin caja) */}
        <div
          className="rise flex w-full max-w-2xl items-center gap-7 sm:gap-10"
          style={{ "--rise-delay": "60ms" } as CSSProperties}
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
          <Image
            src="/logo.png"
            alt="Logotipo de Servicios Técnicos y de Generación"
            width={456}
            height={322}
            priority
            className="w-28 drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)] sm:w-32"
          />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
        </div>

        <h1
          id="h-inicio"
          className="mt-8 font-serif text-[2.8rem] font-bold leading-[1.07] tracking-tight text-white sm:text-[3.6rem] lg:text-[4.2rem]"
        >
          <span className="line-mask">
            <span style={{ "--line-delay": "200ms" } as CSSProperties}>
              Especialistas en
            </span>
          </span>
          <span className="line-mask">
            <span
              className="font-semibold italic text-accent"
              style={{ "--line-delay": "350ms" } as CSSProperties}
            >
              mantenimiento crítico
            </span>
          </span>
          <span className="line-mask">
            <span style={{ "--line-delay": "500ms" } as CSSProperties}>
              y generación.
            </span>
          </span>
        </h1>

        <p
          className="rise mt-6 max-w-2xl text-lg leading-relaxed text-silver-2 sm:text-xl"
          style={{ "--rise-delay": "650ms" } as CSSProperties}
        >
          Brindamos soluciones integrales, rápidas y efectivas para que las
          operaciones de tu empresa nunca se detengan.
        </p>

        <div
          className="rise mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row sm:items-center"
          style={{ "--rise-delay": "800ms" } as CSSProperties}
        >
          <a href="#contacto" className="btn-primary">
            Solicitar cotización
          </a>
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <IconWhatsApp className="mr-2 h-5 w-5 text-[#25d366]" />
            Atención inmediata
          </a>
        </div>
      </div>

      {/* — Grid industrial de servicios — */}
      <div
        className="rise relative z-10 bg-navy-3/40 backdrop-blur-sm border-t border-line"
        style={{ "--rise-delay": "950ms" } as CSSProperties}
      >
        <div className="wrap px-0">
          <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-line border-x border-line">
            {SERVICES.map((service, i) => {
              const Glyph = GLYPHS[service.slug];
              return (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="group relative flex flex-col px-6 py-5 transition-colors duration-300 hover:bg-white/[0.03] overflow-hidden"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="text-accent/60 transition-colors group-hover:text-accent">
                      <Glyph className="h-7 w-7" />
                    </span>
                    <span className="dato text-xs text-silver-3 transition-colors group-hover:text-silver">
                      0{i + 1}
                    </span>
                  </div>
                  {/* No es un encabezado: es la etiqueta de un enlace de salto
                      a la sección Servicios, donde el mismo título ya vive en
                      un <h3>. Marcarlo como h3 aquí rompería el orden h1→h2→h3
                      y duplicaría los encabezados de las cinco líneas. */}
                  <span className="font-semibold text-silver transition-colors group-hover:text-white pr-4">
                    {service.title}
                  </span>

                  {/* Flecha revelable */}
                  <span className="absolute bottom-6 right-6 -translate-x-4 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
