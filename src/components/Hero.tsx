"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20mi%20negocio.%20%C2%BFHablamos%3F";

const WA_BOOKING_URL =
  "https://wa.me/34603038050?text=Hola!%20Me%20gustar%C3%ADa%20reservar%20una%20llamada%20con%20vosotros%20para%20informarme%20sobre%20vuestros%20servicios.%20%C2%BFCu%C3%A1ndo%20os%20viene%20bien%3F";

const bullets = [
  "Sin permanencia · por proyecto o mensual",
  "Presupuesto gratis en 24h · sin rodeos",
  "Medimos visitas, clics y formularios recibidos",
];

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, 50, -30, 0], scale: [1, 1.2, 0.85, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -70, 40, 0], y: [0, -40, 60, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-xs font-semibold text-primary mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Especialistas en negocios locales · Madrid y toda España
        </motion.div>

        {/* Titular — Corto, claro y potente */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          Tu negocio local, <br className="hidden sm:block" />
          <span className="text-gradient">captando contactos en piloto automático.</span>
        </motion.h1>

        {/* Subtítulo — Realista, fácil de leer, incluye los 4 pilares */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-foreground/60 mb-8 leading-relaxed"
        >
          Web, posicionamiento local e <span className="text-white">IA que gestiona tus contactos incluso cuando no estás</span>. Todo medido con datos reales de visitas, clics y formularios.
        </motion.p>

        {/* Trust bullets — Específicos y creíbles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 mb-10"
        >
          {bullets.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-sm text-foreground/50"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Solo 2 CTAs principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <a
            id="hero-cta-primary"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 glow-button text-base"
          >
            Quiero más consultas
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <a
            id="hero-cta-secondary"
            href={WA_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-base"
          >
            <Phone className="w-5 h-5" />
            Reservar una llamada
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
