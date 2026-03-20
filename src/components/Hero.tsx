"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Star, Store, Stethoscope, ShoppingBag, Hammer, Scissors } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Orbs Animated */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.8, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 50, 0], 
          y: [0, -50, 70, 0],
          scale: [1, 0.9, 1.1, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" 
      />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-xs font-medium text-primary mb-8"
        >
          <Star className="w-3 h-3 fill-current" />
          <span>Liderando la era digital para comercios locales</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Desarrollo Web en Madrid, <br />
          <span className="text-gradient">multiplica tu alcance.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed"
        >
          Transformamos negocios tradicionales en experiencias digitales de alto rendimiento. 
          Resultados medibles, diseño premium y tecnología de vanguardia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="https://wa.me/34606701267?text=Hola!%20Me%20gustar%C3%ADa%20pedir%20informaci%C3%B3n%20acerca%20de%20vuestros%20servicios.%20Estoy%20pensando%20en%20crear%20una%20web%20o%20mejorar%20la%20que%20tengo%20y%20quer%C3%ADa%20informaci%C3%B3n."
            target="_blank"
            className="group px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center gap-2 glow-button"
          >
            Contrata ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link 
            href="/portfolio"
            className="px-8 py-4 rounded-full glass font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            Ver Portafolio
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-12 md:gap-20"
        >
          <svg width="0" height="0" className="absolute" style={{ visibility: "hidden" }}>
            <linearGradient id="icon-hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#60a5fa" offset="0%" />
              <stop stopColor="#3b82f6" offset="50%" />
              <stop stopColor="#34d399" offset="100%" />
            </linearGradient>
          </svg>

          {[
            { Icon: Store, label: "Comercios" },
            { Icon: Stethoscope, label: "Clínicas" },
            { Icon: ShoppingBag, label: "Tiendas" },
            { Icon: Hammer, label: "Reformas" },
            { Icon: Scissors, label: "Peluquerías" },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              title={item.label}
              className="flex items-center justify-center transition-transform hover:-translate-y-2 cursor-pointer group"
            >
              <item.Icon 
                className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform group-hover:scale-110" 
                style={{ stroke: "url(#icon-hero-gradient)" }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
