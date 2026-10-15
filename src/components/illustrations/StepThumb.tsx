import type { StepThumbKind } from "@/content/types";

const LABELS: Record<StepThumbKind, string> = {
  call: "Videollamada de 15 minutos",
  list: "Lista de preguntas y respuestas de tu negocio",
  chat: "Asistente contestando mensajes de WhatsApp",
};

/** Miniatura dibujada de cada paso de «cómo funciona» (RF-55, D-36). */
export function StepThumb({ kind }: { kind: StepThumbKind }) {
  if (kind === "call") {
    return (
      <div role="img" aria-label={LABELS.call} className="grid h-[150px] grid-cols-2 gap-1.5 rounded-[14px] bg-[#1d1d1f] p-1.5">
        <span className="block rounded-[10px] bg-[#3a3a3c]" />
        <span className="block rounded-[10px] bg-[#48484a]" />
      </div>
    );
  }
  if (kind === "list") {
    return (
      <div role="img" aria-label={LABELS.list} className="flex h-[150px] flex-col gap-2 rounded-[14px] bg-[#f5f5f7] p-3.5 text-xs">
        <span className="rounded-lg bg-white px-2 py-1.5">¿Precio? → lo que tú digas</span>
        <span className="rounded-lg bg-white px-2 py-1.5">¿Horario? → el tuyo</span>
        <span className="rounded-lg bg-white px-2 py-1.5">¿Aparcamiento? → sí, cerca</span>
      </div>
    );
  }
  return (
    <div role="img" aria-label={LABELS.chat} className="flex h-[150px] flex-col gap-2 rounded-[14px] bg-[#efeae2] p-3.5 text-xs">
      <span className="self-start rounded-lg bg-white px-2 py-1.5">¿Abrís el sábado?</span>
      <span className="self-end rounded-lg bg-[#d9fdd3] px-2 py-1.5">Sí, por la mañana.</span>
      <span className="self-start rounded-lg bg-white px-2 py-1.5">¡Genial, gracias!</span>
    </div>
  );
}
