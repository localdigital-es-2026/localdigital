"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Heart, Lightbulb, ArrowRight } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20nuestro%20negocio.%20%C2%BFHablamos%3F";

const values = [
  {
    icon: <Heart className="w-5 h-5 text-rose-400" />,
    label: "Nos implicamos",
    desc: "Tratamos cada proyecto como si fuera el nuestro.",
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
    label: "Tecnología de hoy",
    desc: "Formación reciente en DAM, sin métodos obsoletos.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-primary" />,
    label: "Trato directo",
    desc: "Sin intermediarios. Hablas directamente con nosotros.",
  },
];

const About = () => {
  return (
    <section id="sobre-nosotros" className="py-24 relative overflow-hidden">
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
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-transparent blur-2xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 glass">
                <Image
                  src="/equipo_local_digital.png"
                  alt="Beatriz y Mauri - Fundadores de Local Digital"
                  fill
                  className="object-cover"
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
                    Disponibles ahora
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
              Quiénes somos
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            >
              Hola, somos{" "}
              <span className="text-gradient">Beatriz y Mauri.</span>
              <br />
              Tus desarrolladores de confianza.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-foreground/60 leading-relaxed mb-8"
            >
              <p>
                Somos dos desarrolladores web recién titulados en DAM y las caras
                detrás de Local Digital. No somos una gran corporación con cientos
                de empleados, y precisamente esa es nuestra mayor ventaja:{" "}
                <span className="text-foreground/85 font-medium">
                  nos encargamos personalmente de cada línea de código de tu proyecto.
                </span>
              </p>
              <p>
                Creamos Local Digital porque vimos cómo negocios increíbles seguían
                perdiendo oportunidades simplemente por no tener una presencia digital
                que estuviera a su altura. Sabíamos que podíamos ayudar con un trato
                honesto, directo y sin tecnicismos innecesarios.
              </p>
              <p>
                No buscamos ser una agencia más; buscamos ser tus aliados tecnológicos.
                Nos apasiona ver cómo una web bien hecha y una automatización inteligente
                pueden cambiar el día a día de un negocio local.{" "}
                <span className="text-foreground/85 font-medium">
                  Si buscas a alguien que se involucre, te hable claro y te cobre
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
