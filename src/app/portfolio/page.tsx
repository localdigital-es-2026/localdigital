"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BarChart3, Smartphone, Zap, TrendingUp, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import CTA from "@/components/CTA";

const projects = [
  {
    title: "Globysweet",
    category: "Tienda de Chuches & Dulces",
    description: "Desarrollo de un escaparate digital vibrante e interactivo. Digitalizamos su catálogo para eventos y habilitamos pedidos directos por WhatsApp, convirtiendo el antojo local en ventas instantáneas.",
    results: [
      { icon: <TrendingUp className="w-5 h-5" />, text: "+200% aumento en pedidos para celebraciones" },
      { icon: <Zap className="w-5 h-5" />, text: "Catálogo visual con carga ultrarrápida" },
    ],
    color: "blue"
  },
  {
    title: "DentalHub",
    category: "Clínica Dental",
    description: "Sistema integral de reservas y escaparate de servicios dentales. Se eliminaron las fricciones de contacto telefónico y los 'no-shows' de pacientes.",
    results: [
      { icon: <Users className="w-5 h-5" />, text: "-98% de ausencias a citas (No-shows)" },
      { icon: <Smartphone className="w-5 h-5" />, text: "100% reservas automatizadas por WhatsApp" },
    ],
    color: "emerald"
  },
  {
    title: "La Piazza Ristorante",
    category: "Restauración & Eventos",
    description: "Diseño inmersivo para un restaurante premium. Carta digital dinámica, galería gastronómica de alto impacto y sistema de reservas integradas orientadas al fin de semana.",
    results: [
      { icon: <BarChart3 className="w-5 h-5" />, text: "SEO Local Top 1 en su ciudad" },
      { icon: <Zap className="w-5 h-5" />, text: "+80% de tráfico al menú virtual" },
    ],
    color: "purple"
  }
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen relative pt-32 pb-10">
      <Navigation />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </motion.div>

        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Casos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-emerald-400">Éxito.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/60 max-w-2xl leading-relaxed"
          >
            No hacemos páginas web bonitas sin más. Creamos infraestructuras digitales que multiplican los resultados reales de tu negocio.
          </motion.p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-foreground/60">
                  {project.category}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">{project.title}</h2>
                <p className="text-lg text-foreground/60 leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-6 space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-white">El Impacto</h3>
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl glass border-white/5 bg-white/[0.02]">
                      <div className={`p-2 rounded-xl bg-${project.color}-500/20 text-${project.color}-400`}>
                        {result.icon}
                      </div>
                      <span className="font-medium text-foreground/90">{result.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimalist Abstract Mockup element */}
              <div className="flex-1 w-full aspect-square md:aspect-[4/3] relative rounded-3xl overflow-hidden glass border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a101f] to-[#03060d] -z-10" />
                <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-${project.color}-500/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000`} />
                <div className={`absolute -top-20 -left-20 w-64 h-64 bg-${project.color}-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000 delay-100`} />
                
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-6 p-8">
                  <div className="w-full h-8 flex gap-2">
                    <div className="w-16 h-full bg-white/5 rounded-md" />
                    <div className="flex-1 h-full bg-white/5 rounded-md" />
                  </div>
                  <div className="w-full flex-1 flex gap-6">
                    <div className="flex-1 h-full bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl font-bold" />
                    </div>
                    <div className="w-1/3 h-full flex flex-col gap-6">
                      <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/5" />
                      <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/5" />
                    </div>
                  </div>
                  {/* Floating badge */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 right-12 px-6 py-3 rounded-2xl glass shadow-2xl flex items-center gap-2 border-white/20"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold">Proyecto Activo</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-32">
        <CTA />
      </div>
    </main>
  );
}
