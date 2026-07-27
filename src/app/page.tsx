import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Nosotros from "@/components/Nosotros";
import Marcas from "@/components/Marcas";
import Clientes from "@/components/Clientes";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="divider" aria-hidden="true" />
        <Services />
        <div className="divider" aria-hidden="true" />
        <Nosotros />
        <div className="divider" aria-hidden="true" />
        <Marcas />
        <div className="divider" aria-hidden="true" />
        <Clientes />
        <div className="divider" aria-hidden="true" />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
