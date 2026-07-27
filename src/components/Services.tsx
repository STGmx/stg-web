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
} from "./icons";

const GLYPHS: Record<ServiceSlug, typeof IconSnowflake> = {
  "cocina-refrigeracion": IconSnowflake,
  "trabajos-electricos": IconBolt,
  generadores: IconPower,
  "sistemas-mecanicos": IconGear,
  "personal-en-sitio": IconTeam,
};

/* logo compacto en plata con crossfade a color (requiere ancestro .group) */
function BrandLogo({
  logo,
  name,
  emblem,
}: {
  logo: string;
  name: string;
  emblem: boolean;
}) {
  const size = emblem ? "max-h-8" : "max-h-[1.15rem]";
  return (
    <span className="group/logo relative inline-flex items-center">
      <Image
        src={logo}
        alt={`Logotipo de ${name}`}
        width={160}
        height={40}
        className={`${size} w-auto max-w-[6.5rem] opacity-80 transition-opacity duration-300 group-hover/logo:opacity-0`}
      />
      <Image
        src={logo.replace(/\.png$/, "-color.png")}
        alt=""
        width={160}
        height={40}
        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
      />
    </span>
  );
}

function BrandRun({ slug }: { slug: ServiceSlug }) {
  const group = BRAND_GROUPS.find((g) => g.serviceSlug === slug);
  if (!group) return null;
  return (
    <div className="mt-8 flex flex-col gap-4">
      <span className="rotulo !text-silver-3">Servicio multimarca</span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
        {group.brands.map((brand) =>
          brand.logo ? (
            <BrandLogo
              key={brand.slug}
              logo={brand.logo}
              name={brand.name}
              emblem={brand.shape === "emblem"}
            />
          ) : (
            <span
              key={brand.slug}
              className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-silver-2"
            >
              {brand.name}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const standardServices = SERVICES.filter((s) => s.slug !== "personal-en-sitio");
  const specialService = SERVICES.find((s) => s.slug === "personal-en-sitio");

  return (
    <section id="servicios" className="relative py-24 sm:py-32 bg-navy">
      {/* Patrón técnico de fondo */}
      <div className="absolute inset-0 grid-paper pointer-events-none opacity-[0.15]" aria-hidden="true" />
      
      <div className="wrap relative z-10">
        <SectionHead
          title="Nuestros Servicios"
          lead="Mantenimiento correctivo, preventivo y de emergencia bajo estándares técnicos estrictos, garantizando eficiencia y continuidad operativa."
        />

        {/* Retícula Industrial para Servicios Estándar */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 border-t border-l border-line bg-navy-2/20 backdrop-blur-sm">
          {standardServices.map((service, index) => {
            const Glyph = GLYPHS[service.slug];
            return (
              <Reveal key={service.slug} delay={index * 100} className="relative group">
                <article
                  id={service.slug}
                  className="relative flex flex-col h-full min-h-[440px] border-b border-r border-line p-8 sm:p-12 overflow-hidden transition-colors duration-500 hover:bg-navy-2/60"
                >
                  {/* Imagen de fondo técnica */}
                  {service.image && (
                    <>
                      <div className="absolute inset-0 opacity-[0.07] grayscale mix-blend-luminosity transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-105">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent pointer-events-none" />
                    </>
                  )}

                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-12">
                      <div className="flex h-12 w-12 items-center justify-center border border-line bg-navy-3 text-accent shadow-sm">
                        <Glyph className="h-6 w-6" />
                      </div>
                      <span className="dato text-sm text-silver-3 bg-navy-3/50 px-2.5 py-1 border border-line">
                        {service.folio}
                      </span>
                    </div>

                    <h3 className="mt-auto font-serif text-3xl font-bold tracking-tight text-white">
                      {service.title}
                    </h3>
                    
                    <p className="mt-4 text-silver-2 leading-relaxed max-w-md">
                      {service.description}
                    </p>

                    <BrandRun slug={service.slug} />

                    <div className="mt-10 pt-6 border-t border-line-2">
                      <a
                        href={waLink(service.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-quiet text-sm uppercase tracking-[0.15em]"
                      >
                        Cotizar esta línea
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Panel Especial Full-Width */}
        {specialService && (
          <Reveal delay={200} className="relative z-10">
            <article
              id={specialService.slug}
              className="group relative flex flex-col lg:flex-row border-b border-l border-r border-line bg-navy-3 overflow-hidden"
            >
              {/* Mitad Imagen */}
              <div className="relative w-full lg:w-1/2 aspect-[16/9] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-line overflow-hidden bg-navy">
                {specialService.image && (
                  <>
                    <div className="absolute inset-0 opacity-30 grayscale mix-blend-luminosity transition-all duration-700 group-hover:scale-105 group-hover:opacity-45">
                      <Image
                        src={specialService.image}
                        alt={specialService.imageAlt}
                        fill
                        className="-scale-x-100 object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-navy-3 via-navy-3/80 to-transparent pointer-events-none" />
                    {/* entierra la señalética IA del render (SECTION B4 / CAUTION) */}
                    <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy-3/95 via-navy-3/60 to-transparent pointer-events-none" />
                  </>
                )}
                <div className="absolute bottom-8 left-8 lg:top-12 lg:left-12 lg:bottom-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center border border-line bg-navy-2 text-accent shadow-sm">
                      <IconTeam className="h-7 w-7" />
                    </div>
                    <span className="dato text-sm text-silver-3 bg-navy-2 px-2.5 py-1 border border-line">
                      {specialService.folio}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mitad Contenido */}
              <div className="relative w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-16">
                <h3 className="font-serif text-[2.5rem] font-bold tracking-tight text-white leading-tight">
                  {specialService.title}
                </h3>
                
                <p className="mt-5 text-lg leading-relaxed text-silver-2">
                  {specialService.description}
                </p>

                {/* Modalidades como especificaciones técnicas */}
                {specialService.modalidades && (
                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {specialService.modalidades.map((m) => (
                      <div
                        key={m.title}
                        className="border-l-[3px] border-accent/40 pl-5 py-1"
                      >
                        <h4 className="font-semibold text-silver tracking-wide">{m.title}</h4>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-silver-3">
                          {m.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-line-2 lg:mt-auto lg:pt-10">
                  <a
                    href={waLink(specialService.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex"
                  >
                    Cotizar Personal en Sitio
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  );
}
