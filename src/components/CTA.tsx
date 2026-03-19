"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Twitter, Linkedin, Phone } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary/5">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="p-12 md:p-16 rounded-[3rem] glass border-white/20 relative overflow-hidden"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforma tu negocio <span className="text-primary">hoy.</span>
          </h2>
          <p className="text-lg text-foreground/60 mb-10 max-w-xl mx-auto">
            ¿Listo para dar el salto? Agenda una consultoría gratuita y descubre cómo podemos llevar tu local al siguiente nivel.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href="https://wa.me/34606701267?text=Hola!%20Me%20gustar%C3%ADa%20pedir%20informaci%C3%B3n%20acerca%20de%20vuestros%20servicios.%20Estoy%20pensando%20en%20crear%20una%20web%20o%20mejorar%20la%20que%20tengo%20y%20quer%C3%ADa%20informaci%C3%B3n."
              target="_blank"
              className="px-12 py-6 rounded-[2rem] bg-primary text-white text-xl font-black flex items-center justify-center gap-3 glow-button hover:scale-105 active:scale-95 transition-transform"
            >
              Solicita una Propuesta gratuita
              <Send className="w-6 h-6" />
            </a>

            {/* Response Time Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/60 uppercase">
                Respuesta en menos de 24 horas
              </span>
            </div>


          </div>

          <p className="mt-8 text-xs text-foreground/40 font-medium">
            Únete a los más de 50 comercios que ya están escalando.
          </p>
        </motion.div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/real-logo.png" alt="Local Digital Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">Local<span className="text-primary">Digital</span></span>
            <span className="text-sm text-foreground/40 ml-4 font-medium hidden sm:inline">© 2026 Local Digital Agency.</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/60 hover:text-primary">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/60 hover:text-primary">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/60 hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default CTA;
