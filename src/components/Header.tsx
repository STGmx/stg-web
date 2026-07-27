"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#marcas", label: "Marcas" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-navy/75 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-line-2" : "border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          className="flex min-w-0 items-center gap-3"
          aria-label={`${SITE.shortName} — inicio`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt=""
            width={456}
            height={322}
            priority
            className="h-9 w-auto"
          />
          <span className="hidden truncate font-serif text-[1.05rem] tracking-wide text-silver min-[900px]:block">
            Servicios Técnicos y de Generación
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.9rem] font-medium text-silver-2 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={SITE.phoneHref} className="dato text-[0.9rem] hover:text-white">
            {SITE.phoneDisplay}
          </a>
          <a href="#contacto" className="btn-primary !px-5 !py-2 text-[0.875rem]">
            Solicitar cotización
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-silver lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* panel móvil */}
      <div
        className={`grid overflow-hidden border-b border-line-2 bg-navy/95 backdrop-blur-md transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-b-0"
        }`}
      >
        <div className="min-h-0">
          <nav className="wrap flex flex-col py-3" aria-label="Principal móvil">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-line-2 py-3.5 text-[0.95rem] font-medium text-silver last:border-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between gap-4 py-4">
              <a href={SITE.phoneHref} className="dato">
                {SITE.phoneDisplay}
              </a>
              <a
                href="#contacto"
                className="btn-primary !px-5 !py-2 text-[0.875rem]"
                onClick={() => setOpen(false)}
              >
                Cotizar
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
