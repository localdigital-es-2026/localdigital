"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const WA_URL =
  "https://wa.me/34603038050?text=Hola!%20Nos%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20para%20nuestro%20negocio.%20%C2%BFHablamos%3F";

const navLinks = [
  { name: "Servicios", href: "/#servicios" },
  { name: "Casos de éxito", href: "/#casos-de-exito" },
  { name: "Cómo funciona", href: "/#proceso" },
  { name: "Sobre nosotros", href: "/#sobre-nosotros" },
  { name: "FAQ", href: "/#faq" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-lg bg-black/60 border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Image
            src="/real-logo.png"
            alt="Local Digital"
            width={36}
            height={36}
            className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            Local<span className="text-primary">Digital</span>
          </span>
        </motion.a>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/65 hover:text-foreground/95 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.name}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+34603038050"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/50 hover:text-foreground/80 transition-colors"
          >
            <Phone className="w-4 h-4" />
            603 03 80 50
          </a>
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold glow-button"
          >
            Contactar
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="lg:hidden text-foreground p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-3 text-base font-medium text-foreground/75 hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-center glow-button"
                >
                  Contactar por WhatsApp
                </a>
                <a
                  href="tel:+34603038050"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 rounded-xl glass border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  603 03 80 50
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
