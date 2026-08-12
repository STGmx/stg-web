import Image from "next/image";
import type { LogoShape } from "@/lib/brands";

const WRAP: Record<LogoShape, string> = {
  emblem: "h-14",
  word: "h-9",
  wide: "h-9 w-[10.5rem] max-w-full",
};

const IMG: Record<LogoShape, string> = {
  emblem: "max-h-14 w-auto max-w-[7.5rem]",
  word: "max-h-9 w-auto max-w-[9.5rem]",
  wide: "w-full h-auto",
};

/**
 * Marca plata con crossfade a su versión de color al hacer hover
 * (requiere un ancestro con clase `group`).
 */
export default function LogoMark({
  src,
  name,
  shape,
  className = "",
}: {
  src: string;
  name: string;
  shape: LogoShape;
  className?: string;
}) {
  const colorSrc = src.replace(/\.png$/, "-color.png");
  return (
    <span
      className={`relative flex items-center justify-center ${WRAP[shape]} ${className}`}
    >
      <Image
        src={src}
        alt={name ? `Logotipo de ${name}` : ""}
        width={240}
        height={60}
        className={`${IMG[shape]} opacity-90 transition-opacity duration-300 group-hover:opacity-0`}
      />
      <Image
        src={colorSrc}
        alt=""
        width={240}
        height={60}
        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  );
}
