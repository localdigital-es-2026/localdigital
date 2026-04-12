"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, TrendingUp, Clock, Search } from "lucide-react";

const WA_URL =
  "https://wa.me/34606701267?text=Hola%20Beatriz!%20He%20visto%20tu%20web%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20c%C3%B3mo%20conseguir%20m%C3%A1s%20clientes%20para%20mi%20negocio.";

const differentiators = [
  {
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    title: "Webs diseñadas para convertir",
    desc: "No hacemos webs bonitas. Hacemos webs que convierten visitas en llamadas.",
  },
  {
    icon: <Search className="w-5 h-5 text-primary" />,
    title: "Apareces cuando te buscan",
    desc: "SEO local para que tu negocio salga primero cuando alguien de tu zona te necesite.",
  },
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    title: "IA que trabaja mientras duermes",
    desc: "Un asistente inteligente que responde, informa y agenda citas las 24 horas.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    title: "Enfoque en resultados reales",
    desc: "Medimos todo. Sabes exactamente cuánto tráfico recibes y cuántos contactos genera.",
  },
];

const Solution = () => {
  return (
    <section id="como-lo-hacemos" className="py-24 relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            La solución
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Lo que necesitas son{" "}
            <span className="text-gradient">resultados,</span>
            <br />
            no tecnología.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/55 max-w-2xl mx-auto"
          >
            Combinamos diseño web estratégico, SEO local y automatización con IA
            para que tu negocio consiga más clientes.{" "}
            <span className="text-foreground/80 font-medium">
              Sin que tengas que entender de tecnología.
            </span>
          </motion.p>
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-2xl glass hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-foreground/90 mb-1">{item.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              id="solution-cta"
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center gap-2 glow-button"
            >
              Hablamos sin compromiso
              <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <span className="text-sm text-foreground/40">
              O sigue leyendo para ver los servicios →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
