import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { NavMinimal } from "@/components/layout/NavMinimal";

export const metadata = {
  title: "Página no encontrada · Local Digital",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <NavMinimal />
      <main id="contenido" className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1>Esta página no existe</h1>
        <p>Puede que el enlace sea antiguo o que la dirección tenga una errata.</p>
        <Link href="/" className="font-semibold underline">
          Volver a la página de inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}
