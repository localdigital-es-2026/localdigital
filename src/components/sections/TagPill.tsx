import type { Tag } from "@/content/types";

/** Etiqueta visible «Academia» / «Autoescuela» (RF-18). */
export function TagPill({ tag }: { tag: Tag }) {
  return (
    <span className="inline-block rounded-full bg-ink px-3 py-0.5 text-xs font-semibold text-background">{tag}</span>
  );
}
