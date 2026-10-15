import { site } from "./site";

// Contenido de las páginas legales (RF-20). Todo dato de la titular, contacto o plazo sale de site.ts.
// Recomendación: revisión por un profesional jurídico antes de publicar.

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPage {
  slug: "aviso-legal" | "politica-de-privacidad" | "politica-de-cookies";
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

const { owner, retention } = site;
const UPDATED = "octubre de 2026";

export const avisoLegal: LegalPage = {
  slug: "aviso-legal",
  title: "Aviso legal",
  description: `Aviso legal de ${site.name}: datos de la titular del sitio web y condiciones de uso conforme a la LSSI-CE.`,
  updated: UPDATED,
  sections: [
    {
      title: "1. Datos de la titular",
      paragraphs: [
        "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos de la titular de este sitio web:",
      ],
      list: [
        `Titular: ${owner.fullName} (profesional autónoma), que opera con el nombre comercial ${site.name}.`,
        `NIF: ${owner.nif}.`,
        `Domicilio profesional: ${owner.address}.`,
        `Correo electrónico: ${owner.email}.`,
        `Teléfono: ${site.phone}.`,
        `Sitio web: ${site.url.replace("https://", "")}.`,
      ],
    },
    {
      title: "2. Objeto",
      paragraphs: [
        `Este sitio web informa sobre los servicios de ${site.name}: instalación y mantenimiento de asistentes de WhatsApp para negocios, diseño de páginas web y optimización de fichas de Google Maps. El acceso al sitio es gratuito y no requiere registro.`,
      ],
    },
    {
      title: "3. Condiciones de uso",
      paragraphs: [
        "Quien visita el sitio se compromete a usarlo de forma lícita y a no dañar su funcionamiento. La titular puede modificar los contenidos y estas condiciones en cualquier momento; los cambios se aplican desde su publicación.",
      ],
    },
    {
      title: "4. Precios y ofertas",
      paragraphs: [
        "Los precios publicados son orientativos, se indican sin IVA y se concretan en una propuesta por escrito antes de cualquier contratación. Las condiciones del programa piloto y de la garantía se rigen por esa propuesta.",
      ],
    },
    {
      title: "5. Propiedad intelectual e industrial",
      paragraphs: [
        `Los textos, el diseño, el logotipo y el código de este sitio pertenecen a la titular o se usan con autorización. No se permite su reproducción con fines comerciales sin autorización previa por escrito.`,
      ],
    },
    {
      title: "6. Enlaces a terceros",
      paragraphs: [
        "El sitio enlaza a servicios de terceros (Calendly para reservar la demo y WhatsApp para consultas). La titular no es responsable de su contenido ni de sus políticas, que se rigen por sus propias condiciones.",
      ],
    },
    {
      title: "7. Responsabilidad",
      paragraphs: [
        "La titular procura que la información sea exacta y esté actualizada, pero no garantiza la ausencia de errores ni la disponibilidad continua del sitio, y no responde de los daños derivados de su uso salvo en los casos previstos por la ley.",
      ],
    },
    {
      title: "8. Legislación aplicable",
      paragraphs: [
        "Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente.",
      ],
    },
  ],
};

export const politicaPrivacidad: LegalPage = {
  slug: "politica-de-privacidad",
  title: "Política de privacidad",
  description: `Cómo trata ${site.name} los datos personales: responsable, finalidades, plazos, terceros y derechos conforme al RGPD y la LOPDGDD.`,
  updated: UPDATED,
  sections: [
    {
      title: "1. Responsable del tratamiento",
      paragraphs: [`${owner.fullName}, NIF ${owner.nif}, con domicilio en ${owner.address}. Contacto: ${owner.email}.`],
    },
    {
      title: "2. Qué datos tratamos y cuándo",
      paragraphs: [
        "Este sitio web no te pide rellenar datos ni registrarte, y no guarda datos personales. Solo tratamos tus datos cuando decides contactarnos por los canales enlazados:",
      ],
      list: [
        "Reserva de una demo en Calendly: nombre, correo electrónico, teléfono si lo indicas y la fecha elegida.",
        "Consultas por WhatsApp: tu número de teléfono, tu nombre de perfil y el contenido de la conversación.",
        "Clientes: los datos necesarios para la propuesta, el contrato y la facturación.",
      ],
    },
    {
      title: "3. Finalidades y base legal",
      paragraphs: [],
      list: [
        "Organizar la demo y responder a tus consultas: aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).",
        "Prestar el servicio contratado: ejecución del contrato (art. 6.1.b RGPD).",
        "Cumplir obligaciones contables y fiscales: obligación legal (art. 6.1.c RGPD).",
      ],
    },
    {
      title: "4. Plazos de conservación",
      paragraphs: [],
      list: [
        `Si no llegas a contratar: borramos las reservas de Calendly y las conversaciones de WhatsApp ${retention.leadsMonths} meses después del último contacto, incluidas las copias o notas que se hayan hecho.`,
        `Si eres cliente: durante la relación y, después, ${retention.mercantileYears} años para la documentación mercantil y ${retention.fiscalYears} años para los datos con efectos fiscales.`,
        "Registros técnicos del alojamiento (dirección IP, fecha y página visitada): según la política del proveedor de alojamiento.",
      ],
    },
    {
      title: "5. Terceros que intervienen",
      paragraphs: ["No vendemos ni cedemos tus datos. Intervienen estos proveedores, cada uno con su propia política de privacidad:"],
      list: [
        "Calendly LLC (EE. UU.): gestión de las reservas de demo. Las transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. y/o en cláusulas contractuales tipo.",
        "WhatsApp Ireland Ltd. (grupo Meta): mensajería para las consultas.",
        "Netlify, Inc. (EE. UU.): alojamiento del sitio web, como encargado del tratamiento de los registros técnicos de acceso, que la web no guarda ni consulta. Transferencias amparadas en el Marco de Privacidad de Datos UE-EE. UU. y/o en cláusulas contractuales tipo.",
      ],
    },
    {
      title: "6. Tus derechos",
      paragraphs: [
        `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${owner.email}, indicando el derecho que ejerces. También puedes retirar el consentimiento en cualquier momento, sin que afecte a lo tratado antes.`,
        "Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).",
      ],
    },
    {
      title: "7. Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y organizativas adecuadas para proteger los datos que tratamos. El sitio web se sirve siempre por conexión cifrada (HTTPS).",
      ],
    },
  ],
};

export const politicaCookies: LegalPage = {
  slug: "politica-de-cookies",
  title: "Política de cookies",
  description: `${site.name} no utiliza cookies propias ni de terceros: ni de análisis, ni de publicidad, ni de redes sociales.`,
  updated: UPDATED,
  sections: [
    {
      title: "1. Este sitio no utiliza cookies",
      paragraphs: [
        "Este sitio web no utiliza cookies propias ni de terceros, ni otras tecnologías de almacenamiento en tu navegador: no hay herramientas de análisis, publicidad ni seguimiento. Por eso no te mostramos ningún aviso de cookies.",
      ],
    },
    {
      title: "2. Servicios enlazados",
      paragraphs: [
        "Si pulsas los enlaces para reservar la demo en Calendly o para escribirnos por WhatsApp, saldrás a sus sitios, que pueden usar sus propias cookies según sus políticas. Esas cookies se instalan en sus dominios, no en este.",
      ],
    },
    {
      title: "3. Cambios",
      paragraphs: [
        "Si en el futuro incorporamos alguna cookie que no sea estrictamente necesaria, actualizaremos esta política y te pediremos el consentimiento antes de instalarla.",
      ],
    },
  ],
};
