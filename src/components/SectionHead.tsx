import Reveal from "./Reveal";

/**
 * Cabeza de sección: titular serif centrado + entrada opcional.
 */
export default function SectionHead({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-silver-2">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
