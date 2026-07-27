import { BRAND_GROUPS } from "@/lib/brands";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import LogoMark from "./LogoMark";

/**
 * Muro de marcas: logo plata arriba, nombre abajo. Al pasar el cursor la
 * tarjeta se enciende en placa clara y el logo recupera su color.
 * Retícula por grupo: 5 columnas (generadores) / 4 columnas (cocina, 4+4).
 */
export default function Marcas() {
  return (
    <section id="marcas" className="wrap py-24 sm:py-32">
      <SectionHead title="Marcas con las que trabajamos" />

      <div className="flex flex-col gap-12">
        {BRAND_GROUPS.map((group) => (
          <Reveal key={group.label}>
            <p className="rotulo mb-5 text-center">{group.label}</p>
            <ul
              className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${
                group.brands.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
              }`}
              role="list"
            >
              {group.brands.map((brand) => (
                <li key={brand.slug}>
                  <div className="group card card-hover flex h-32 flex-col items-center justify-center gap-3.5 px-4">
                    {brand.logo ? (
                      <>
                        <LogoMark
                          src={brand.logo}
                          name={brand.name}
                          shape={brand.shape}
                        />
                        <span className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-silver-3 transition-colors duration-300 group-hover:text-silver-2">
                          {brand.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-center text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-silver-2">
                        {brand.name}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
