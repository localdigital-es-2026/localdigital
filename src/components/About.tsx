"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Heart, Lightbulb, ArrowRight } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola%20Beatriz!%20He%20visto%20tu%20web%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20c%C3%B3mo%20conseguir%20m%C3%A1s%20clientes%20para%20mi%20negocio.";

const values = [
  {
    icon: <Heart className="w-5 h-5 text-rose-400" />,
    label: "Me implico de verdad",
    desc: "Cada proyecto lo trato como si fuera el mío.",
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
    label: "Tecnología actualizada",
    desc: "Formación reciente, sin vicios ni métodos obsoletos.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-primary" />,
    label: "Precios justos",
    desc: "Sin intermediarios ni equipos enormes que encarecer.",
  },
];

const About = () => {
  return (
    <section id="sobre-mi" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-transparent blur-2xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 glass">
                <Image
                  src="/beatriz-avatar.png"
                  alt="Beatriz - Fundadora de Local Digital"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl glass border border-primary/20 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  <span className="text-xs font-bold text-foreground/80">
                    Disponible ahora
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
            >
              Quién hay detrás
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              Hola, soy{" "}
              <span className="text-gradient">Beatriz.</span>
              <br />
              Y Local Digital soy yo.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-foreground/60 leading-relaxed mb-8"
            >
              <p>
                Soy desarrolladora web recién titulada en DAM y fundadora de
                Local Digital. No tengo 10 años de experiencia, pero sí algo
                que muchas agencias han perdido por el camino:{" "}
                <span className="text-foreground/85 font-medium">
                  las ganas de hacerlo bien desde el principio.
                </span>
              </p>
              <p>
                Creé Local Digital porque vi cómo negocios increíbles seguían
                perdiendo clientes simplemente por no tener presencia digital.
                Sabía que podía ayudar, y decidí hacerlo.
              </p>
              <p>
                Cada proyecto lo trato como si fuera el mío. Porque de cada
                resultado aprendo algo nuevo, y eso me motiva a hacerlo mejor
                cada vez.{" "}
                <span className="text-foreground/85 font-medium">
                  Si buscas a alguien que se involucre de verdad y te cobre
                  un precio justo, estás en el sitio correcto.
                </span>
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              {values.map((val, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl glass border border-white/5 flex flex-col gap-2"
                >
                  <div className="p-2 rounded-lg bg-white/5 w-fit">{val.icon}</div>
                  <p className="text-sm font-bold text-foreground/85">{val.label}</p>
                  <p className="text-xs text-foreground/45">{val.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                id="about-cta"
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold glow-button"
              >
                Hablamos
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
