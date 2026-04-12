import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | Local Digital",
  description:
    "Política de privacidad de Local Digital. Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
  robots: "noindex",
};

export default function PoliticaPrivacidad() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Protección de datos
            </p>
            <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-foreground/50 text-sm">
              Última actualización: abril de 2026
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-10 text-foreground/70 leading-relaxed">

            {/* Intro */}
            <section>
              <p>
                En cumplimiento del{" "}
                <strong>
                  Reglamento (UE) 2016/679 del Parlamento Europeo y del
                  Consejo (RGPD)
                </strong>{" "}
                y de la{" "}
                <strong>
                  Ley Orgánica 3/2018, de 5 de diciembre, de Protección de
                  Datos Personales y garantía de los derechos digitales
                  (LOPDGDD)
                </strong>
                , informamos de nuestra política de tratamiento de datos
                personales.
              </p>
            </section>

            {/* 1. Responsable */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                1. Responsable del Tratamiento
              </h2>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-foreground/80">Identidad:</span>{" "}
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
                  <span className="font-semibold text-foreground/80">Dirección postal:</span>{" "}
                  <span className="text-amber-400 text-xs">
                    ⚠️ [COMPLETAR: tu dirección]
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Teléfono:</span>{" "}
                  +34 606 701 267
                </p>
                <p>
                  <span className="font-semibold text-foreground/80">Email de contacto:</span>{" "}
                  <span className="text-amber-400 text-xs">
                    ⚠️ [COMPLETAR: tu email de contacto]
                  </span>
                </p>
              </div>
            </section>

            {/* 2. Qué datos recogemos */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                2. Datos Personales que Recopilamos
              </h2>
              <p>
                Recogemos datos personales únicamente cuando tú nos los
                proporcionas de forma activa a través de los siguientes canales:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-foreground/65">
                <li>
                  <strong>Formularios de contacto</strong> del sitio web: nombre,
                  teléfono y/o correo electrónico.
                </li>
                <li>
                  <strong>WhatsApp Business</strong> (+34 606 701 267): los datos
                  que compartas en la conversación (nombre, consulta, datos de
                  tu negocio).
                </li>
                <li>
                  <strong>Llamadas telefónicas</strong>: nombre y número de
                  teléfono.
                </li>
                <li>
                  <strong>Correo electrónico</strong>: los datos que incluyas en
                  tu mensaje.
                </li>
              </ul>
              <p className="mt-4">
                <strong>No recogemos datos especialmente protegidos</strong>{" "}
                (salud, origen étnico, religión, etc.) ni datos de menores de 14 años.
                Si eres menor, necesitas el consentimiento de tus padres o tutores.
              </p>
            </section>

            {/* 3. Finalidad */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                3. Finalidad y Base Jurídica del Tratamiento
              </h2>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 pr-4 font-semibold text-foreground/80 w-1/3">
                        Finalidad
                      </th>
                      <th className="py-3 pr-4 font-semibold text-foreground/80 w-1/3">
                        Base jurídica
                      </th>
                      <th className="py-3 font-semibold text-foreground/80">
                        Plazo de conservación
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/60">
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Responder consultas y presupuestos</td>
                      <td className="py-3 pr-4">
                        Interés legítimo / consentimiento del usuario (art. 6.1.a y 6.1.f RGPD)
                      </td>
                      <td className="py-3">Hasta resolver la consulta + 1 año</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Gestión de la relación contractual (prestación de servicios)</td>
                      <td className="py-3 pr-4">
                        Ejecución de contrato (art. 6.1.b RGPD)
                      </td>
                      <td className="py-3">Duración del contrato + 5 años (obligaciones fiscales)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Cumplimiento de obligaciones legales (facturación)</td>
                      <td className="py-3 pr-4">
                        Obligación legal (art. 6.1.c RGPD)
                      </td>
                      <td className="py-3">5 años (Ley General Tributaria)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-foreground/45 italic">
                No utilizamos tus datos para enviar publicidad no solicitada (spam) ni los cedemos a terceros para fines comerciales.
              </p>
            </section>

            {/* 4. Destinatarios */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                4. Destinatarios y Comunicaciones a Terceros
              </h2>
              <p>
                Como norma general, <strong>no cedemos tus datos a terceros</strong>,
                salvo en los siguientes casos:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-foreground/65">
                <li>
                  <strong>Proveedores de servicios tecnológicos</strong> necesarios
                  para el funcionamiento del sitio web (hosting, alojamiento),
                  que actúan como encargados del tratamiento con garantías
                  suficientes de conformidad con el RGPD.
                </li>
                <li>
                  <strong>Administraciones públicas</strong> cuando exista
                  obligación legal (Agencia Tributaria, Seguridad Social, etc.).
                </li>
              </ul>
              <p className="mt-4">
                <strong>Transferencias internacionales:</strong> Algunos de
                nuestros proveedores técnicos (como servicios de hosting o
                herramientas de IA) pueden procesar datos fuera del Espacio
                Económico Europeo. En ese caso, utilizamos proveedores que ofrecen
                garantías adecuadas (cláusulas contractuales tipo aprobadas por la
                Comisión Europea, Privacy Shield o marcos equivalentes).
              </p>
            </section>

            {/* 5. Derechos */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                5. Tus Derechos
              </h2>
              <p>
                Como interesado, puedes ejercer los siguientes derechos en
                cualquier momento:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    right: "Acceso",
                    desc: "Saber qué datos tenemos sobre ti.",
                  },
                  {
                    right: "Rectificación",
                    desc: "Corregir datos inexactos o incompletos.",
                  },
                  {
                    right: "Supresión (derecho al olvido)",
                    desc: "Solicitar la eliminación de tus datos.",
                  },
                  {
                    right: "Portabilidad",
                    desc: "Recibir tus datos en formato estructurado.",
                  },
                  {
                    right: "Limitación",
                    desc: "Solicitar que limitemos el tratamiento.",
                  },
                  {
                    right: "Oposición",
                    desc: "Oponerte al tratamiento basado en interés legítimo.",
                  },
                ].map((item) => (
                  <div
                    key={item.right}
                    className="p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <p className="text-sm font-semibold text-foreground/80 mb-1">
                      {item.right}
                    </p>
                    <p className="text-xs text-foreground/50">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-5 rounded-2xl bg-primary/5 border border-primary/15">
                <p className="text-sm">
                  Para ejercer cualquiera de estos derechos, contacta con
                  nosotros en:{" "}
                  <a
                    href="tel:+34606701267"
                    className="text-primary font-semibold hover:underline"
                  >
                    +34 606 701 267
                  </a>{" "}
                  indicando «Protección de datos» en tu mensaje.
                </p>
                <p className="text-sm mt-2">
                  Si no obtienes respuesta satisfactoria, tienes derecho a
                  presentar una reclamación ante la{" "}
                  <a
                    href="https://www.aepd.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    Agencia Española de Protección de Datos (AEPD)
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* 6. Seguridad */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                6. Medidas de Seguridad
              </h2>
              <p>
                Adoptamos las medidas técnicas y organizativas necesarias para
                garantizar la seguridad de tus datos personales y evitar su
                pérdida, alteración o acceso no autorizado, teniendo en cuenta
                el estado de la tecnología, los riesgos derivados del
                tratamiento y la naturaleza de los datos.
              </p>
              <p className="mt-3">
                El sitio web utiliza protocolo{" "}
                <strong>HTTPS con certificado SSL/TLS</strong> para cifrar las
                comunicaciones entre tu navegador y nuestros servidores.
              </p>
            </section>

            {/* 7. Modificaciones */}
            <section>
              <h2 className="text-xl font-bold text-foreground/90 mb-4">
                7. Actualizaciones de esta Política
              </h2>
              <p>
                Podemos actualizar esta Política de Privacidad en cualquier
                momento. Te recomendamos revisarla periódicamente. Cualquier
                cambio significativo será comunicado de forma destacada en el
                Sitio Web.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
