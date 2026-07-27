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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0a0f18]/85 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-8">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
          aria-label={`${SITE.shortName} — inicio`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="STG Logo"
            width={456}
            height={322}
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </a>

        {/* Centered Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-silver-2 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          <a 
            href={SITE.phoneHref} 
            className="text-[0.95rem] font-semibold text-silver hover:text-white transition-colors"
          >
            {SITE.phoneDisplay}
          </a>
          <a 
            href="#contacto" 
            className="rounded-full bg-accent px-6 py-2.5 text-[0.95rem] font-bold text-navy shadow-lg shadow-accent/20 transition-all hover:scale-105 hover:bg-accent-light"
          >
            Cotizar ahora
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-silver transition-colors hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`grid overflow-hidden bg-[#0a0f18]/95 backdrop-blur-xl transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] border-b border-white/10 shadow-2xl" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="wrap flex flex-col py-6" aria-label="Principal móvil">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-white/5 py-4 text-center text-lg font-medium text-silver transition-colors hover:text-accent last:border-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col items-center gap-4">
              <a href={SITE.phoneHref} className="text-lg font-semibold text-silver">
                {SITE.phoneDisplay}
              </a>
              <a
                href="#contacto"
                className="w-full rounded-full bg-accent py-3 text-center text-[1.05rem] font-bold text-navy shadow-lg shadow-accent/20 transition-colors hover:bg-accent-light"
                onClick={() => setOpen(false)}
              >
                Cotizar ahora
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
