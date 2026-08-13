import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Reveal from "@/components/Reveal";
import LogoMark from "@/components/LogoMark";
import {
  IconSnowflake,
  IconBolt,
  IconPower,
  IconGear,
  IconTeam,
  IconWhatsApp,
} from "@/components/icons";

import { SERVICES, type ServiceSlug } from "@/lib/services";
import { BRAND_GROUPS } from "@/lib/brands";
import { SITE, waLink } from "@/lib/site";
import { buildServiceGraph } from "@/lib/schema";

const GLYPHS: Record<ServiceSlug, typeof IconSnowflake> = {
  "cocina-refrigeracion": IconSnowflake,
  "trabajos-electricos": IconBolt,
  generadores: IconPower,
  "sistemas-mecanicos": IconGear,
  "personal-en-sitio": IconTeam,
};

/** Una página estática por línea de servicio. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/servicios/${service.slug}/` },
    openGraph: {
      type: "article",
      url: `/servicios/${service.slug}/`,
      title: `${service.seoTitle} | ${SITE.shortName} Cancún`,
      description: service.seoDescription,
    },
    twitter: {
      title: `${service.seoTitle} | ${SITE.shortName} Cancún`,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Glyph = GLYPHS[service.slug];
  const brandGroup = BRAND_GROUPS.find((g) => g.serviceSlug === service.slug);
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Header />
      <main>
        {/* — Cabecera de línea: mismo tratamiento duotono que el hero — */}
        <section
          aria-labelledby="h-servicio"
          className="relative overflow-hidden bg-navy pt-36 pb-20 sm:pt-40 sm:pb-24"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={service.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25 grayscale"
            />
            <div className="absolute inset-0 bg-stg-blue/25 mix-blend-color" />
            <div className="absolute inset-0 bg-navy/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/90" />
          </div>

          <div className="wrap relative z-10">
            <nav aria-label="Ruta de navegación" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-silver-3">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#servicios"
                    className="transition-colors hover:text-accent"
                  >
                    Servicios
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-silver-2">
                  {service.title}
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center border border-line bg-navy-3 text-accent">
                <Glyph className="h-6 w-6" />
              </span>
              <span className="dato border border-line bg-navy-3/50 px-2.5 py-1 text-sm text-silver-3">
                {service.folio}
              </span>
            </div>

            <h1
              id="h-servicio"
              className="mt-8 max-w-3xl font-serif text-[2.4rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[3.2rem]"
            >
              {service.seoTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver-2">
              {service.description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/#contacto" className="btn-primary">
                Solicitar cotización
              </Link>
              <a
                href={waLink(service.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
                WhatsApp · {SITE.whatsappDisplay}
              </a>
            </div>
          </div>
        </section>

        <div className="divider" aria-hidden="true" />

        {/* — Modalidades, solo donde el brochure las declara — */}
        {service.modalidades ? (
          <>
            <section
              aria-labelledby="h-modalidades"
              className="wrap py-20 sm:py-24"
            >
              <Reveal>
                <h2
                  id="h-modalidades"
                  className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  Modalidades de servicio
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {service.modalidades.map((m, i) => (
                  <Reveal key={m.title} delay={i * 120}>
                    <article className="card card-hover h-full p-8">
                      <h3 className="font-serif text-xl font-semibold text-white">
                        {m.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-silver-2">
                        {m.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
            <div className="divider" aria-hidden="true" />
          </>
        ) : null}

        {/* — Marcas de esta línea: el contenido que distingue esta página — */}
        {brandGroup ? (
          <>
            <section aria-labelledby="h-marcas-linea" className="wrap py-20 sm:py-24">
              <Reveal>
                <h2
                  id="h-marcas-linea"
                  className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  Servicio multimarca
                </h2>
                <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-silver-2">
                  Atendemos {brandGroup.label.toLowerCase()} de las siguientes
                  marcas.
                </p>
              </Reveal>
              <ul
                className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
                role="list"
              >
                {brandGroup.brands.map((brand) => (
                  <li key={brand.slug}>
                    <div className="group card card-hover flex h-32 flex-col items-center justify-center gap-3.5 px-4">
                      {brand.logo ? (
                        <>
                          <LogoMark
                            src={brand.logo}
                            name={brand.name}
                            shape={brand.shape}
                          />
                          <span className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-silver-3 transition-colors duration-300 group-hover:text-silver-2">
                            {brand.name}
                          </span>
                        </>
                      ) : (
                        <span className="font-serif text-lg italic text-silver">
                          {brand.name}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <div className="divider" aria-hidden="true" />
          </>
        ) : null}

        {/* — Enlaces internos entre líneas: reparten autoridad y dan a Google
              un camino para descubrir las cinco páginas — */}
        <section aria-labelledby="h-otras" className="wrap py-20 sm:py-24">
          <Reveal>
            <h2
              id="h-otras"
              className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Otras líneas de servicio
            </h2>
          </Reveal>
          <ul
            className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2"
            role="list"
          >
            {others.map((other) => {
              const OtherGlyph = GLYPHS[other.slug];
              return (
                <li key={other.slug}>
                  <Link
                    href={`/servicios/${other.slug}/`}
                    className="group flex h-full flex-col bg-navy px-7 py-7 transition-colors hover:bg-navy-2"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-accent/60 transition-colors group-hover:text-accent">
                        <OtherGlyph className="h-6 w-6" />
                      </span>
                      <span className="dato text-xs text-silver-3">
                        {other.folio}
                      </span>
                    </div>
                    <h3 className="mt-5 font-semibold text-silver transition-colors group-hover:text-white">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-[0.925rem] leading-relaxed text-silver-3">
                      {other.description}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildServiceGraph(
              service.slug,
              service.seoTitle,
              service.seoDescription,
            ),
          ),
        }}
      />
    </>
  );
}
