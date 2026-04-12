import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies | Local Digital",
  description:
    "Política de cookies de Local Digital. Información sobre las cookies utilizadas conforme a la LSSI y el RGPD.",
  robots: "noindex",
};

export default function PoliticaCookies() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Uso de cookies
            </p>
            <h1 className="text-4xl font-bold mb-4">Política de Cookies</h1>
            <p className="text-foreground/50 text-sm">
              Última actualización: abril de 2026
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-10 text-foreground/70 leading-relaxed">

            {/* Intro */}
            <section>
              <p>
                En cumplimiento del artículo 22.2 de la Ley 34/2002, de 11 de
                julio, de Servicios de la Sociedad de la Información y del
                Comercio Electrónico (LSSI-CE), y de lo establecido en el{" "}
                <strong>Reglamento (UE) 2016/679 (RGPD)</strong>, te informamos
                sobre las cookies que utilizamos en{" "}
                <strong>www.localdigital.es</strong>.
              </p>
            </section>

            {/* 1. Qué son */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                1. ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en
                tu dispositivo (ordenador, tablet, móvil) cuando visitas un
                sitio web. Permiten que el sitio recuerde tu visita, preferencias
                o acciones durante un período de tiempo determinado.
              </p>
              <p className="mt-3">
                Las cookies pueden ser propias (generadas por nuestro sitio) o de
                terceros (generadas por servicios externos). Según su duración,
                pueden ser de sesión (se eliminan al cerrar el navegador) o
                persistentes (permanecen en tu dispositivo por un tiempo fijo).
              </p>
            </section>

            {/* 2. Tipos */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                2. Cookies que Utilizamos
              </h2>

              {/* Strictly necessary */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                    No requieren consentimiento
                  </span>
                  <h3 className="font-bold text-foreground/80">
                    Cookies estrictamente necesarias
                  </h3>
                </div>
                <p className="text-sm text-foreground/55 mb-4">
                  Son imprescindibles para el funcionamiento básico del sitio
                  web. Sin ellas, no podrías navegar correctamente. No requieren
                  tu consentimiento previo según la normativa vigente.
                </p>
                <div className="overflow-x-auto rounded-xl border border-white/8">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="py-3 px-4 font-semibold text-foreground/70">Cookie</th>
                        <th className="py-3 px-4 font-semibold text-foreground/70">Origen</th>
                        <th className="py-3 px-4 font-semibold text-foreground/70">Finalidad</th>
                        <th className="py-3 px-4 font-semibold text-foreground/70">Duración</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/55">
                      <tr className="border-t border-white/5">
                        <td className="py-3 px-4 font-mono">__next_session</td>
                        <td className="py-3 px-4">Propia (Next.js)</td>
                        <td className="py-3 px-4">Gestión de sesión del sitio web</td>
                        <td className="py-3 px-4">Sesión</td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="py-3 px-4 font-mono">ld_cookie_consent</td>
                        <td className="py-3 px-4">Propia</td>
                        <td className="py-3 px-4">Guardar tus preferencias de cookies</td>
                        <td className="py-3 px-4">12 meses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics - currently not used */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-foreground/40 border border-white/10">
                    Actualmente no utilizadas
                  </span>
                  <h3 className="font-bold text-foreground/50">
                    Cookies analíticas y de marketing
                  </h3>
                </div>
                <p className="text-sm text-foreground/45">
                  En este momento, <strong className="text-foreground/60">no utilizamos cookies analíticas
                  ni de marketing</strong> (como Google Analytics, Meta Pixel u otros).
                  Si en el futuro se implementan, esta política se actualizará y se
                  solicitará tu consentimiento previo de forma expresa.
                </p>
              </div>
            </section>

            {/* 3. Consentimiento */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                3. Tu Consentimiento
              </h2>
              <p>
                Al acceder a nuestro sitio web por primera vez, te mostramos un
                aviso informativo sobre el uso de cookies. Puedes:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-foreground/65">
                <li>
                  <strong>Aceptar todas las cookies:</strong> Consientes el uso
                  de las cookies indicadas en esta política.
                </li>
                <li>
                  <strong>Rechazar cookies no esenciales:</strong> Solo se usarán
                  las estrictamente necesarias.
                </li>
                <li>
                  <strong>Retirar el consentimiento:</strong> Puedes cambiar tus
                  preferencias en cualquier momento eliminando las cookies de tu
                  navegador (ver apartado siguiente).
                </li>
              </ul>
              <p className="mt-4 text-sm text-foreground/50">
                Tu elección se almacena en la cookie <code className="text-foreground/70 bg-white/5 px-1 py-0.5 rounded">ld_cookie_consent</code> durante 12 meses.
                Transcurrido ese plazo, se te preguntará de nuevo.
              </p>
            </section>

            {/* 4. Cómo desactivarlas */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                4. Cómo Gestionar o Eliminar las Cookies
              </h2>
              <p>
                Puedes configurar tu navegador para que rechace cookies
                automáticamente o te avise cuando se intenten instalar. A
                continuación te indicamos cómo hacerlo en los navegadores más
                comunes:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    name: "Google Chrome",
                    url: "https://support.google.com/chrome/answer/95647",
                  },
                  {
                    name: "Mozilla Firefox",
                    url: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias",
                  },
                  {
                    name: "Safari (Mac / iOS)",
                    url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
                  },
                  {
                    name: "Microsoft Edge",
                    url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                  },
                ].map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:border-primary/30 hover:bg-white/8 transition-all text-sm font-medium text-foreground/70 hover:text-primary"
                  >
                    {browser.name} →
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/45 italic">
                Ten en cuenta que deshabilitar las cookies puede afectar al
                correcto funcionamiento del sitio web.
              </p>
            </section>

            {/* 5. Actualizaciones */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                5. Actualizaciones de esta Política
              </h2>
              <p>
                Podemos revisar esta Política de Cookies cuando sea necesario,
                especialmente si añadimos nuevas funcionalidades o herramientas
                al sitio web. Cualquier cambio se publicará en esta página con
                la fecha de actualización correspondiente.
              </p>
            </section>

            {/* 6. Contacto */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                6. Contacto
              </h2>
              <p>
                Si tienes dudas sobre nuestra política de cookies, puedes
                contactar con nosotros en el{" "}
                <a
                  href="tel:+34606701267"
                  className="text-primary font-semibold hover:underline"
                >
                  +34 606 701 267
                </a>{" "}
                o consultar la{" "}
                <a
                  href="https://www.aepd.es/es/areas-de-actuacion/internet-y-redes-sociales/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  guía sobre cookies de la AEPD
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
