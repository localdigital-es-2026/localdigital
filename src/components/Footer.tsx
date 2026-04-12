"use client";

import React from "react";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#casos-de-exito", label: "Casos de éxito" },
    { href: "#proceso", label: "Cómo trabajamos" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#faq", label: "Preguntas frecuentes" },
  ];

  const legalLinks = [
    { href: "/aviso-legal", label: "Aviso legal" },
    { href: "/politica-de-privacidad", label: "Política de privacidad" },
    { href: "/politica-de-cookies", label: "Política de cookies" },
  ];

  return (
    <footer className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/real-logo.png"
                alt="Local Digital"
                width={36}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-bold">
                Local<span className="text-primary">Digital</span>
              </span>
            </div>
            <p className="text-sm text-foreground/45 leading-relaxed mb-5 max-w-xs">
              Desarrollo web, SEO local y automatización con IA para negocios
              que quieren crecer de verdad.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/localdigital.es"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Local Digital"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/50 hover:text-primary"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/localdigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Local Digital"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-foreground/50 hover:text-primary"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-4">
              Navegación
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground/90 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-4">
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+34603038050"
                  className="flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +34 603 03 80 50
                </a>
              </li>
              <li>
                <a
                  href="mailto:localdigital.es@gmail.com"
                  className="flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  localdigital.es@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30">
            © {year} Local Digital. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
