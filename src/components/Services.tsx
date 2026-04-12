"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Bot,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
} from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20nuestro%20negocio.%20%C2%BFHablamos%3F";

const services = [
  {
    icon: <Globe className="w-8 h-8" />,
    color: "blue",
    badge: "Más popular",
    title: "Diseño Web Estratégico",
    tagline: "Un escaparate digital estructurado para facilitar el contacto",
    result: "Diseñado para mejorar la probabilidad de recibir consultas",
    includes: [
      "Diseño a medida y enfocado a tu sector",
      "Velocidad de carga optimizada al máximo",
      "Adaptación perfecta para móviles y tablets",
      "Formularios y botones de llamada muy visibles",
      "Estructura técnica preparada para SEO",
      "Desarrollo ágil en 2–3 semanas",
    ],
    outcome:
      "Una web estructurada estratégicamente. La repensamos desde cero para transmitir confianza y facilitar que los usuarios decidan escribirte o ponerse en contacto.",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    color: "emerald",
    badge: null,
    title: "Optimización en Google Maps",
    tagline: "Optimizamos técnica y estratégicamente tu ficha de negocio",
    result: "Mejora tu presencia y visibilidad en búsquedas locales",
    includes: [
      "Ajustes técnicos en tu Google Business Profile",
      "Estudio de las palabras clave de tu negocio",
      "Apoyo en la gestión de tu reputación online",
      "Contenido y actualizaciones para tu ciudad",
      "Reporte mensual sobre la evolución de la visibilidad",
    ],
    outcome:
      "Trabajamos en los factores que los buscadores valoran, con el objetivo de potenciar la presencia de tu negocio y hacerte más fácil de encontrar en tu localidad.",
  },
  {
    icon: <Bot className="w-8 h-8" />,
    color: "purple",
    badge: "IA incluida",
    title: "Asistente de IA para reservas",
    tagline: "Responde automáticamente a consultas frecuentes en WhatsApp",
    result: "Reduce drásticamente los tiempos de respuesta",
    includes: [
      "Asistente configurado con la info de tu local",
      "Integración total con WhatsApp Business",
      "Ayuda en la gestión automática de citas",
      "Filtro inicial y derivación al equipo si hace falta",
      "Panel de control para supervisar interacciones",
    ],
    outcome:
      "Una primera línea de atención ágil que ayuda a gestionar contactos y ofrecer información inmediata al usuario, incluso cuando estás reunido o fuera de horario.",
  },
];

const colorMap: Record<string, { border: string; icon: string; badge: string; result: string }> = {
  blue: {
    border: "hover:border-blue-400/40",
    icon: "text-blue-400 bg-blue-400/10",
    badge: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    result: "text-blue-300 bg-blue-400/10 border-blue-400/20",
  },
  emerald: {
    border: "hover:border-emerald-400/40",
    icon: "text-emerald-400 bg-emerald-400/10",
    badge: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    result: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  },
  purple: {
    border: "hover:border-purple-400/40",
    icon: "text-purple-400 bg-purple-400/10",
    badge: "text-purple-300 bg-purple-400/10 border-purple-400/20",
    result: "text-purple-300 bg-purple-400/10 border-purple-400/20",
  },
};

const Services = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="servicios" className="py-24 bg-white/[0.015] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-3"
          >
            Servicios
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Lo que hacemos.{" "}
            <span className="text-gradient">Lo que consigues.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 text-lg max-w-xl mx-auto"
          >
            No vendemos horas ni tareas. Vendemos resultados concretos para tu negocio.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => {
            const colors = colorMap[service.color];
            const isExpanded = expanded === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex flex-col rounded-3xl glass border transition-all duration-300 ${colors.border} overflow-hidden`}
              >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${colors.badge}`}
                    >
                      <BadgeCheck className="w-3 h-3" />
                      {service.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors.icon}`}>
                    {service.icon}
                  </div>

                  {/* Title & tagline */}
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className="text-sm text-foreground/45 mb-4">{service.tagline}</p>

                  {/* Result highlight */}
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold mb-6 ${colors.result}`}>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    {service.result}
                  </div>

                  {/* Toggle includes */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : i)}
                    className="flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-foreground/90 transition-colors mb-4 group"
                    aria-expanded={isExpanded}
                    id={`service-toggle-${i}`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Ocultar detalles
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Ver qué incluye
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mb-4">
                          {service.includes.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground/65">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-foreground/50 italic border-l-2 border-primary/30 pl-3 mb-4">
                          {service.outcome}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`service-cta-${i}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-white/5 hover:bg-primary hover:text-white border border-white/10 hover:border-primary transition-all duration-300"
                    >
                      Me interesa este servicio
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-foreground/40"
        >
          ¿No sabes cuál necesitas?{" "}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Cuéntame tu caso y te orientamos gratis →
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Services;
