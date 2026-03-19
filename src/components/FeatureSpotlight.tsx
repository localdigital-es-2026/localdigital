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
                className="relative rounded-t-2xl md:rounded-t-3xl border-[6px] border-[#1a1f2e] bg-[#03060d] shadow-[0_0_100px_-20px_rgba(59,130,246,0.2)]"
              >
                {/* Screen Content */}
                <div className="aspect-[16/10] overflow-hidden relative flex flex-col">
                  {/* Header Bar */}
                  <div className="px-6 py-4 flex gap-6 items-center border-b border-white/5 bg-white/[0.02]">
                    <div className="font-black text-lg">GARCIA<span className="text-primary">.</span></div>
                    <div className="hidden sm:flex gap-6 text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-auto">
                      <span>Proyectos</span>
                      <span>Servicios</span>
                      <span className="text-foreground">Contacto</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col relative overflow-hidden">
                    <div className="max-w-[70%] mb-10 relative z-10">
                      <div className="flex gap-1 text-amber-500 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        <span className="text-[10px] font-bold text-foreground/40 ml-2 uppercase">Líder en Valencia</span>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">Reformas que <br/><span className="text-primary italic">revalorizan tu hogar.</span></h4>
                      <div className="flex gap-3 mt-6">
                        <div className="px-4 py-2 rounded-lg bg-primary text-[10px] font-bold flex items-center justify-center">PRESUPUESTO GRATIS</div>
                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold flex items-center justify-center">VER TRABAJOS</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-[80%] z-10">
                      {["Cocinas", "Baños", "Viviendas"].map((cat) => (
                        <div key={cat} className="p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center backdrop-blur-sm">
                          <div className="w-6 h-6 bg-white/10 rounded-full mx-auto mb-2" />
                          <div className="text-[10px] font-bold text-foreground/60">{cat}</div>
                        </div>
                      ))}
                    </div>
                    {/* Abstract bg element */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                  </div>
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
                className="absolute -right-4 -bottom-12 md:-right-12 md:-bottom-20 w-32 md:w-48 aspect-[9/19] rounded-[1.5rem] md:rounded-[2.2rem] border-[4px] md:border-[8px] border-[#1a1f2e] bg-[#03060d] overflow-hidden shadow-2xl z-30"
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 md:h-4 bg-[#1a1f2e] rounded-b-xl z-20" />
                
                {/* Mobile Header */}
                <div className="pt-6 md:pt-8 px-3 md:px-4 pb-3 md:pb-4 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
                  <div className="font-black text-[10px] md:text-sm">GARCIA<span className="text-primary">.</span></div>
                  <div className="w-4 h-3 flex flex-col justify-between">
                    <div className="w-full h-[2px] bg-white/40 rounded-full" />
                    <div className="w-full h-[2px] bg-white/40 rounded-full" />
                    <div className="w-full h-[2px] bg-white/40 rounded-full" />
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="p-3 md:p-5 flex flex-col h-full relative">
                  <div className="flex gap-1 text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 fill-current" />)}
                  </div>
                  <h4 className="text-xs md:text-base font-bold mb-4 leading-tight">Reformas <br/><span className="text-primary italic">de alta gama.</span></h4>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto mb-10">
                    {["Cocinas", "Baños", "Terrazas", "Locales"].map((cat) => (
                      <div key={cat} className="aspect-square rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center p-2">
                        <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full mb-1 md:mb-2" />
                        <div className="text-[8px] md:text-[10px] font-bold text-foreground/60">{cat}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating WhatsApp Mobile */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 md:w-10 md:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 md:w-5 md:h-5 bg-white rounded-sm" style={{ WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path></svg>')", WebkitMaskSize: "cover" }} />
                  </div>
                </div>
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
