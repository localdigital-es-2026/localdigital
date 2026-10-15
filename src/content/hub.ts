import { formatEuros, formatMonthly } from "@/lib/format";
import { site } from "./site";
import type { PageContent } from "./types";

// Textos de specs/001-hub-y-landing-academias/contenido/hub.md.
// Precios, plazos y plazas salen siempre de site.ts (RNF-07).
const { prices, conditions, pilot } = site;
const setup = formatEuros(prices.assistantSetup);
const monthly = formatMonthly(prices.assistantMonthly);

export const hub: PageContent = {
  slug: "",
  nav: "full",
  seo: {
    title: "Local Digital · Asistentes de WhatsApp para negocios locales",
    description:
      "Un asistente que contesta a tus clientes por WhatsApp en segundos, a cualquier hora. Precios claros y sin permanencia. Reserva una demo gratis de 15 minutos.",
  },
  sections: [
    {
      kind: "hero",
      id: "inicio",
      eyebrow: "Asistentes de WhatsApp para negocios locales",
      title: "Ningún cliente sin respuesta. Ni a las 11 de la noche.",
      subtitle: "Un asistente contesta a tus clientes en segundos. Tú solo hablas con los que ya quieren comprar.",
      ctaNote: "Gratis y sin compromiso",
      secondaryCta: { label: "Ver precios", href: "#precios" },
      chat: {
        contact: "Tu negocio",
        description:
          "Ejemplo de conversación de WhatsApp: a las 23:04 un cliente pregunta si hay cita el sábado y el asistente le ofrece dos horas, reserva la de las 10:00 y le dice el precio.",
        messages: [
          { from: "cliente", time: "23:04", text: "Hola, ¿tenéis cita el sábado por la mañana?" },
          { from: "asistente", time: "23:04", text: "¡Hola! Sí, el sábado quedan huecos a las 10:00 y a las 12:30. ¿Te reservo alguno?" },
          { from: "cliente", time: "23:05", text: "A las 10, porfa. ¿Cuánto es?" },
          { from: "asistente", time: "23:05", text: "Reservado: sábado a las 10:00. Son 18 €. Te mando un recordatorio el viernes." },
        ],
      },
      demoLinkText: "¿Prefieres probarlo ya? Escríbele a nuestro asistente por WhatsApp →",
    },
    {
      kind: "problem",
      id: "problema",
      title: "Cada mensaje sin contestar es un cliente que pregunta en otro sitio.",
      scenes: [
        {
          title: "Son las 22:00.",
          body: "Te preguntan el precio. Contestas a las 9:00. Ya se ha apuntado en otro sitio.",
        },
        {
          title: "Las mismas cinco preguntas.",
          body: "Precio, horario, plazas, dirección, forma de pago. Treinta veces al día.",
        },
        {
          title: "Estás con un cliente",
          body: "y suena el teléfono. Ese otro no vuelve a llamar.",
        },
      ],
      closing: "No es falta de clientes. Es falta de manos para atenderlos a tiempo.",
      lockScreen: {
        date: "martes, 14 de octubre",
        time: "23:12",
        title: "WhatsApp · 14 mensajes sin leer",
        previews: ["¿Cuánto cuesta?", "¿Abrís mañana?", "¿Queda plaza?"],
        more: "y 11 más",
        description: "Pantalla de bloqueo de un móvil a las 23:12 con 14 mensajes de WhatsApp sin leer de clientes que preguntan precio, horario y plazas.",
      },
    },
    {
      kind: "marquee",
      id: "preguntas",
      label: "Preguntas que tu asistente contesta por ti",
      questions: [
        "¿Cuánto cuesta?",
        "¿Abrís el sábado?",
        "¿Queda plaza para mañana?",
        "¿Dónde estáis?",
        "¿Aceptáis tarjeta?",
        "¿Puedo cambiar mi cita?",
        "¿Hacéis presupuesto sin compromiso?",
        "¿Tenéis aparcamiento cerca?",
      ],
    },
    {
      kind: "services",
      id: "servicios",
      title: "Todo lo que necesitas para no perder clientes.",
      intro: "El asistente es lo principal. Si te falta lo básico, también lo hacemos.",
      blocks: [
        {
          icon: "chat",
          name: "Asistente de WhatsApp",
          title: "Contesta por ti, a cualquier hora.",
          price: `Desde ${setup} + ${monthly}`,
          link: { label: "Ver precios", href: "#precios" },
          featured: {
            badge: "El más pedido",
            features: [
              "Contesta precios, horarios y dudas al momento.",
              "Reserva citas o recoge los datos del cliente.",
              "Te avisa de cada cliente nuevo.",
              "Te pasa la conversación si no sabe la respuesta.",
            ],
            summary: {
              label: "Ejemplo de resumen mensual",
              items: ["Mensajes contestados", "Contactos para ti", "Fuera de tu horario"],
              description:
                "Ejemplo del resumen mensual que te enviamos: mensajes contestados, contactos que te pasa el asistente y cuántos llegaron fuera de tu horario.",
            },
          },
        },
        {
          icon: "web",
          name: "Web para tu negocio",
          title: "Clara, rápida en el móvil y con el WhatsApp a un toque.",
          price: `Desde ${formatEuros(prices.web)}`,
          link: { label: "Ver precios", href: "#precios" },
        },
        {
          icon: "map",
          name: "Ficha de Google Maps",
          title: "Sal cuando alguien de tu zona busca lo que ofreces.",
          price: `Incluida con la web · suelta ${formatEuros(prices.mapsStandalone)}`,
          link: { label: "Ver precios", href: "#precios" },
        },
      ],
    },
    {
      kind: "steps",
      id: "proceso",
      title: "Tres pasos. Tú sigues con tu negocio.",
      steps: [
        { title: "Demo de 15 minutos.", body: "Lo ves funcionar con preguntas de tu sector.", thumb: "call" },
        {
          title: `Lo instalamos en ${conditions.installDays} días laborables.`,
          body: "Nos das la información de tu negocio; el resto lo hacemos nosotros.",
          thumb: "list",
        },
        { title: "Lo mantenemos cada mes.", body: "Lo ajustamos y te mandamos un resumen de resultados.", thumb: "chat" },
      ],
    },
    {
      kind: "pricing",
      id: "precios",
      title: "Precios claros desde el principio.",
      plans: [
        {
          title: "Asistente de WhatsApp",
          badge: "el más pedido",
          lines: [
            { text: `Instalación: desde ${setup}`, note: 1 },
            { text: `Mantenimiento: ${monthly}`, note: 1 },
          ],
          includes:
            "Incluye: preparación con la información de tu negocio, pruebas antes de activarlo, ajustes mensuales y resumen de resultados.",
        },
        {
          title: "Web para tu negocio",
          lines: [{ text: `Desde ${formatEuros(prices.web)} (pago único)`, note: 1 }],
          includes: "Hasta 5 páginas, posicionamiento básico en Google y 1 mes de soporte incluidos.",
        },
        {
          title: "Ficha de Google Maps",
          lines: [{ text: "Incluida con la web" }, { text: `Suelta: ${formatEuros(prices.mapsStandalone)} (pago único)`, note: 1 }],
        },
      ],
      guaranteeLabel: "Garantía de 60 días",
      notes: [
        { id: 1, text: `${conditions.commitment}: si un mes no te compensa, lo dejas. Precios sin IVA (${conditions.vat}).` },
        { id: 2, text: conditions.guarantee },
      ],
      cta: true,
    },
    {
      kind: "pilot",
      id: "piloto",
      eyebrow: "Plazas de lanzamiento",
      title: `Instalación a mitad de precio para nuestros ${pilot.total} primeros negocios.`,
      body: `${formatEuros(prices.pilotSetup)} en lugar de ${setup}. Somos una agencia nueva y preferimos decirlo claro.`,
      asksIntro: "A cambio, si te gusta el resultado, te pediremos:",
      asks: ["Una opinión que podamos publicar.", "Una reseña en Google."],
    },
    { kind: "sectors", id: "sectores" },
    {
      kind: "about",
      id: "sobre-nosotros",
      title: "Somos Beatriz y Mauri.",
      body: [
        "Dos desarrolladores y las dos personas detrás de Local Digital. Sin comerciales ni intermediarios: hablas con quien construye tu asistente.",
      ],
      commitments: [
        { title: "Trato directo", body: "Nos escribes a nosotros." },
        { title: "Te hablamos claro", body: "Si no te ayuda, te lo decimos." },
        { title: "Menos de 24 h", body: "Siempre respondemos." },
      ],
    },
    {
      kind: "faq",
      id: "faq",
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuánto cuesta?",
          a: `La instalación del asistente empieza en ${setup} y el mantenimiento es de ${monthly} (${conditions.vat}), sin permanencia. En la demo te damos el precio exacto para tu caso.`,
        },
        {
          q: "¿Esto sirve para mi negocio?",
          a: "Si recibes muchas preguntas parecidas por WhatsApp, casi seguro que sí. Si no es tu caso, te lo diremos en la demo y no te venderemos nada.",
        },
        {
          q: "Sois nuevos. ¿Por qué debería confiar?",
          a: "Porque no tienes que creernos: en la demo lo ves funcionar con preguntas de tu negocio. Y sin permanencia, si no te compensa, lo dejas.",
        },
        {
          q: "¿Y si el asistente se equivoca?",
          a: "Solo contesta con la información que tú nos das. Cuando no sabe algo, no se lo inventa: te pasa la conversación a ti.",
        },
        {
          q: "¿Qué pasa con los datos de mis clientes?",
          a: "Cumplimos el RGPD y firmamos contigo el contrato de tratamiento de datos. Los datos de tus clientes son tuyos y no se usan para entrenar ninguna IA. Tú decides qué información puede dar el asistente.",
        },
        {
          q: "¿Puedo cambiar lo que contesta?",
          a: `Sí. Tú decides qué contesta y qué no. Si cambias precios u horarios, lo actualizamos en menos de ${conditions.updateHours} horas laborables.`,
        },
        {
          q: "¿Tengo que saber de tecnología?",
          a: "No. Nosotros lo instalamos y lo mantenemos. Tú sigues usando tu WhatsApp como siempre.",
        },
        {
          q: "¿Necesito WhatsApp Business?",
          a: "No tienes que cambiar de número: tus clientes te siguen escribiendo al de siempre. Usamos la conexión oficial de WhatsApp para empresas (Meta) y en la demo te explicamos cómo queda en tu caso.",
        },
        {
          q: "¿Qué pasa si quiero dejarlo?",
          a: "Nos avisas y no se renueva el mes siguiente. Sin permanencia ni letra pequeña.",
        },
      ],
    },
    {
      kind: "closing",
      id: "cierre",
      title: "Mira cómo contestaría tu negocio.",
      body: "15 minutos, con preguntas de tu sector. Sin compromiso y sin tecnicismos.",
    },
  ],
};
