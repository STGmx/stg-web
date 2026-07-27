import type { CSSProperties } from "react";

/**
 * Plano de ingeniería de un engrane (eco del logo): líneas de centro
 * punto-raya, círculo de paso discontinuo, barreno de tornillos y cuñero.
 * El engrane gira una vuelta cada 4 minutos; las líneas de centro,
 * como en un plano real, no giran.
 */
function GearDrawing({ className }: { className: string }) {
  const teeth = 28;
  const bolts = 8;
  return (
    <svg
      viewBox="-400 -400 800 800"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* líneas de centro (anotación de plano: estáticas) */}
      <g className="stroke-line" strokeWidth="1" opacity="0.55">
        <path d="M-396 0H396" strokeDasharray="30 10 5 10" />
        <path d="M0 -396V396" strokeDasharray="30 10 5 10" />
      </g>

      <g className="gear-spin stroke-line" strokeWidth="1.3">
        {/* dientes */}
        {Array.from({ length: teeth }, (_, i) => (
          <rect
            key={i}
            x="-16"
            y="-332"
            width="32"
            height="32"
            rx="4"
            transform={`rotate(${(i * 360) / teeth})`}
          />
        ))}
        {/* cuerpo */}
        <circle r="302" />
        <circle r="220" />
        {/* círculo de paso (convención de plano, en discontinua) */}
        <circle r="317" strokeDasharray="7 9" className="stroke-accent" opacity="0.45" />
        {/* círculo de barrenos */}
        <circle r="260" strokeDasharray="22 8 4 8" opacity="0.5" />
        {Array.from({ length: bolts }, (_, i) => (
          <circle
            key={i}
            cy="-260"
            r="17"
            transform={`rotate(${(i * 360) / bolts})`}
          />
        ))}
        {/* masa y cuñero */}
        <circle r="96" />
        <path d="M-13 -96h26v-19h-26z" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-28"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,#0e1726_0%,#0a0f18_55%)]" />
        <GearDrawing className="absolute -right-44 top-1/2 hidden h-[54rem] w-[54rem] -translate-y-1/2 opacity-90 md:block" />
        <GearDrawing className="absolute -right-40 -top-32 h-[26rem] w-[26rem] opacity-60 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="wrap relative">
        <h1 className="font-serif text-[2.7rem] font-bold leading-[1.07] tracking-tight text-white sm:text-[4rem] lg:text-[5.25rem] xl:text-[6rem]">
          <span className="line-mask">
            <span style={{ "--line-delay": "120ms" } as CSSProperties}>
              Especialistas en
            </span>
          </span>
          <span className="line-mask">
            <span
              className="font-semibold italic text-accent"
              style={{ "--line-delay": "280ms" } as CSSProperties}
            >
              mantenimiento crítico
            </span>
          </span>
          <span className="line-mask">
            <span style={{ "--line-delay": "440ms" } as CSSProperties}>
              y generación.
            </span>
          </span>
        </h1>

        <p
          className="rise mt-10 max-w-xl border-l-2 border-accent/70 pl-6 text-lg leading-relaxed text-silver-2 sm:text-xl lg:ml-[34%]"
          style={{ "--rise-delay": "760ms" } as CSSProperties}
        >
          Brindamos soluciones integrales, rápidas y efectivas para que las
          operaciones de tu empresa nunca se detengan.
        </p>
      </div>
    </section>
  );
}
