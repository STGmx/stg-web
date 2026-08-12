import Link from "next/link";
import Image from "next/image";

/**
 * Sin `metadata` propio: `not-found.tsx` no lo admite y Next ya emite
 * `<meta name="robots" content="noindex">` en esta ruta. Declararlo a mano
 * duplicaba <title> en el 404.html exportado. La cabecera `X-Robots-Tag` de
 * netlify.toml refuerza lo mismo para quien llegue directo a /404.html.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <Image src="/logo.png" alt="" width={456} height={322} className="w-28" />
      <p className="dato text-silver-3">404</p>
      <h1 className="font-serif text-3xl font-semibold text-white">
        Página no encontrada
      </h1>
      <Link href="/" className="btn-primary mt-2">
        Volver al inicio
      </Link>
    </main>
  );
}
