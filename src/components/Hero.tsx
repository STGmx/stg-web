import Image from "next/image";
import type { CSSProperties } from "react";
import { WA_DEFAULT } from "@/lib/site";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import { CLIENTS } from "@/lib/brands";
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

/* altura de exhibición por logo */
const CLIENT_LOGO_H: Record<string, string> = {
  zoetry: "h-10",
  toks: "h-8",
  palladium: "h-5",
  carso: "h-6",
  "mercado-libre": "h-7",
};

export default function Hero() {
  return (
    <section
      id="inicio"
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
          className="object-cover object-[70%_62%] opacity-45 grayscale"
        />
        <div className="absolute inset-0 bg-stg-blue/25 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-navy/90" />
        <div className="absolute right-0 top-0 h-72 w-1/2 bg-gradient-to-bl from-navy/80 via-navy/30 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
      </div>

      <div className="wrap relative z-10 flex flex-1 flex-col justify-center py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12">

          {/* — texto aprobado + CTAs (8 columnas) — */}
          <div className="lg:col-span-8 flex flex-col">

            <h1 className="font-serif text-[3.2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[4.2rem] lg:text-[5.2rem]">
              <span className="line-mask block">
                <span style={{ "--line-delay": "200ms" } as CSSProperties}>
                  Especialistas en
                </span>
              </span>
              <span className="line-mask block mt-1">
                <span
                  className="font-semibold italic text-accent"
                  style={{ "--line-delay": "350ms" } as CSSProperties}
                >
                  mantenimiento crítico
                </span>
              </span>
              <span className="line-mask block mt-1">
                <span style={{ "--line-delay": "500ms" } as CSSProperties}>
                  y generación.
                </span>
              </span>
            </h1>

            <p
              className="rise mt-8 max-w-xl text-lg leading-relaxed text-silver-2 sm:text-xl"
              style={{ "--rise-delay": "650ms" } as CSSProperties}
            >
              Brindamos soluciones integrales, rápidas y efectivas para que
              las operaciones de tu empresa nunca se detengan.
            </p>

            <div
              className="rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
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

          {/* — Bento box abstracto (4 columnas) — */}
          <div
            className="rise hidden lg:grid lg:col-span-4 grid-cols-2 grid-rows-2 gap-4 h-full max-h-[360px]"
            style={{ "--rise-delay": "700ms" } as CSSProperties}
          >
            {/* placa de marca */}
            <div className="card card-hover flex items-center justify-center p-6">
              <Image
                src="/logo.png"
                alt="Logotipo STG"
                width={456}
                height={322}
                className="w-28 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
              />
            </div>

            {/* lámina fotográfica */}
            <div className="card group relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/services/cocina.png')] bg-cover bg-center opacity-45 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-2 via-navy-2/30 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-5">
                <IconSnowflake className="h-6 w-6 text-accent" />
              </div>
            </div>

            <div className="card group relative col-span-2 overflow-hidden p-6 flex flex-col justify-end min-h-[140px]">
              <div className="absolute inset-0 bg-[url('/services/mecanicos.png')] bg-cover bg-center opacity-30 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-2 via-navy-2/60 to-transparent"></div>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="block text-xl font-bold text-white mb-1">Personal Técnico</span>
                  <span className="rotulo">Altamente calificado</span>
                </div>
                <IconTeam className="h-7 w-7 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* — Grid industrial de servicios — */}
      <div
        className="rise relative z-10 mt-12 bg-navy-3/40 backdrop-blur-sm border-t border-line"
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
                  className="group relative flex flex-col p-6 transition-colors duration-300 hover:bg-white/[0.03] overflow-hidden"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <span className="text-accent/60 transition-colors group-hover:text-accent">
                      <Glyph className="h-7 w-7" />
                    </span>
                    <span className="dato text-xs text-silver-3 transition-colors group-hover:text-silver">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-silver transition-colors group-hover:text-white pr-4">
                    {service.title}
                  </h3>

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

      {/* — Prueba social: clientes reales — */}
      <div
        className="rise relative z-10 border-t border-line bg-navy/90 backdrop-blur-md"
        style={{ "--rise-delay": "1100ms" } as CSSProperties}
      >
        <div className="wrap flex flex-col md:flex-row items-center gap-x-12 gap-y-6 py-6 lg:py-8">
          <span className="rotulo shrink-0">Confían en nosotros</span>
          <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-8 lg:gap-14">
            {CLIENTS.map((client) =>
              client.logo ? (
                <Image
                  key={client.slug}
                  src={client.logo}
                  alt={`Logotipo de ${client.name}`}
                  width={240}
                  height={60}
                  className={`${CLIENT_LOGO_H[client.slug] ?? "h-6"
                    } w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500`}
                />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
