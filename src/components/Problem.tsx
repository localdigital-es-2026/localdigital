"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const problems = [
  {
    text: "Tu web no aparece cuando alguien busca lo que ofreces en Google.",
    detail: "El 75% de los clientes busca servicios locales online antes de llamar.",
  },
  {
    text: "Tienes una web, pero nadie llama ni escribe.",
    detail: "Una web bonita que no convierte es dinero tirado. El diseño debe guiar hacia la acción.",
  },
  {
    text: "Tu competencia aparece primero y se lleva tus clientes.",
    detail: "El primer resultado de Google se lleva el 30% de los clics. El tercero, menos del 10%.",
  },
  {
    text: "Pierdes ventas fuera de tu horario porque nadie responde.",
    detail: "El 40% de las consultas llegan fuera del horario comercial. Sin respuesta, sin cliente.",
  },
];

const stats = [
  { value: "75%", label: "de personas busca servicios locales en Google antes de llamar" },
  { value: "< 3s", label: "para decidir si un usuario se queda o abandona tu web" },
  { value: "40%", label: "de consultas llegan fuera del horario comercial" },
];

const Problem = () => {
  return (
    <section id="problema" className="py-24 bg-white/[0.02] relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-3"
          >
            ¿Te suena familiar?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            ¿Estás perdiendo clientes{" "}
            <span className="text-rose-400">sin darte cuenta?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-foreground/50 max-w-xl mx-auto"
          >
            La mayoría de los negocios locales tienen el mismo problema: excelente
            servicio, pero poca visibilidad. Y eso tiene solución.
          </motion.p>
        </div>

        {/* Pain points */}
        <div className="max-w-3xl mx-auto space-y-4 mb-20">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-rose-500/[0.04] border border-rose-500/15 hover:border-rose-500/30 hover:bg-rose-500/[0.07] transition-all duration-300"
            >
              <div className="flex-shrink-0 mt-0.5">
                <XCircle className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <p className="text-base md:text-lg font-semibold text-foreground/85 mb-1">
                  {problem.text}
                </p>
                <p className="text-sm text-foreground/45">{problem.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-rose-400 mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-foreground/50 max-w-[200px] mx-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
