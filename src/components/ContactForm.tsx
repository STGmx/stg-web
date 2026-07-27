"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/services";
import { waLink } from "@/lib/site";
import { IconWhatsApp, IconMail } from "./icons";

/**
 * Sin backend: el formulario compone el mensaje y lo entrega
 * por WhatsApp o por correo (mailto a ventas@stgmx.mx).
 */
export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [servicio, setServicio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const compose = () => {
    const parts = [
      `Hola, STG. Soy ${nombre.trim() || "—"}${empresa.trim() ? `, de ${empresa.trim()}` : ""}.`,
    ];
    if (servicio) parts.push(`Línea de interés: ${servicio}.`);
    if (mensaje.trim()) parts.push(mensaje.trim());
    parts.push("Me interesa solicitar una cotización.");
    return parts.join(" ");
  };

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(compose()), "_blank", "noopener,noreferrer");
  };

  const sendMail = () => {
    const subject = `Solicitud de cotización${empresa.trim() ? ` — ${empresa.trim()}` : ""}`;
    window.location.href = `mailto:ventas@stgmx.mx?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(compose())}`;
  };

  const field =
    "w-full rounded-lg border border-line-2 bg-navy px-4 py-3 text-[0.95rem] text-silver placeholder:text-silver-3 outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={sendWhatsApp} className="flex flex-col gap-4">
      <div>
        <label htmlFor="f-nombre" className="rotulo mb-2 block">
          Nombre
        </label>
        <input
          id="f-nombre"
          className={field}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoComplete="name"
          placeholder="Su nombre"
        />
      </div>
      <div>
        <label htmlFor="f-empresa" className="rotulo mb-2 block">
          Empresa
        </label>
        <input
          id="f-empresa"
          className={field}
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          autoComplete="organization"
          placeholder="Nombre de su empresa"
        />
      </div>
      <div>
        <label htmlFor="f-servicio" className="rotulo mb-2 block">
          Línea de servicio
        </label>
        <select
          id="f-servicio"
          className={`${field} appearance-none`}
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        >
          <option value="">Seleccionar…</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-mensaje" className="rotulo mb-2 block">
          Mensaje
        </label>
        <textarea
          id="f-mensaje"
          className={`${field} min-h-28 resize-y`}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Cuéntenos qué necesita su operación"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <button
          type="submit"
          className="btn w-full bg-[#25d366] text-[#06281a] hover:bg-[#3ddf7c]"
        >
          <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
          Enviar por WhatsApp
        </button>
        <button type="button" onClick={sendMail} className="btn-ghost w-full">
          <IconMail className="h-[1.1rem] w-[1.1rem]" />
          Enviar por correo
        </button>
      </div>
    </form>
  );
}
