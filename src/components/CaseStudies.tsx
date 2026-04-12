"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20nuestro%20negocio.%20%C2%BFHablamos%3F";

const cases = [
  {
    category: "Clínica dental · Madrid",
    emoji: "🦷",
    problem:
      "Tenían web, pero sin reservas online. Los pacientes llamaban en horario de tarde y nadie respondía. Los fines de semana perdían consultas.",
    solution:
      "Web nueva con sistema de citas online + chatbot en WhatsApp entrenado para responder preguntas frecuentes y confirmar citas automáticamente.",
    metrics: [
      { value: "24/7", label: "disponibilidad para responder pacientes" },
      { value: "Activo", label: "sistema de citas integrado" },
      { value: "Mejorada", label: "atención fuera del horario de la clínica" },
    ],
    color: "blue",
  },
  {
    category: "Academia de idiomas · Barcelona",
    emoji: "📚",
    problem:
      "Solo conseguían alumnos por recomendaciones. No aparecían en Google. Su competencia del barrio de al lado se llevaba todos los clientes nuevos.",
    solution:
      "SEO local específico para su barrio y tipo de servicio + landing page optimizada para conversión con prueba social y precios claros.",
    metrics: [
      { value: "Mayor", label: "presencia destacada en su barrio" },
      { value: "Eficaz", label: "flujo para capturar peticiones de alumnos" },
      { value: "Mejor", label: "imagen frente a academias competidoras" },
    ],
    color: "emerald",
  },
  {
    category: "Fontanero · Valencia",
    emoji: "🔧",
    problem:
      "Sin web, sin presencia digital. Todo dependía del boca a boca. En temporada baja, la agenda quedaba casi vacía.",
    solution:
      "Web de emergencias con botón de llamada visible + Google Business optimizado para búsquedas de urgencia en su zona.",
    metrics: [
      { value: "Óptima", label: "visibilidad en búsquedas de urgencia" },
      { value: "Directo", label: "botón de llamada accesible a un clic" },
      { value: "Estable", label: "recepción de avisos todo el año" },
    ],
    color: "orange",
  },
  {
    category: "Restaurante · Sevilla",
    emoji: "🍽️",
    problem:
      "Dependían totalmente de plataformas de terceros que se llevaban gran parte del margen. Su web antigua no permitía reservar mesa fácilmente desde el móvil.",
    solution:
      "Diseño web inmersivo y de alta velocidad con motor de reservas propio sin comisiones. Optimización de la ficha de Google para 'restaurantes cerca de mí'.",
    metrics: [
      { value: "Propio", label: "motor de reservas integrado en la web" },
      { value: "0€", label: "en comisiones por las reservas directas" },
      { value: "Alta", label: "visibilidad en búsquedas gastronómicas" },
    ],
    color: "purple",
  },
];

const colorMap: Record<string, { accent: string; metric: string; border: string }> = {
  blue: { accent: "text-blue-400", metric: "text-blue-300 bg-blue-400/10", border: "border-blue-400/20" },
  emerald: { accent: "text-emerald-400", metric: "text-emerald-300 bg-emerald-400/10", border: "border-emerald-400/20" },
  orange: { accent: "text-orange-400", metric: "text-orange-300 bg-orange-400/10", border: "border-orange-400/20" },
  purple: { accent: "text-purple-400", metric: "text-purple-300 bg-purple-400/10", border: "border-purple-400/20" },
};

const CaseStudies = () => {
  const [active, setActive] = useState(0);
  const activeCase = cases[active];
  const colors = colorMap[activeCase.color];

  return (
    <section id="casos-de-exito" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Casos reales · Resultados concretos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Lo que consiguen{" "}
            <span className="text-gradient">nuestros clientes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm text-foreground/35 italic"
          >
            *Ejemplos representativos basados en proyectos del sector
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {cases.map((c, i) => (
            <button
              key={i}
              id={`case-tab-${i}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                active === i
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "glass text-foreground/60 hover:text-foreground/90 hover:border-white/20"
              }`}
            >
              <span>{c.emoji}</span>
              <span className="hidden sm:inline">{c.category}</span>
              <span className="sm:hidden">{c.category.split("·")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Active case */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: story */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{activeCase.emoji}</span>
                <span className={`text-sm font-bold ${colors.accent}`}>
                  {activeCase.category}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">
                    El problema
                  </p>
                  <p className="text-foreground/75 leading-relaxed">{activeCase.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    Lo que hicimos
                  </p>
                  <p className="text-foreground/75 leading-relaxed">{activeCase.solution}</p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:gap-3 transition-all"
                >
                  Quiero algo así para nuestro negocio
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: metrics */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className={`w-5 h-5 ${colors.accent}`} />
                <span className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                  Resultados obtenidos
                </span>
              </div>
              <div className="space-y-5">
                {activeCase.metrics.map((metric, j) => (
                  <div
                    key={j}
                    className={`p-5 rounded-2xl border flex items-center gap-4 ${colors.metric} ${colors.border}`}
                  >
                    <div className={`text-3xl font-extrabold ${colors.accent}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-foreground/70">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
