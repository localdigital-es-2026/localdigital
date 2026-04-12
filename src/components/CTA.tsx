"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Phone, CheckCircle2 } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Me%20gustar%C3%ADa%20pedir%20informaci%C3%B3n%20acerca%20de%20vuestros%20servicios.%20Estoy%20pensando%20en%20crear%20una%20web%20o%20mejorar%20la%20que%20tengo%20y%20quer%C3%ADa%20informaci%C3%B3n.";

const trust = [
  "Sin permanencia",
  "Presupuesto gratis",
  "Respuesta en menos de 24h",
];

const CTA = () => {
  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-primary/[0.03]">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-16 rounded-[2.5rem] glass border-white/10 relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-[2.5rem]" />

          <div className="relative z-10">
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
              ¿Listo para conseguir{" "}
              <span className="text-gradient">más clientes?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-foreground/55 mb-10 max-w-xl mx-auto"
            >
              Agenda una llamada gratuita de 30 minutos. Te cuento exactamente qué
              puedo hacer por tu negocio, sin letra pequeña y sin compromiso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <a
                id="cta-final-wa"
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-white text-lg font-black flex items-center justify-center gap-3 glow-button hover:scale-[1.02] active:scale-95 transition-all"
              >
                Reservar llamada gratuita
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:+34603038050"
                className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mt-2"
              >
                <Phone className="w-4 h-4" />
                +34 603 03 80 50
              </a>
            </motion.div>

            {/* Trust bullets */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/40"
            >
              {trust.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Response indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">
                Respondo en menos de 24 horas
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
