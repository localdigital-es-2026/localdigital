import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aviso Legal | Local Digital",
  description: "Aviso legal de Local Digital. Información sobre el titular del sitio web conforme a la LSSI.",
  robots: "noindex",
};

export default function AvisoLegal() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Información legal
            </p>
            <h1 className="text-4xl font-bold mb-4">Aviso Legal</h1>
            <p className="text-foreground/50 text-sm">
              Última actualización: abril de 2026
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-10 text-foreground/70 leading-relaxed">
            
            {/* 1. Identificación */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                1. Identificación del Titular
              </h2>
              <p>
                En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de
                julio, de Servicios de la Sociedad de la Información y del
                Comercio Electrónico (LSSI-CE), se informa de los siguientes
                datos identificativos del titular del sitio web:
              </p>
              <div className="mt-4 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-foreground/80">Titular:</span>{" "}
                  Beatriz{" "}
                  <span className="text-amber-400 text-xs">
                    ⚠️ [COMPLETAR: apellidos]
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">NIF:</span>{" "}
                  <span className="text-amber-400 text-xs">
                    ⚠️ [COMPLETAR: tu DNI/NIF]
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Nombre comercial:</span>{" "}
                  Local Digital
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Domicilio:</span>{" "}
                  <span className="text-amber-400 text-xs">
                    ⚠️ [COMPLETAR: tu dirección postal completa, ciudad, C.P.]
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Teléfono de contacto:</span>{" "}
                  +34 606 701 267
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Correo electrónico:</span>{" "}
                  <span className="text-amber-400 text-xs">
                    ⚠️ [COMPLETAR: tu email de contacto]
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Sitio web:</span>{" "}
                  www.localdigital.es
                </p>
              </div>
              <p className="mt-4 text-xs text-foreground/40 italic">
                Actividad ejercida como autónomo/a. Si en el futuro se constituye
                sociedad, se actualizarán los datos de registro mercantil.
              </p>
            </section>

            {/* 2. Objeto */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                2. Objeto y Ámbito de Aplicación
              </h2>
              <p>
                El presente Aviso Legal regula el acceso y uso del sitio web{" "}
                <strong>www.localdigital.es</strong> (en adelante, "el Sitio
                Web"), cuya titularidad corresponde a la persona identificada en
                el apartado anterior.
              </p>
              <p className="mt-3">
                El acceso y/o uso de este Sitio Web atribuye la condición de
                usuario e implica la aceptación plena y sin reservas de todas y
                cada una de las disposiciones del presente Aviso Legal.
              </p>
            </section>

            {/* 3. Propiedad intelectual */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                3. Propiedad Intelectual e Industrial
              </h2>
              <p>
                Todos los contenidos del Sitio Web (textos, imágenes, gráficos,
                logotipos, iconos, código fuente, diseño y demás elementos)
                son propiedad de la titular o de terceros que han autorizado su
                uso, y están protegidos por la legislación española e
                internacional sobre propiedad intelectual e industrial.
              </p>
              <p className="mt-3">
                Queda expresamente prohibida la reproducción, distribución,
                comunicación pública o transformación de dichos contenidos sin
                autorización expresa y por escrito de la titular, salvo que se
                trate de uso personal y no comercial.
              </p>
            </section>

            {/* 4. Responsabilidad */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                4. Exclusión de Responsabilidad
              </h2>
              <p>
                La titular del Sitio Web no se hace responsable de los daños y
                perjuicios que pudieran derivarse de:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-foreground/65">
                <li>
                  La interrupción, error o falta de disponibilidad del Sitio Web.
                </li>
                <li>
                  El uso que los usuarios hagan de los contenidos publicados.
                </li>
                <li>
                  Virus o elementos dañinos introducidos por terceros.
                </li>
                <li>
                  Los contenidos de sitios web externos a los que se enlace desde
                  este Sitio Web.
                </li>
              </ul>
            </section>

            {/* 5. Links */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                5. Enlaces a Terceros
              </h2>
              <p>
                El Sitio Web puede contener enlaces a páginas de terceros. La
                titular no controla ni es responsable del contenido, políticas de
                privacidad o prácticas de dichos sitios externos. Se recomienda
                revisar las políticas de privacidad de cualquier sitio web
                externo visitado.
              </p>
            </section>

            {/* 6. Ley aplicable */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                6. Legislación Aplicable y Jurisdicción
              </h2>
              <p>
                El presente Aviso Legal se rige por la legislación española
                vigente. Para la resolución de cualquier controversia derivada
                del acceso o uso del Sitio Web, las partes se someten, con
                renuncia expresa a cualquier otro fuero, a los Juzgados y
                Tribunales correspondientes al domicilio de la titular, salvo
                que la normativa aplicable establezca otra cosa.
              </p>
            </section>

            {/* 7. Modificaciones */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                7. Modificaciones
              </h2>
              <p>
                La titular se reserva el derecho de modificar el presente Aviso
                Legal en cualquier momento. Los cambios entrarán en vigor desde
                su publicación en el Sitio Web. Se recomienda revisar este aviso
                periódicamente.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
