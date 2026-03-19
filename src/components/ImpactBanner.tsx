"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText, Sparkles } from "lucide-react";

const ImpactBanner = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-primary/5 via-indigo-500/10 to-primary/5 border-y border-white/5 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <MessageSquareText className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-foreground/90 max-w-2xl text-balance">
              No dejes que un mensaje sin responder sea una <span className="text-indigo-400 italic">venta perdida</span>. 
              Convierte tu tráfico en clientes con <span className="text-indigo-400 font-bold">IA</span>.
            </p>
          </div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Vende mientras duermes
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactBanner;
