"use client";

import { useEffect, useState, type ComponentType } from "react";
import { HeroStill } from "@/components/illustrations/HeroStill";

function canUse3D(): boolean {
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * La imagen fija va siempre en el HTML (sin JS, móvil, reducir movimiento, sin WebGL).
 * Solo si se cumplen todas las condiciones se descarga la escena 3D y se superpone (RF-29, RF-33, D-07).
 */
export function Hero3DSlot() {
  const [Scene, setScene] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!canUse3D()) return;
    let cancelled = false;
    import("./Hero3DScene").then((module) => {
      if (!cancelled) setScene(() => module.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <HeroStill />
      {Scene && (
        <div aria-hidden="true" className="absolute inset-0 bg-surface">
          <Scene />
        </div>
      )}
    </div>
  );
}
