import { SERVICES, type ServiceSlug } from "@/lib/services";
import { BRAND_GROUPS } from "@/lib/brands";
import { waLink } from "@/lib/site";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
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

function BrandRun({ slug }: { slug: ServiceSlug }) {
  const group = BRAND_GROUPS.find((g) => g.serviceSlug === slug);
  if (!group) return null;
  return (
    <div className="mt-6 border-t border-line-2 pt-5">
      <p className="rotulo mb-2.5">Servicio multimarca</p>
      <p className="text-[0.95rem] leading-relaxed text-silver-2">
        {group.brands.map((brand, i) => (
          <span key={brand.slug}>
            <span className="whitespace-nowrap">
              {brand.name}
              {i < group.brands.length - 1 && (
                <span className="text-silver-3"> · </span>
              )}
            </span>
            <wbr />
          </span>
        ))}
      </p>
    </div>
  );
}

/**
 * Retícula directa: las cinco líneas visibles de inmediato.
 * 2 + 2 arriba, Personal en Sitio a lo ancho con sus dos modalidades.
 */
export default function Services() {
  const wide = SERVICES.filter((s) => s.slug === "personal-en-sitio");
  const grid = SERVICES.filter((s) => s.slug !== "personal-en-sitio");

  return (
    <section id="servicios" className="wrap py-24 sm:py-32">
      <SectionHead
        title="Líneas de servicio"
        lead="Mantenimiento correctivo, preventivo y de emergencia bajo estándares técnicos estrictos, garantizando eficiencia y continuidad operativa."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {grid.map((service, i) => {
          const Glyph = GLYPHS[service.slug];
          return (
            <Reveal key={service.slug} delay={(i % 2) * 90} className="h-full">
              <article
                id={service.slug}
                className="card card-hover flex h-full scroll-mt-28 flex-col p-7 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-accent">
                    <Glyph className="h-[1.35rem] w-[1.35rem]" />
                  </span>
                  <span
                    className="dato text-[0.85rem] text-silver-3"
                    aria-hidden="true"
                  >
                    {service.folio}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-prose text-[1.0313rem] leading-relaxed text-silver-2">
                  {service.description}
                </p>

                <BrandRun slug={service.slug} />

                <div className="mt-auto pt-7">
                  <a
                    href={waLink(service.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#7ce0a8] transition-colors hover:text-[#a9ecc7]"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    Cotizar esta línea
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}

        {wide.map((service) => {
          const Glyph = GLYPHS[service.slug];
          return (
            <Reveal
              key={service.slug}
              className="lg:col-span-2"
              delay={120}
            >
              <article
                id={service.slug}
                className="card card-hover flex h-full scroll-mt-28 flex-col p-7 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-accent">
                    <Glyph className="h-[1.35rem] w-[1.35rem]" />
                  </span>
                  <span
                    className="dato text-[0.85rem] text-silver-3"
                    aria-hidden="true"
                  >
                    {service.folio}
                  </span>
                </div>

                <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
                  <div>
                    <h3 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[1.0313rem] leading-relaxed text-silver-2">
                      {service.description}
                    </p>
                    <div className="hidden pt-7 lg:block">
                      <a
                        href={waLink(service.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#7ce0a8] transition-colors hover:text-[#a9ecc7]"
                      >
                        <IconWhatsApp className="h-4 w-4" />
                        Cotizar esta línea
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {service.modalidades?.map((m) => (
                      <div
                        key={m.title}
                        className="rounded-xl border border-line-2 bg-navy p-5"
                      >
                        <h4 className="font-semibold text-silver">{m.title}</h4>
                        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-silver-2">
                          {m.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 lg:hidden">
                    <a
                      href={waLink(service.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#7ce0a8] transition-colors hover:text-[#a9ecc7]"
                    >
                      <IconWhatsApp className="h-4 w-4" />
                      Cotizar esta línea
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
