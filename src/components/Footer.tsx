import Image from "next/image";
import { CONTACTS, SITE, WA_DEFAULT } from "@/lib/site";
import { IconWhatsApp } from "./icons";

const NAV = [
  { href: "#servicios", label: "Líneas de servicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#marcas", label: "Marcas" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
];

/**
 * Cierre de documento: eco del sello del hero (filete—logo—filete),
 * declaración serif a dos voces, CTAs y banda de directorio reglada.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line-2 bg-navy-3">
      <div className="wrap pb-16 pt-20">
        <div className="flex items-center gap-6 sm:gap-10">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
          <Image
            src="/logo.png"
            alt=""
            width={456}
            height={322}
            className="w-24 sm:w-28"
          />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-[1.4rem] leading-snug text-silver sm:text-[1.7rem]">
          Soluciones integrales de mantenimiento, refrigeración y generación de
          energía{" "}
          <span className="italic text-silver-2">para empresas.</span>
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </div>

      <div className="divider" aria-hidden="true" />

      <div className="wrap grid gap-x-10 gap-y-12 py-14 lg:grid-cols-[1fr_2fr_1fr]">
        <nav aria-label="Secciones">
          <p className="rotulo mb-5">Secciones</p>
          <ul className="flex flex-col gap-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.925rem] text-silver-2 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="rotulo mb-5">Directorio</p>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {CONTACTS.map((contact) => (
              <li key={contact.email}>
                <p className="text-[0.925rem] font-semibold text-silver">
                  {contact.role}
                </p>
                {contact.person ? (
                  <p className="mt-0.5 text-[0.875rem] text-silver-2">
                    {contact.person}
                  </p>
                ) : null}
                <a
                  href={`mailto:${contact.email}`}
                  className="dato mt-1 inline-block break-all text-[0.85rem] text-accent hover:underline"
                >
                  {contact.email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="rotulo mb-5">Datos</p>
          <a
            href={SITE.phoneHref}
            className="dato block text-xl text-silver hover:text-white"
          >
            {SITE.phoneDisplay}
          </a>
          <p className="mt-4 text-[0.875rem] text-silver-2">
            {SITE.city}, México
          </p>
          {/* TODO(cliente): razón social completa, dirección física,
              horario de atención, redes sociales, aviso de privacidad */}
        </div>
      </div>

      <div className="border-t border-line-2">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-6 text-[0.85rem] text-silver-3 sm:flex-row">
          <p>© 2026 {SITE.name}. Todos los derechos reservados.</p>
          <p>{SITE.city}, México</p>
        </div>
      </div>
    </footer>
  );
}
