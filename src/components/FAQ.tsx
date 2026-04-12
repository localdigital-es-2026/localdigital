"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Cuánto cuesta una web?",
    a: "Las webs parten desde 497€ para un proyecto básico. El precio final depende de lo que necesitas: número de páginas, funcionalidades, sistema de citas, etc. Siempre te hago un presupuesto detallado antes de empezar, sin compromiso.",
  },
  {
    q: "¿Cuánto tiempo tardamos en tener la web?",
    a: "Una web completa está lista en 2 a 3 semanas desde que empezamos. Trabajo contigo en cada paso y tú apruebas el diseño antes de publicar. Si hay correcciones, las hacemos sin coste adicional.",
  },
  {
    q: "¿Veré resultados de verdad?",
    a: "Depende de lo que hagamos juntos. Una web bien hecha empieza a generar contactos en semanas. El SEO local tarda entre 30 y 90 días en posicionarse. Fijamos objetivos claros antes de empezar para que puedas medir el retorno.",
  },
  {
    q: "¿Qué pasa después de que me entreguen la web?",
    a: "La web es tuya, sin ataduras. Puedes gestionarla tú sin conocimientos técnicos. También ofrezco mantenimiento mensual opcional (actualizaciones, seguridad, cambios de contenido) por una tarifa mensual asequible.",
  },
  {
    q: "¿Funciona para cualquier tipo de negocio?",
    a: "Funciona para cualquier negocio que tenga clientes locales: peluquerías, clínicas, restaurantes, fontaneros, academias, tiendas de barrio y muchos más. La clave es tener algo que ofrecer en tu zona, lo demás lo hacemos nosotros.",
  },
  {
    q: "¿Tengo que saber de tecnología para trabajar contigo?",
    a: "No. Explico todo en un lenguaje que entiende cualquier persona. Tú me dices qué quieres conseguir y yo me encargo del resto. Si en algún momento no entiendes algo, me lo dices y te lo explico de otra forma.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white/[0.015] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Preguntas frecuentes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Lo que me suelen preguntar
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "glass border-primary/20 shadow-lg shadow-primary/5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-foreground/90 text-base leading-snug">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        isOpen ? "text-primary" : "text-foreground/40"
                      }`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px w-full bg-white/5 mb-4" />
                        <p className="text-foreground/60 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-foreground/35"
        >
          ¿Tienes otra pregunta?{" "}
          <a
              href="https://wa.me/34603038050?text=Hola!%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20mi%20negocio.%20%C2%BFHablamos%3F"
            className="text-primary font-semibold hover:underline"
          >
            Escríbeme directamente →
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default FAQ;
