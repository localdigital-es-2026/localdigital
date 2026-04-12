"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Hammer, Rocket } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola%20Beatriz!%20He%20visto%20tu%20web%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20c%C3%B3mo%20conseguir%20m%C3%A1s%20clientes%20para%20mi%20negocio.";

const steps = [
  {
    number: "01",
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Hablamos",
    description:
      "Empezamos con una llamada gratuita de 30 minutos. Me cuentas cómo funciona tu negocio, qué necesitas y qué te preocupa. Sin tecnicismos, sin presión.",
    duration: "Gratis · 30 minutos",
    color: "blue",
  },
  {
    number: "02",
    icon: <Hammer className="w-6 h-6" />,
    title: "Construimos",
    description:
      "Diseñamos y desarrollamos todo en 2–3 semanas. Cada paso lo apruebas tú. Sin sorpresas, sin letra pequeña. El resultado es exactamente lo que acordamos.",
    duration: "2–3 semanas",
    color: "purple",
  },
  {
    number: "03",
    icon: <Rocket className="w-6 h-6" />,
    title: "Tu negocio crece",
    description:
      "Tu web empieza a trabajar para ti. Medimos los resultados y te mantenemos informado. Si algo no funciona, lo ajustamos.",
    duration: "Resultados desde el mes 1",
    color: "emerald",
  },
];

const colorMap: Record<string, { num: string; icon: string; border: string; duration: string }> = {
  blue: {
    num: "text-blue-400/30",
    icon: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    border: "border-blue-400/10",
    duration: "text-blue-300 bg-blue-400/10",
  },
  purple: {
    num: "text-purple-400/30",
    icon: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    border: "border-purple-400/10",
    duration: "text-purple-300 bg-purple-400/10",
  },
  emerald: {
    num: "text-emerald-400/30",
    icon: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    border: "border-emerald-400/10",
    duration: "text-emerald-300 bg-emerald-400/10",
  },
};

const Process = () => {
  return (
    <section
      id="proceso"
      className="py-24 bg-white/[0.015] border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Cómo trabajamos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Tres pasos.{" "}
            <span className="text-gradient">Sin complicaciones.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-emerald-400/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const colors = colorMap[step.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.18 }}
                  className={`relative p-8 rounded-3xl glass border ${colors.border} flex flex-col`}
                >
                  {/* Big number */}
                  <span
                    className={`absolute top-6 right-8 text-7xl font-black leading-none select-none ${colors.num}`}
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${colors.icon}`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/55 leading-relaxed mb-6 flex-1">
                    {step.description}
                  </p>

                  {/* Duration badge */}
                  <span
                    className={`self-start text-xs font-bold px-3 py-1.5 rounded-full ${colors.duration}`}
                  >
                    {step.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            id="process-cta"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold glow-button"
          >
            Empezar con el paso 1
            <MessageCircle className="w-5 h-5" />
          </a>
          <p className="mt-3 text-sm text-foreground/35">
            La llamada es gratuita y sin compromiso
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
