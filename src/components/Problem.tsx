"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, Users, AlertCircle } from "lucide-react";

const Problem = () => {
  const stats = [
    {
      icon: <TrendingDown className="w-8 h-8 text-rose-500" />,
      value: "90%",
      label: "de los comercios locales pierden ventas por falta de presencia digital.",
    },
    {
      icon: <Users className="w-8 h-8 text-rose-500" />,
      value: "75%",
      label: "de los clientes buscan servicios locales primero en Google.",
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-rose-500" />,
      value: "3s",
      label: "es lo que tarda un usuario en abandonar una web lenta.",
    },
  ];

  return (
    <section id="problem" className="py-24 bg-white/5 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
            >
              El mundo cambió, <br />
              <span className="text-rose-500">¿tu negocio también?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-lg text-foreground/60 mb-8"
            >
              No se trata solo de tener una web. Se trata de tener una herramienta que venda mientras duermes. 
              La mayoría de los negocios locales tienen webs obsoletas que alejan a los clientes en lugar de atraerlos.
            </motion.p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl glass flex items-start gap-6"
              >
                <div className="p-3 rounded-xl bg-rose-500/10">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-foreground/50">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* New "Boca a boca" Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-32 pt-20 border-t border-white/5"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 max-w-2xl mx-auto">
            Muchos negocios dependen solo del <span className="text-primary italic">boca a boca...</span>
          </h3>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "No apareces en búsquedas locales cuando alguien te necesita.",
              "Tu web actual es lenta o simplemente no genera llamadas.",
              "Estás perdiendo clientes reales frente a tu competencia."
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-rose-500 font-bold text-lg">✕</span>
                </div>
                <p className="text-lg md:text-xl font-medium text-foreground/80">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
