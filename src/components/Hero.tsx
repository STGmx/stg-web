import Image from "next/image";
import { SITE, WA_DEFAULT } from "@/lib/site";
import { IconWhatsApp } from "./icons";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pb-16 pt-28"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[#0a0f18]" aria-hidden="true">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Glowing orbs */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/10 blur-[150px]"></div>
      </div>

      <div className="wrap relative flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        
        {/* Left Content */}
        <div className="flex max-w-2xl flex-col items-start text-left lg:w-1/2">
          
          <div
            className="rise inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-silver">Operando en {SITE.city} y la región</span>
          </div>

          <h1
            className="rise mt-8 font-serif text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ "--rise-delay": "150ms" } as React.CSSProperties}
          >
            Especialistas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-silver-3">mantenimiento crítico</span> y generación.
          </h1>

          <p
            className="rise mt-8 text-lg leading-relaxed text-silver-2 sm:text-xl"
            style={{ "--rise-delay": "250ms" } as React.CSSProperties}
          >
            Brindamos soluciones integrales, rápidas y efectivas para que las operaciones de tu empresa nunca se detengan.
          </p>

          <div
            className="rise mt-10 flex w-full flex-col gap-4 sm:flex-row sm:items-center"
            style={{ "--rise-delay": "350ms" } as React.CSSProperties}
          >
            <a 
              href="#contacto" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-8 py-3.5 font-bold text-navy transition-transform hover:scale-105"
            >
              <span className="relative z-10">Solicitar cotización</span>
              <div className="absolute inset-0 bg-white/20 transition-transform group-hover:scale-x-100 scale-x-0 origin-left"></div>
            </a>
            
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-navy/50 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <IconWhatsApp className="h-5 w-5 text-[#25D366]" />
              WhatsApp directo
            </a>
          </div>
        </div>

        {/* Right Graphic/Logo Showcase */}
        <div 
          className="rise mt-16 flex justify-center lg:mt-0 lg:w-1/2 lg:justify-end"
          style={{ "--rise-delay": "500ms" } as React.CSSProperties}
        >
          <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm sm:h-96 sm:w-96">
            {/* Pulsing rings */}
            <div className="absolute inset-0 animate-ping rounded-full border border-accent/20 opacity-20" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-4 rounded-full border border-white/10"></div>
            
            <Image
              src="/logo.png"
              alt="Logotipo de Servicios Técnicos y de Generación"
              width={456}
              height={322}
              priority
              className="relative z-10 w-48 drop-shadow-2xl sm:w-64"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
