import type { LockScreenData } from "@/content/types";

/** Pantalla de bloqueo dibujada con mensajes de WhatsApp sin leer a última hora (RF-53, D-36). */
export function LockScreen({ data }: { data: LockScreenData }) {
  const opacities = ["bg-white/90", "bg-white/80", "bg-white/70"];
  return (
    <div
      role="img"
      aria-label={data.description}
      data-lock-screen
      className="mx-auto flex w-full max-w-[340px] flex-col gap-2.5 rounded-[44px] bg-[linear-gradient(160deg,#3a4a6b,#1b2238)] px-[18px] pb-9 pt-7 text-white"
    >
      <span className="text-center text-[15px] opacity-85">{data.date}</span>
      <span className="mb-4 text-center text-[72px] font-semibold leading-none tracking-tight">{data.time}</span>
      <span className="flex flex-col gap-0.5 rounded-[18px] bg-white/90 px-3.5 py-3 text-[13px] text-[#1d1d1f]">
        <span className="font-semibold">{data.title}</span>
        <span className="text-[#424245]">{data.previews[0]}</span>
      </span>
      {data.previews.slice(1).map((preview, index) => (
        <span key={preview} className={`rounded-[18px] px-3.5 py-3 text-[13px] text-[#424245] ${opacities[index + 1] ?? "bg-white/70"}`}>
          {preview}
        </span>
      ))}
      <span className="rounded-[18px] bg-white/50 px-3.5 py-2.5 text-center text-xs text-[#1d1d1f]">{data.more}</span>
    </div>
  );
}
