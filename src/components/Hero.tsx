import Image from "next/image";
import { SITE, WA_DEFAULT } from "@/lib/site";
import { IconWhatsApp } from "./icons";

/**
 * Cubierta de documento a página completa: sello central engastado
 * en un filete horizontal, titular monumental a dos voces, CTAs.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-16 pt-28"
    >
      <div className="grid-paper absolute inset-0" aria-hidden="true" />

      <div className="wrap relative">
        {/* sello: línea — logo — línea */}
        <div
          className="rise flex items-center gap-6 sm:gap-10"
          style={{ "--rise-delay": "80ms" } as React.CSSProperties}
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
          <Image
            src="/logo.png"
            alt="Logotipo de Servicios Técnicos y de Generación"
            width={456}
            height={322}
            priority
            className="w-40 sm:w-52"
          />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
        </div>

        <h1
          className="rise mx-auto mt-12 max-w-4xl text-center font-serif text-[2.4rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-6xl"
          style={{ "--rise-delay": "220ms" } as React.CSSProperties}
        >
          Soluciones integrales de mantenimiento, refrigeración
          <span className="mt-2 block font-normal italic text-silver-2">
            y generación de energía para empresas.
          </span>
        </h1>

        <p
          className="rise mx-auto mt-8 max-w-xl text-center text-[1.0625rem] leading-relaxed text-silver-2"
          style={{ "--rise-delay": "360ms" } as React.CSSProperties}
        >
          Somos un equipo de profesionales en mantenimiento a instalaciones,
          equipos y generación. {SITE.city}.
        </p>

        <div
          className="rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ "--rise-delay": "500ms" } as React.CSSProperties}
        >
          <a href="#contacto" className="btn-primary w-full sm:w-auto">
            Solicitar cotización
          </a>
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa w-full sm:w-auto"
          >
            <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
            WhatsApp · {SITE.phoneDisplay}
          </a>
        </div>

        <a
          href="#servicios"
          className="rise mx-auto mt-16 flex w-max flex-col items-center gap-2 text-silver-3 transition-colors hover:text-silver"
          style={{ "--rise-delay": "680ms" } as React.CSSProperties}
        >
          <span className="rotulo">Nuestros servicios</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          >
            <path d="M12 5v14m0 0-5-5m5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
