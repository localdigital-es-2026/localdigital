"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "ld_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so the banner doesn't flash on first render
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="relative bg-[#0d1425] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-5 sm:p-6 backdrop-blur-xl">
            {/* Close button */}
            <button
              onClick={reject}
              aria-label="Cerrar aviso de cookies"
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/50 hover:text-foreground/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Cookie className="w-5 h-5 text-primary" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground/90 mb-1">
                  Usamos cookies
                </p>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  Utilizamos cookies propias estrictamente necesarias para el
                  funcionamiento del sitio. Puedes{" "}
                  <Link
                    href="/politica-de-cookies"
                    className="text-primary hover:underline font-medium"
                  >
                    leer más aquí
                  </Link>
                  .
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  id="cookie-accept"
                  onClick={accept}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Aceptar
                </button>
                <button
                  id="cookie-reject"
                  onClick={reject}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl glass border border-white/10 text-sm font-semibold text-foreground/60 hover:text-foreground/80 hover:bg-white/8 transition-colors whitespace-nowrap"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
