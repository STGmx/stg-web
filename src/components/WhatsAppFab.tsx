"use client";

import { useEffect, useState } from "react";
import { WA_DEFAULT } from "@/lib/site";
import { IconWhatsApp } from "./icons";

/**
 * Botón flotante de WhatsApp. Aparece exactamente al salir del hero
 * (mide #inicio); si no existe el ancla, usa 320px de fallback.
 */
export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let threshold = 320;
    const measure = () => {
      const hero = document.getElementById("inicio");
      if (hero) threshold = hero.offsetTop + hero.offsetHeight - 80;
    };
    const onScroll = () => setVisible(window.scrollY > threshold);
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <a
      href={WA_DEFAULT}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
