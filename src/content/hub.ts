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
  darkSections: ["inicio", "problema", "cierre"],
  navLinks: [
    { label: "Qué hacemos", href: "#servicios" },
    { label: "Cómo funciona", href: "#proceso" },
    { label: "Precios", href: "#precios" },
    { label: "Quiénes somos", href: "#sobre-nosotros" },
    { label: "Preguntas", href: "#faq" },
  ],
  seo: {
    title: "Local Digital · Asistentes de WhatsApp para negocios locales",
    description:
      "Un asistente que contesta a tus clientes por WhatsApp en segundos, a cualquier hora. Precios claros y sin permanencia. Reserva una demo gratis de 15 minutos.",
  },
  sections: [
    {
      kind: "hero",
      id: "inicio",
      eyebrow: "Asistentes de WhatsApp para negocios locales · España",
      title: "Ningún cliente sin respuesta. Ni a las 11 de la noche.",
      subtitle:
        "Instalamos un asistente que responde a tus clientes en segundos, de día y de noche: precios, horarios, plazas y citas. Tú solo hablas con los que ya quieren comprar.",
      ctaNote: "Gratis y sin compromiso · Te lo enseñamos funcionando con preguntas de tu negocio",
      demoLinkText: "¿Prefieres probarlo ya? Escríbele a nuestro asistente por WhatsApp →",
      visual: "3d",
    },
    {
      kind: "problem",
      id: "problema",
      title: "Cada mensaje sin contestar es un cliente que pregunta en otro sitio.",
      scenes: [
        {
          title: "Son las 22:00.",
          body: "Alguien te pregunta el precio. Lo ves a las 9:00 y contestas. Ya se ha apuntado en otro sitio.",
        },
        {
          title: "Las mismas cinco preguntas.",
          body: "Precio, horario, si hay plazas, dónde estáis, cómo se paga. Treinta veces al día.",
        },
        {
          title: "Estás atendiendo a un cliente",
          body: "y suena el teléfono. No puedes cogerlo. Ese cliente no vuelve a llamar.",
        },
      ],
      closing: "No es falta de clientes. Es falta de manos para atenderlos a tiempo.",
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
      kind: "features",
      id: "servicios",
      eyebrow: "Qué hacemos",
      title: "Un asistente en tu WhatsApp que atiende como lo harías tú.",
      intro:
        "Lo preparamos con la información real de tu negocio. Habla con tu tono, no como un robot. Y cuando una conversación necesita a una persona, te la pasa.",
      items: [
        { title: "Contesta al momento", body: "precios, horarios, ubicación y dudas frecuentes." },
        {
          title: "Reserva citas o pide datos",
          body: "(nombre, teléfono, qué necesita) y te los deja ordenados.",
        },
        { title: "Te avisa", body: "de cada cliente nuevo para que no se te escape ninguno." },
        {
          title: "Te pasa la conversación",
          body: "cuando la pregunta es delicada o no sabe la respuesta.",
        },
      ],
      control: {
        title: "Tú tienes el control:",
        body: `Tú decides qué contesta y qué no. Si cambias precios u horarios, lo actualizamos en menos de ${conditions.updateHours} horas laborables.`,
      },
      cta: true,
    },
    {
      kind: "services",
      id: "que-ofrecemos",
      title: "Todo lo que necesitas para no perder clientes.",
      intro: "El asistente es lo principal. Si te falta lo básico, también lo hacemos.",
      blocks: [
        {
          icon: "chat",
          name: "Asistente de WhatsApp",
          title: "Contesta por ti, a cualquier hora.",
          price: `Desde ${setup} + ${monthly}`,
          link: { label: "Cómo funciona", href: "#servicios" },
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
        {
          title: "Demo de 15 minutos.",
          body: "Te enseñamos el asistente funcionando con preguntas de tu sector. Sin compromiso.",
        },
        {
          title: `Lo instalamos en ${conditions.installDays} días laborables.`,
          body: "Nos das la información de tu negocio y nosotros hacemos el resto. Lo pruebas antes de activarlo.",
        },
        {
          title: "Lo mantenemos cada mes.",
          body: "Lo ajustamos según las preguntas reales de tus clientes y te enviamos un resumen mensual: cuántos mensajes ha contestado y cuántos contactos te ha pasado.",
        },
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
      title: `Buscamos ${pilot.total} negocios para nuestros primeros casos.`,
      body: `Somos una agencia nueva y preferimos decirlo claro. Por eso ofrecemos la instalación a mitad de precio, ${formatEuros(prices.pilotSetup)} en lugar de ${setup}, a los primeros ${pilot.total} negocios que confíen en nosotros.`,
      asksIntro: "A cambio, si estás contento con el resultado, te pediremos:",
      asks: ["Una opinión que podamos publicar.", "Una reseña en Google."],
    },
    { kind: "sectors", id: "sectores" },
    {
      kind: "about",
      id: "sobre-nosotros",
      title: "Somos Beatriz y Mauri.",
      body: [
        "Somos dos desarrolladores y las dos personas detrás de Local Digital. No hay comerciales ni intermediarios: hablas con quien construye tu asistente.",
        "Montamos Local Digital porque vimos negocios muy buenos perdiendo clientes por no llegar a contestar a tiempo. Eso tiene arreglo, y no hace falta que entiendas de tecnología.",
      ],
      commitments: [
        { title: "Trato directo.", body: "Nos escribes a nosotros, no a un centro de soporte." },
        { title: "Te hablamos claro.", body: "Si la IA no te va a ayudar, te lo diremos en la demo." },
        { title: "Respuesta en menos de 24 h.", body: "Siempre." },
      ],
    },
    {
      kind: "privacy",
      id: "datos",
      title: "Tus datos, protegidos.",
      points: [
        "Cumplimos el RGPD y firmamos contigo el contrato de tratamiento de datos.",
        "Los datos de tus clientes son tuyos y no se usan para entrenar ninguna IA.",
        "Tú decides qué información puede dar el asistente.",
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
      body: "En 15 minutos te enseñamos el asistente respondiendo preguntas de tu sector. Sin compromiso y sin tecnicismos.",
    },
  ],
};
