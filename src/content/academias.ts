import { formatEuros, formatMonthly } from "@/lib/format";
import { site } from "./site";
import type { PageContent } from "./types";

// Textos de specs/001-hub-y-landing-academias/contenido/academias.md.
// Precios, plazos y plazas salen siempre de site.ts (RNF-07).
// Los importes de los chats son ficticios y van marcados como «Ejemplo» (RF-17).
const { prices, conditions, pilot } = site;
const setup = formatEuros(prices.assistantSetup);
const monthly = formatMonthly(prices.assistantMonthly);

export const academias: PageContent = {
  slug: "academias",
  nav: "minimal",
  seo: {
    title: "Asistente de WhatsApp para academias y autoescuelas · Local Digital",
    description: `Contesta precios, horarios y plazas al instante, también de noche y en septiembre. Desde ${setup} + ${monthly}, sin permanencia. Reserva una demo gratis de 15 minutos.`,
  },
  sections: [
    {
      kind: "hero",
      id: "inicio",
      eyebrow: "Para academias y autoescuelas",
      title: "Septiembre sin 200 WhatsApps sin contestar.",
      subtitle: `Un asistente que responde precios, horarios, niveles y plazas en segundos, de día y de noche. Apunta a los interesados y te los deja listos para matricular. Listo en ${conditions.installDays} días laborables.`,
      ctaNote: "Gratis y sin compromiso · Te lo enseñamos con las preguntas que te hacen tus alumnos",
      secondaryCta: { label: "Ver precios", href: "#precios" },
      chat: {
        contact: "Tu academia",
        description:
          "Ejemplo de conversación de WhatsApp: a las 22:47 una persona pregunta el precio del curso de inglés B1 y si quedan plazas; el asistente responde y le reserva una prueba de nivel.",
        messages: [
          { from: "cliente", time: "22:47", text: "Hola, ¿cuánto cuesta el curso de inglés B1 y queda plaza en septiembre?" },
          { from: "asistente", time: "22:47", text: "¡Hola! El B1 son 65 €/mes. En septiembre quedan plazas los martes y jueves a las 18:00. ¿Quieres reservar una prueba de nivel gratis?" },
          { from: "cliente", time: "22:48", text: "Sí, el martes." },
          { from: "asistente", time: "22:48", text: "Hecho: prueba de nivel el martes a las 18:00. Te avisamos el lunes." },
        ],
      },
    },
    {
      kind: "problem",
      id: "problema",
      title: "Mientras das clase, otro centro está contestando a tu alumno.",
      scenes: [
        {
          title: "Es septiembre.",
          body: "Te llegan decenas de mensajes al día: precio, horario, si queda plaza. Contestas por la noche, cansado. Algunos ya se han matriculado en otro sitio.",
        },
        {
          title: "Las mismas preguntas, todo el año.",
          body: "«¿Cuánto cuesta?», «¿Qué nivel necesito?», «¿Hay grupo por la tarde?», «¿Hacéis clase de prueba?»",
          tag: "Academia",
        },
        {
          title: "Las mismas preguntas, todo el año.",
          body: "«¿Cuánto cuesta el carnet?», «¿Cuántas prácticas entran?», «¿Cuándo empieza el teórico?», «¿Tenéis intensivo?»",
          tag: "Autoescuela",
        },
        {
          title: "Estás en clase o en una práctica.",
          body: "No puedes mirar el móvil. Cuando contestas, dos horas después, el interesado ya no responde.",
        },
      ],
      closing:
        "Un alumno que pregunta y no recibe respuesta rápida no vuelve a preguntar. Se apunta donde le contestan primero.",
    },
    {
      kind: "features",
      id: "solucion",
      title: "Un asistente en tu WhatsApp que conoce tu centro como tú.",
      intro:
        "Lo preparamos con tus precios, horarios, grupos y normas. Contesta con tu tono y, cuando una pregunta necesita a una persona, te pasa la conversación.",
      items: [
        { title: "Informa al momento", body: "de precios, horarios, niveles, grupos y plazas libres." },
        {
          title: "Apunta a los interesados",
          body: "con nombre, teléfono, curso que buscan y horario que les va bien. Te llegan ordenados.",
        },
        { title: "Reserva la clase de prueba o la prueba de nivel.", body: "", tag: "Academia" },
        { title: "Reserva la cita para informarse o matricularse.", body: "", tag: "Autoescuela" },
        { title: "Te avisa", body: "de cada interesado nuevo para que llames a quien está a punto de apuntarse." },
        {
          title: "Te pasa la conversación",
          body: "cuando preguntan algo delicado: una reclamación, un caso especial o un pago.",
        },
      ],
      benefits: {
        title: "Lo que ganas:",
        items: [
          "Ningún interesado sin respuesta, ni en septiembre ni a las 23:00.",
          "Dejas de repetir las mismas respuestas cada día.",
          "Llegas al momento de matricular con los datos ya recogidos.",
        ],
      },
    },
    {
      kind: "pricing",
      id: "precios",
      title: "Lo que cuesta, desde el principio.",
      plans: [
        {
          title: "Asistente de WhatsApp para tu centro",
          lines: [
            { text: `Instalación: desde ${setup}`, note: 1 },
            { text: `Mantenimiento: ${monthly}`, note: 1 },
          ],
          includesList: [
            "Preparación con los precios, horarios y grupos de tu centro.",
            "Pruebas antes de activarlo: lo ves funcionar antes de que hable con tus alumnos.",
            `Cambios en menos de ${conditions.updateHours} horas laborables cuando abras un grupo nuevo o cambies precios.`,
            "Ajustes cada mes según las preguntas reales que recibe.",
            "Resumen mensual: cuántos mensajes ha contestado y cuántos interesados te ha pasado.",
          ],
        },
        {
          title: "¿Necesitas también web?",
          lines: [{ text: `Web desde ${formatEuros(prices.web)}, con la ficha de Google Maps incluida.`, note: 1 }],
        },
      ],
      notes: [{ id: 1, text: `${conditions.commitment}. Precios sin IVA (${conditions.vat}).` }],
    },
    {
      kind: "guarantee",
      id: "garantia",
      title: "Sin riesgo para tu centro.",
      points: [
        { title: "Garantía de 60 días:", body: conditions.guarantee },
        { title: `${conditions.commitment}:`, body: "si un mes no te compensa, lo dejas." },
        { title: "Lo pruebas antes:", body: "no se activa con tus alumnos hasta que tú das el visto bueno." },
      ],
    },
    {
      kind: "chatDemo",
      id: "demo",
      title: "Míralo contestar a un alumno.",
      intro: "Así respondería tu asistente. En la demo lo preparamos con los datos de tu centro.",
      chats: [
        {
          tag: "Academia",
          messages: [
            { from: "alumno", time: "22:47", text: "Hola, ¿tenéis inglés B2 por las tardes?" },
            {
              from: "asistente",
              text: "¡Hola! Sí, hay grupo de B2 los lunes y miércoles de 18:00 a 19:30. Cuesta 95 € al mes y quedan 3 plazas. ¿Quieres hacer una prueba de nivel gratuita?",
            },
            { from: "alumno", text: "Vale, sí" },
            { from: "asistente", text: "Perfecto. ¿Nos dices tu nombre y qué día te viene bien esta semana?" },
          ],
        },
        {
          tag: "Autoescuela",
          messages: [
            { from: "alumno", time: "23:15", text: "Buenas, ¿cuánto cuesta sacarse el B?" },
            {
              from: "asistente",
              text: "¡Hola! La matrícula con el teórico cuesta 250 € y cada práctica 35 €. Tenemos curso intensivo en julio. ¿Quieres que te reservemos una cita para informarte en persona?",
            },
          ],
        },
      ],
      demoLinkText: "¿Prefieres probarlo ya? Escríbele a nuestro asistente de ejemplo por WhatsApp →",
    },
    {
      kind: "pilot",
      id: "piloto",
      eyebrow: "Plazas de lanzamiento para academias y autoescuelas",
      title: `Buscamos ${pilot.total} centros para nuestros primeros casos.`,
      body: `Somos una agencia nueva y preferimos decirlo claro. Por eso ofrecemos la instalación a mitad de precio, ${formatEuros(prices.pilotSetup)} en lugar de ${setup}, a los ${pilot.total} primeros centros que confíen en nosotros.`,
      asksIntro: "A cambio, si estás contento con el resultado, te pediremos:",
      asks: [
        "Una opinión que podamos publicar.",
        "Una reseña en Google.",
        "Que nos presentes a otros centros que conozcas, si te parece bien.",
      ],
    },
    {
      kind: "about",
      id: "sobre-nosotros",
      title: "Somos Beatriz y Mauri.",
      body: [
        "Somos dos desarrolladores y acabamos de pasar por el otro lado: hemos sido alumnos y sabemos lo que es preguntar a un centro y esperar respuesta. Montamos Local Digital para que eso no le pase a tu academia. Hablas directamente con nosotros, sin intermediarios.",
      ],
    },
    {
      kind: "faq",
      id: "faq",
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuánto cuesta?",
          a: `Instalación desde ${setup} y ${monthly} de mantenimiento (${conditions.vat}), sin permanencia.`,
          pilotNote: `Si entras en el programa piloto, la instalación son ${formatEuros(prices.pilotSetup)}.`,
        },
        {
          q: "¿Sirve para un centro pequeño?",
          a: "Sí. Si recibes muchas preguntas parecidas por WhatsApp, te ahorra tiempo aunque tengas pocos grupos. Si vemos que no te compensa, te lo diremos en la demo.",
        },
        {
          q: "¿Y si un padre o una madre pregunta por su hijo?",
          a: "El asistente contesta igual: informa de precios, horarios y plazas. Para todo lo que tenga que ver con un alumno concreto, te pasa la conversación a ti.",
        },
        {
          q: "¿Qué pasa cuando cambian los grupos o los precios?",
          a: `Nos lo dices y lo actualizamos en menos de ${conditions.updateHours} horas laborables.`,
        },
        {
          q: "¿Y si el asistente no sabe algo?",
          a: "No se lo inventa. Contesta solo con la información que tú nos das y, si no la tiene, te pasa la conversación.",
        },
        {
          q: "¿Tengo que cambiar de número?",
          a: "No: tus alumnos te siguen escribiendo al de siempre. Usamos la conexión oficial de WhatsApp para empresas y en la demo te explicamos cómo queda en tu caso.",
        },
        {
          q: "¿Lo tendré listo para septiembre?",
          a: `Lo instalamos en ${conditions.installDays} días laborables. Para llegar tranquilo a la temporada, conviene empezar en junio o julio.`,
        },
      ],
    },
    {
      kind: "closing",
      id: "cierre",
      title: "Llega a septiembre con el WhatsApp bajo control.",
      body: "En 15 minutos te enseñamos el asistente contestando las preguntas de tu centro. Sin compromiso y sin tecnicismos.",
    },
  ],
};
