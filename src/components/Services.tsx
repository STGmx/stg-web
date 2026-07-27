import Image from "next/image";
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

export default function Services() {
  const standardServices = SERVICES.filter((s) => s.slug !== "personal-en-sitio");
  const specialService = SERVICES.find((s) => s.slug === "personal-en-sitio");

  return (
    <section id="servicios" className="wrap py-24 sm:py-32">
      <SectionHead
        title="Nuestros Servicios"
        lead="Soluciones integrales de mantenimiento preventivo, correctivo y de emergencia. Garantizamos continuidad operativa con altos estándares técnicos."
      />

      {/* 3-Column Grid for Standard Services */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {standardServices.map((service, index) => {
          const Glyph = GLYPHS[service.slug];
          
          return (
            <Reveal key={service.slug} delay={index * 100} className="h-full">
              <article
                id={service.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-2 bg-[#0a0f18] transition-all duration-300 hover:border-line hover:shadow-2xl hover:shadow-accent/5"
              >
                {/* Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line-2 bg-navy">
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-[#131b2c]/80 backdrop-blur-md text-accent shadow-sm">
                    <Glyph className="h-6 w-6" />
                  </div>
                  <span className="absolute bottom-4 right-4 dato text-[0.85rem] text-silver-3 bg-[#0a0f18]/80 px-2 py-1 rounded backdrop-blur-md">
                    {service.folio}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  
                  <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-silver-2">
                    {service.description}
                  </p>

                  <BrandRun slug={service.slug} />

                  <div className="mt-8">
                    <a
                      href={waLink(service.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line-2 bg-white/5 py-3 text-[0.95rem] font-semibold text-silver transition-all hover:bg-accent hover:text-navy hover:border-accent"
                    >
                      <IconWhatsApp className="h-5 w-5" />
                      Cotizar servicio
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Special Full-Width Card for Personal en Sitio */}
      {specialService && (
        <Reveal delay={400} className="mt-8">
          <article
            id={specialService.slug}
            className="group overflow-hidden rounded-2xl border border-line-2 bg-[#0a0f18] transition-all duration-300 hover:border-line hover:shadow-2xl hover:shadow-accent/5"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Side */}
              <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:w-2/5 border-b lg:border-b-0 lg:border-r border-line-2 bg-navy overflow-hidden">
                {specialService.image && (
                  <Image
                    src={specialService.image}
                    alt={specialService.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a0f18] via-[#0a0f18]/50 to-transparent opacity-90 lg:opacity-100" />
                
                <div className="absolute bottom-6 left-6 lg:top-8 lg:bottom-auto flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-[#131b2c]/80 backdrop-blur-md text-accent shadow-sm">
                  <IconTeam className="h-7 w-7" />
                </div>
              </div>

              {/* Content Side */}
              <div className="flex w-full flex-col p-6 sm:p-10 lg:w-3/5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-3xl font-semibold tracking-tight text-white">
                    {specialService.title}
                  </h3>
                  <span className="dato text-[0.85rem] text-silver-3">
                    {specialService.folio}
                  </span>
                </div>
                
                <p className="mt-4 text-lg leading-relaxed text-silver-2">
                  {specialService.description}
                </p>

                {/* Modalidades */}
                {specialService.modalidades && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {specialService.modalidades.map((m) => (
                      <div
                        key={m.title}
                        className="rounded-xl border border-white/5 bg-white/5 p-5"
                      >
                        <h4 className="font-semibold text-silver">{m.title}</h4>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-silver-2">
                          {m.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-10 lg:mt-auto lg:pt-8">
                  <a
                    href={waLink(specialService.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-[1rem] font-bold text-navy transition-all hover:bg-accent-light hover:scale-[1.02]"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    Cotizar Personal en Sitio
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      )}
    </section>
  );
}
