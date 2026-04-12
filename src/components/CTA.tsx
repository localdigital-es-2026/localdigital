"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, CheckCircle2, User, Building2, Mail, MessageSquare, Loader2 } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20mi%20negocio.%20%C2%BFHablamos%3F";

const trust = [
  "Sin permanencia",
  "Presupuesto gratis",
  "Respuesta en menos de 24h",
];

const CTA = () => {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    nombre: "",
    negocio: "",
    contacto: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en el envío");

      setFormState("success");

      // Resetear después de 5 segundos
      setTimeout(() => {
        setFormState("idle");
        setFormData({ nombre: "", negocio: "", contacto: "", mensaje: "" });
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al enviar el mensaje. Por favor, inténtalo por WhatsApp.");
      setFormState("idle");
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-primary/[0.03]">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-16 rounded-[2.5rem] glass border-white/10 relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-[2.5rem]" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
              >
                ¿Hablamos?
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold mb-5 leading-tight"
              >
                ¿Listo para {" "}
                <span className="text-gradient">mejorar tu negocio?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-foreground/55 mb-10 max-w-xl mx-auto"
              >
                Te cuento exactamente qué puedo hacer por tu negocio,
                sin letra pequeña y sin compromiso alguno.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Opciones directas */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <a
                    id="cta-final-wa"
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full px-8 py-5 rounded-2xl bg-primary text-white text-lg font-black flex items-center justify-center gap-3 glow-button hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Hablar por WhatsApp
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="tel:+34603038050"
                    className="flex items-center justify-center gap-2 p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-foreground/70 hover:text-primary transition-all group"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-bold">+34 603 03 80 50</span>
                  </a>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground/40 uppercase tracking-widest text-center md:text-left">
                    ¿Por qué trabajar conmigo?
                  </p>
                  <div className="space-y-3">
                    {trust.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-foreground/60 justify-center md:justify-start">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur opacity-25" />
                <div className="relative p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    {formState === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">¡Recibido correctamente!</h3>
                        <p className="text-foreground/50 text-sm">
                          Me pondré en contacto contigo en las próximas horas.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="mb-6 text-center md:text-left">
                          <h3 className="text-lg font-bold mb-1">Déjame tus datos</h3>
                          <p className="text-xs text-foreground/40 italic">
                            ¿Prefieres que te contacte yo? Te escribo en menos de 24h.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                            <input
                              required
                              type="text"
                              placeholder="Tu nombre"
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                              value={formData.nombre}
                              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                          </div>

                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                            <input
                              required
                              type="text"
                              placeholder="Nombre de tu negocio"
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                              value={formData.negocio}
                              onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                            />
                          </div>

                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                            <input
                              required
                              type="text"
                              placeholder="Tu email o teléfono"
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                              value={formData.contacto}
                              onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                            />
                          </div>

                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-foreground/30" />
                            <textarea
                              rows={3}
                              placeholder="¿En qué puedo ayudarte? (opcional)"
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                              value={formData.mensaje}
                              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                            />
                          </div>
                        </div>

                        <button
                          disabled={formState === "loading"}
                          type="submit"
                          className="w-full py-4 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary font-bold text-sm flex items-center justify-center gap-2 border border-primary/20 transition-all disabled:opacity-50"
                        >
                          {formState === "loading" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            "Quiero mejorar mi negocio"
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Response indicator */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">
                  Respondo en menos de 24 horas
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

