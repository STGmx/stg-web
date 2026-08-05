import { CLIENTS } from "@/lib/brands";
import SectionHead from "./SectionHead";
import LogoMark from "./LogoMark";

function Half({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-half" aria-hidden={hidden || undefined}>
      {CLIENTS.map((client) => (
        <div
          key={client.slug}
          className="group card card-hover flex min-w-56 flex-col items-center justify-center gap-3 px-9 py-6"
        >
          {client.logo ? (
            <>
              <LogoMark
                src={client.logo}
                name={hidden ? "" : client.name}
                shape={client.shape}
              />
              <span className="whitespace-nowrap text-[0.8rem] text-silver-3 transition-colors duration-300 group-hover:text-silver-2">
                {client.name}
              </span>
            </>
          ) : (
            <span className="whitespace-nowrap font-serif text-lg italic text-silver">
              {client.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Clientes() {
  return (
    <section id="clientes" className="py-24 sm:py-32">
      <div className="wrap">
        <SectionHead
          title="Casos de éxito:"
          lead="Empresas en hospitalidad, retail, logística e infraestructura confían en nosotros."
        />
      </div>

      {/* carrusel continuo; en pausa al pasar el cursor y estático con reduced-motion */}
      <div className="marquee">
        <div className="marquee-track">
          <Half />
          <Half hidden />
        </div>
      </div>
    </section>
  );
}
