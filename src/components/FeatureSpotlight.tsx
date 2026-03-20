"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, MousePointer2 } from "lucide-react";

const Showcase = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* Left Content */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
            >
              No imagines tu web. <br />
              <span className="text-primary">Mírala tú mismo.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-lg text-foreground/60 mb-10 leading-relaxed max-w-lg"
            >
              Diseñamos interfaces que no solo son estéticas, sino que están estructuradas
              estratégicamente para que el usuario pulse el botón de llamar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-12"
            >
              {[
                "SEO Local: Aparece en tu ciudad.",
                "Velocidad de carga < 1s.",
                "Optimizado para móviles."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  </div>
                  <span className="font-semibold text-foreground/80">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="https://wa.me/34606701267?text=Hola!%20Me%20gustar%C3%ADa%20pedir%20informaci%C3%B3n%20acerca%20de%20vuestros%20servicios.%20Estoy%20pensando%20en%20crear%20una%20web%20o%20mejorar%20la%20que%20tengo%20y%20quer%C3%ADa%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="inline-block px-10 py-5 rounded-2xl bg-[#0a1a3a] text-primary border border-primary/30 font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-primary/10"
            >
              QUIERO UNA WEB ASÍ
            </motion.a>
          </div>

          {/* Right Content - Mock Browser Window */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, rotateY: 10, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              style={{ perspective: "1000px" }}
              className="relative"
            >
              {/* Performance Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-6 -right-6 z-20 p-4 rounded-2xl bg-[#0a101f] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center"
              >
                <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Rendimiento</div>
                <div className="text-3xl font-black text-emerald-400">99</div>
                <div className="text-[10px] font-bold text-foreground/60">Score</div>
              </motion.div>

              {/* Laptop Mockup */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-t-2xl md:rounded-t-3xl border-[6px] border-[#1a1f2e] bg-white shadow-[0_0_100px_-20px_rgba(59,130,246,0.2)]"
              >
                {/* Screen Content */}
                <div className="aspect-[16/10] overflow-hidden relative flex flex-col items-center group cursor-ns-resize">
                  <img
                    src="/VersionEscritorioReformas.png"
                    alt="Diseño web profesional para empresas en Madrid - Versión Escritorio"
                    className="w-full h-auto object-cover object-top transition-transform duration-[4000ms] ease-linear group-hover:-translate-y-[5%]"
                  />
                  {/* Abstract bg element */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
                </div>
                {/* Laptop Base Lip */}
                <div className="h-3 md:h-5 bg-[#121622] w-[104%] -ml-[2%] relative z-10 rounded-b-xl md:rounded-b-2xl flex justify-center items-start shadow-xl border-t border-[#2a3042]">
                  <div className="w-16 md:w-24 h-1 md:h-1.5 bg-white/5 rounded-b-md" />
                </div>
              </motion.div>

              {/* Mobile Mockup (Overlapping) */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -right-4 -bottom-12 md:-right-12 md:-bottom-20 w-32 md:w-48 aspect-[9/19] rounded-[1.5rem] md:rounded-[2.2rem] border-[4px] md:border-[8px] border-[#1a1f2e] bg-white overflow-hidden shadow-2xl z-30 flex justify-center items-start group cursor-ns-resize"
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 md:h-4 bg-[#1a1f2e] rounded-b-xl z-20" />

                {/* Screen Content */}
                <img
                  src="/versionMovilReformas.png"
                  alt="Diseño web profesional para empresas en Madrid - Versión Móvil"
                  className="w-full h-auto max-w-none object-cover object-top transition-transform duration-[4000ms] ease-linear group-hover:-translate-y-[2%]"
                />
              </motion.div>

              {/* CTA Floating Tip */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 -right-10 glass p-4 rounded-2xl hidden md:flex items-center gap-3 backdrop-blur-3xl shadow-2xl"
              >
                <div className="p-2 rounded-lg bg-primary/20">
                  <MousePointer2 className="w-4 h-4 text-primary" />
                </div>
                <div className="text-xs font-bold">Botón diseñado <br />para convertir.</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Showcase;
