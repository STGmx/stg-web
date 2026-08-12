import { VALUES } from "@/lib/brands";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import {
  IconTarget,
  IconEye,
  IconHandshake,
  IconDiploma,
  IconCrosshair,
  IconShield,
  IconScale,
  IconHeart,
} from "./icons";

const VALUE_ICONS = {
  handshake: IconHandshake,
  diploma: IconDiploma,
  crosshair: IconCrosshair,
  shield: IconShield,
  scale: IconScale,
  heart: IconHeart,
} as const;

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      aria-labelledby="h-nosotros"
      className="wrap py-24 sm:py-32"
    >
      <SectionHead
        id="h-nosotros"
        title="Nosotros"
        lead="Somos un equipo de profesionales en mantenimiento a instalaciones, equipos y generación. Surgimos con la intención de brindar servicios de la más alta calidad al mejor costo del mercado."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal>
          <article className="card card-hover h-full p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent">
              <IconTarget className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-white">
              Misión
            </h3>
            <p className="mt-3 leading-relaxed text-silver-2">
              Proveer mantenimiento correctivo, preventivo y de emergencia bajo
              estándares técnicos estrictos, garantizando eficiencia y
              continuidad operativa.
            </p>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <article className="card card-hover h-full p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent">
              <IconEye className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-serif text-xl font-semibold text-white">
              Visión
            </h3>
            <p className="mt-3 leading-relaxed text-silver-2">
              Ser la empresa líder en mantenimiento de sistemas críticos,
              reconocida por calidad, confiabilidad y seguridad operativa.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-16 text-center">
        <p className="rotulo">Nuestros valores</p>
      </Reveal>
      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {VALUES.map((value, i) => {
          const Icon = VALUE_ICONS[value.icon];
          return (
            <Reveal key={value.name} delay={i * 70}>
              <div className="card card-hover flex flex-col items-center gap-3.5 px-4 py-7">
                <Icon className="h-6 w-6 text-accent" />
                <span className="text-[0.95rem] font-semibold text-silver">
                  {value.name}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
