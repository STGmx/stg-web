import { CONTACTS, SITE, WA_DEFAULT } from "@/lib/site";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { IconWhatsApp, IconMail, IconPin } from "./icons";

/**
 * Mesa de contacto para comprador empresarial: atención directa,
 * zona de operación visible y directorio reglado + formulario.
 */
export default function Contacto() {
  return (
    <section id="contacto" className="wrap py-24 sm:py-32">
      <SectionHead
        title="Contacto"
        lead="Cotice mantenimiento, refrigeración y generación de energía para su empresa."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16">
        <div>
          <Reveal>
            <p className="rotulo mb-4">Atención directa</p>
            <a
              href={SITE.phoneHref}
              className="dato block w-max text-3xl tracking-tight text-white transition-colors hover:text-accent sm:text-4xl"
            >
              {SITE.phoneDisplay}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa !px-5 !py-2.5 text-[0.9rem]"
              >
                <IconWhatsApp className="h-[1.05rem] w-[1.05rem]" />
                WhatsApp
              </a>
              <a
                href="mailto:ventas@stgmx.mx"
                className="btn-ghost !px-5 !py-2.5 text-[0.9rem]"
              >
                <IconMail className="h-[1.05rem] w-[1.05rem]" />
                ventas@stgmx.mx
              </a>
            </div>
          </Reveal>

          <div className="my-10 h-px bg-line-2" aria-hidden="true" />

          <Reveal>
            <p className="rotulo mb-4">Zona de operación</p>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-accent">
                <IconPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-xl font-semibold text-white sm:text-2xl">
                  Cancún, Quintana Roo, México
                </p>
                <p className="mt-1.5 max-w-md text-[0.95rem] leading-relaxed text-silver-2">
                  Servicio en sitio para instalaciones comerciales e
                  industriales.
                </p>
                {/* TODO(cliente): dirección física y horario de atención */}
              </div>
            </div>
          </Reveal>

          <div className="my-10 h-px bg-line-2" aria-hidden="true" />

          <Reveal>
            <p className="rotulo mb-6">Directorio</p>
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {CONTACTS.map((contact) => (
                <li key={contact.email}>
                  <p className="font-semibold text-silver">{contact.role}</p>
                  {contact.person ? (
                    <p className="mt-0.5 text-[0.925rem] text-silver-2">
                      {contact.person}
                    </p>
                  ) : null}
                  <a
                    href={`mailto:${contact.email}`}
                    className="dato mt-1 inline-block break-all text-[0.875rem] text-accent hover:underline"
                  >
                    {contact.email}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="card p-7 lg:sticky lg:top-28">
            <h3 className="font-serif text-xl font-semibold text-white">
              Solicitar cotización
            </h3>
            <p className="mb-6 mt-2 text-[0.95rem] leading-relaxed text-silver-2">
              Su solicitud llega directo a nuestro equipo por WhatsApp o por
              correo.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
