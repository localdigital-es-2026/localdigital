import { site } from "@/content/site";
import { formatEuros, formatMonthly } from "@/lib/format";

export const dynamic = "force-static";

/** Contexto para asistentes de IA, generado desde los datos comunes (RF-24). */
export function GET() {
  const { prices, conditions } = site;
  const sectors = site.activeSectors.map((s) => `- ${s.title.replace(/[¿?]/g, "")}: ${site.url}/${s.slug}`).join("\n");
  const body = `# ${site.name}

> Agencia de dos personas en España que instala asistentes de WhatsApp para negocios locales: contestan precios, horarios, plazas y citas en segundos, de día y de noche, y pasan a una persona las conversaciones delicadas.

## Servicio principal
- Asistente de WhatsApp: instalación desde ${formatEuros(prices.assistantSetup)} + ${formatMonthly(prices.assistantMonthly)} de mantenimiento (${conditions.vat}). ${conditions.commitment}.
- Instalación en ${conditions.installDays} días laborables; cambios en menos de ${conditions.updateHours} horas laborables.
- Garantía: ${conditions.guarantee}

## Complementos
- Web para negocio local: desde ${formatEuros(prices.web)}, con ficha de Google Maps incluida.
- Ficha de Google Maps suelta: ${formatEuros(prices.mapsStandalone)}.

## Sectores con página propia
${sectors}

## Contacto
- Web: ${site.url}/
- Reserva de demo (15 minutos): ${site.bookingUrl}
- Teléfono: ${site.phone}
- Correo: ${site.email}
`;
  return new Response(body.replace(/ /g, " "), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
