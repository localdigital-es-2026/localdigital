"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Calendar, MapPin, CheckCircle2, Sparkles, X, Brain } from "lucide-react";

const Solution = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Desarrollo Web Pro",
      description: "Infraestructuras de alto rendimiento y SEO optimizado desde la primera línea de código. Tu web cargará al instante.",
      extendedDescription: "Creamos infraestructuras web sin depender de plantillas lentas ni constructores pesados. Cada línea de código está optimizada para que tu página web cargue en menos de 1 segundo, ofreciendo la mejor experiencia de usuario y reduciendo drásticamente la tasa de rebote. Una web rápida y moderna es una web que vende y convierte visitantes en clientes fidelizados.",
      icon: <Zap className="w-10 h-10 text-blue-400" />,
      features: [
        { text: "Google Core Web Vitals", highlight: false }, 
        { text: "Carga en < 1s", highlight: false }, 
        { text: "Diseño Responsivo", highlight: false }
      ],
      color: "blue",
    },
    {
      title: "Sistema de Reservas",
      description: "UX fluida para que tus clientes reserven en segundos sin salir de tu propia plataforma.",
      extendedDescription: "Digitaliza y automatiza tu agenda 24 horas al día, 7 días a la semana. Olvídate de gestionar citas por teléfono o mediante mensajes cruzados. Tus clientes podrán ver la disponibilidad en tiempo real y reservar de forma totalmente autónoma. Además, integramos recordatorios automáticos por WhatsApp y pagos de señal para eliminar por completo los 'no shows' (incomparecencias) y asegurar tus ingresos.",
      icon: <Calendar className="w-10 h-10 text-purple-400" />,
      features: [
        { text: "Gestión en tiempo real", highlight: false }, 
        { text: "Recordatorios WhatsApp", highlight: false }, 
        { text: "Pagos integrados", highlight: false }
      ],
      color: "purple",
    },
    {
      title: "SEO Local & GEO",
      description: "Aparece cuando más te necesitan. Optimizamos tu ficha de Google Maps y búsqueda en nuevos motores de IA.",
      extendedDescription: "El SEO tradicional ya no es suficiente. Optimizamos tu presencia digital no solo para dominar los primeros resultados de Google Maps en tu zona (SEO Local), sino que estructuramos tu información para los nuevos motores conversacionales (GEO - Generative Engine Optimization). Así, cuando potenciales clientes busquen recomendaciones en ChatGPT, Claude o Google Gemini, tu negocio será la primera respuesta sugerida de forma orgánica.",
      icon: <MapPin className="w-10 h-10 text-emerald-400" />,
      badge: "El Futuro de la Búsqueda",
      features: [
        { text: "Google Business Profile", highlight: false }, 
        { text: "GEO: Posiciona en ChatGPT/Claude", highlight: true }, 
        { text: "Ranking Local Garantizado", highlight: false }
      ],
      color: "emerald",
    },
    {
      title: "Agentes de IA & Automatización",
      description: "Tu empleado 24/7. Implementamos asistentes inteligentes que responden dudas y agendan citas automáticamente.",
      extendedDescription: "No dejes que el tiempo de respuesta sea un obstáculo para tus ventas. Implementamos agentes de Inteligencia Artificial conversacional entrenados específicamente con los datos de tu negocio. Estos asistentes atienden a tus clientes en tiempo real, resuelven dudas frecuentes, cualifican leads y agendan citas directamente en tu calendario (o WhatsApp) las 24 horas del día. Es como tener a tu mejor comercial trabajando sin descanso para captar cada oportunidad.",
      icon: <Brain className="w-10 h-10 text-indigo-400" />,
      features: [
        { text: "Respuesta inmediata 24/7", highlight: false }, 
        { text: "IA entrenada con tu negocio", highlight: true }, 
        { text: "Cierre de ventas automático", highlight: false }
      ],
      color: "indigo",
    },
  ];

  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Nuestra Solución: <span className="text-primary italic">The Product</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/60 max-w-2xl mx-auto"
          >
            Tu negocio local, ahora sin fronteras. Creamos infraestructuras digitales diseñadas para crecer.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedCard(index)}
              className="p-8 rounded-3xl glass transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 cursor-pointer group shadow-lg shadow-black/20 flex flex-col h-full"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div className="flex flex-col mb-4">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                {card.badge && (
                  <span className="w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <Sparkles className="w-3 h-3" />
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-foreground/60 mb-8 leading-relaxed flex-1">
                {card.description}
              </p>
              <ul className="space-y-4">
                {card.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className={`flex items-center gap-3 text-sm font-medium transition-colors ${feature.highlight ? 'text-primary font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] bg-primary/10 p-2 -ml-2 rounded-lg border border-primary/20' : ''}`}
                  >
                    {feature.highlight ? <Sparkles className="w-4 h-4 text-primary animate-pulse" /> : <CheckCircle2 className="w-4 h-4 text-primary" />}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-4 border-t border-white/5 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                Ver más detalles <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedCard(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-[#0a101f] border border-white/10 rounded-3xl p-8 z-[101] shadow-2xl glass custom-scrollbar"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedCard(null); }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit">
                {cards[selectedCard].icon}
              </div>
              
              <div className="flex flex-col mb-6">
                <h3 className="text-3xl font-bold mb-2">{cards[selectedCard].title}</h3>
                {cards[selectedCard].badge && (
                  <span className="w-fit px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {cards[selectedCard].badge}
                  </span>
                )}
              </div>
              
              <div className="prose prose-invert border-l-2 border-primary/30 pl-4 mb-8">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {cards[selectedCard].extendedDescription}
                </p>
              </div>

              <ul className="space-y-4 mb-10 bg-white/5 p-6 rounded-2xl border border-white/5">
                {cards[selectedCard].features.map((feature, i) => (
                  <li 
                    key={i} 
                    className={`flex items-center gap-3 text-base font-medium ${feature.highlight ? 'text-primary font-bold' : 'text-foreground/90'}`}
                  >
                    {feature.highlight ? <Sparkles className="w-5 h-5 text-primary" /> : <CheckCircle2 className="w-5 h-5 text-primary" />}
                    {feature.text}
                  </li>
                ))}
              </ul>
              
              <a
                href="https://wa.me/34606701267?text=Hola!%20Me%20gustar%C3%ADa%20pedir%20informaci%C3%B3n%20acerca%20de%20vuestros%20servicios.%20Estoy%20pensando%20en%20crear%20una%20web%20o%20mejorar%20la%20que%20tengo%20y%20quer%C3%ADa%20informaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-primary text-white font-bold flex flex-col items-center justify-center glow-button hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <span className="flex items-center gap-2">Solicitar este Servicio <Sparkles className="w-4 h-4" /></span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Solution;
