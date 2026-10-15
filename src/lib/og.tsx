import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

// Logotipo gris 3D incrustado (se genera al compilar, sin peticiones externas; v1.3).
const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "src/assets/logo-3d-og.png")).toString("base64")}`;

/** Imagen para redes: fondo casi negro y logotipo gris 3D (RF-21, RF-42). */
export function renderOgImage(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000000",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={112} height={120} alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 28, color: "#a1a1a6" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 96, height: 12, borderRadius: 6, background: "#0d4964" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1a6" }}>localdigital.es</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
