import type { SVGProps } from "react";

/**
 * Set de iconos propio — trazo 1.6, monocromo, hereda currentColor.
 */

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* — glifos de líneas de servicio — */

export function IconSnowflake(props: P) {
  return (
    <Base {...props}>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
      <path d="M12 3l-2 2.2M12 3l2 2.2M12 21l-2-2.2M12 21l2-2.2M4.2 7.5l2.9.5M4.2 16.5l2.9-.5M19.8 7.5l-2.9.5M19.8 16.5l-2.9-.5" />
    </Base>
  );
}

export function IconBolt(props: P) {
  return (
    <Base {...props}>
      <path d="M13.5 3 6 13.5h5L10.5 21 18 10.5h-5L13.5 3Z" />
    </Base>
  );
}

export function IconPower(props: P) {
  return (
    <Base {...props}>
      <path d="M12 3v8" />
      <path d="M7.2 6.2a7 7 0 1 0 9.6 0" />
    </Base>
  );
}

export function IconGear(props: P) {
  return (
    <Base {...props}>
      <path d="M12 2.8 19.8 7.3v9.4L12 21.2 4.2 16.7V7.3L12 2.8Z" />
      <circle cx="12" cy="12" r="3.4" />
    </Base>
  );
}

export function IconTeam(props: P) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M16.4 14.6c2.2.2 3.7 1.8 4.1 4.4" />
    </Base>
  );
}

/* — misión / visión — */

export function IconTarget(props: P) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function IconEye(props: P) {
  return (
    <Base {...props}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Base>
  );
}

/* — valores — */

export function IconHandshake(props: P) {
  return (
    <Base {...props}>
      <path d="m11 6.5-3.2-1.7L2.5 8v6.5l3 1.8" />
      <path d="M21.5 8l-5.3-3.2L11 6.5 8.2 9.3a1.4 1.4 0 0 0 2 2l2.3-2.1" />
      <path d="M21.5 14.5 18 16.7l-4.5 2.8-2.6-1.6" />
      <path d="m12.5 9.2 4.6 3.6a1.5 1.5 0 0 1-1.8 2.4" />
      <path d="M15.3 15.2a1.5 1.5 0 0 1-1.9 2.3l-1-.7a1.5 1.5 0 0 1-1.9 2.2" />
    </Base>
  );
}

export function IconDiploma(props: P) {
  return (
    <Base {...props}>
      <path d="M4 5.5h16v10.5H13M4 5.5V16h3" />
      <path d="M7 9h10M7 12h5" />
      <circle cx="10" cy="17" r="2.6" />
      <path d="m8.7 19.2-.7 3 2-1 2 1-.7-3" />
    </Base>
  );
}

export function IconCrosshair(props: P) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2.5V7M12 17v4.5M2.5 12H7M17 12h4.5" />
    </Base>
  );
}

export function IconShield(props: P) {
  return (
    <Base {...props}>
      <path d="M12 2.8 4.5 5.6v6c0 4.6 3.1 7.8 7.5 9.6 4.4-1.8 7.5-5 7.5-9.6v-6L12 2.8Z" />
      <path d="m8.8 11.8 2.2 2.3 4.2-4.4" />
    </Base>
  );
}

export function IconScale(props: P) {
  return (
    <Base {...props}>
      <path d="M12 4v15M7.5 19h9M12 4c-2 1-4.5 1.4-6.5 1.2M12 4c2 1 4.5 1.4 6.5 1.2" />
      <path d="M5.5 5.2 3 11.5h5L5.5 5.2ZM3 11.5a2.5 2.5 0 0 0 5 0" />
      <path d="M18.5 5.2 16 11.5h5l-2.5-6.3ZM16 11.5a2.5 2.5 0 0 0 5 0" />
    </Base>
  );
}

export function IconHeart(props: P) {
  return (
    <Base {...props}>
      <path d="M12 20s-7.5-4.6-9-9.3C2 7.6 4 5 6.8 5c2 0 3.7 1.2 5.2 3.2C13.5 6.2 15.2 5 17.2 5 20 5 22 7.6 21 10.7c-1.5 4.7-9 9.3-9 9.3Z" />
    </Base>
  );
}

/* — contacto — */

export function IconPerson(props: P) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6" />
    </Base>
  );
}

export function IconHelmet(props: P) {
  return (
    <Base {...props}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M2.8 15h18.4v2.2H2.8z" />
      <path d="M10.5 7.2V4.8h3v2.4" />
    </Base>
  );
}

export function IconChart(props: P) {
  return (
    <Base {...props}>
      <path d="M3.5 4v16h17" />
      <path d="m6.5 14 4-4.5 3 2.5 5-6" />
      <path d="M18.5 6h-3.2M18.5 6v3.2" />
    </Base>
  );
}

export function IconPhone(props: P) {
  return (
    <Base {...props}>
      <path d="M7.6 3.5H5A1.5 1.5 0 0 0 3.5 5c0 8.6 6.9 15.5 15.5 15.5a1.5 1.5 0 0 0 1.5-1.5v-2.6l-4-1.6-1.8 1.8a12.6 12.6 0 0 1-5.8-5.8l1.8-1.8-1.1-4Z" />
    </Base>
  );
}

export function IconMail(props: P) {
  return (
    <Base {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.6" />
      <path d="m4 7 8 6 8-6" />
    </Base>
  );
}

export function IconPin(props: P) {
  return (
    <Base {...props}>
      <path d="M12 21.2S5.5 15.6 5.5 11a6.5 6.5 0 1 1 13 0c0 4.6-6.5 10.2-6.5 10.2Z" />
      <circle cx="12" cy="10.8" r="2.4" />
    </Base>
  );
}

export function IconArrowDown(props: P) {
  return (
    <Base {...props}>
      <path d="M12 4v16m0 0-5.5-5.5M12 20l5.5-5.5" />
    </Base>
  );
}

/* — WhatsApp (glifo de marca, relleno) — */

export function IconWhatsApp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
