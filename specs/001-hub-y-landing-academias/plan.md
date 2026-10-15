# Plan técnico — Spec 001 · HUB y landing de academias

> Estado: aprobado · Fecha: 2026-10-14 · cambio v1.1 (§9) aprobado el 2026-10-15 · cambio v1.2 (§10) aprobado el 2026-10-15 · cambio v1.3 (§11) aprobado el 2026-10-15 · cambio v1.4 (§12) aprobado el 2026-10-15 · cambio v1.5 (§13) aprobado el 2026-10-15 · cambio v1.6 (§14) aprobado el 2026-10-15 · cambio v1.7 (§15) aprobado el 2026-10-15 · cambio v1.8 (§16) aprobado el 2026-10-15
> Basado en: `docs/constitution.md` v1.0 y `specs/001-hub-y-landing-academias/spec.md` (aprobada).
> Solo firmas e interfaces; nada de implementación.

## 1. Visión general

Web **100 % estática** generada con Next.js 16 (App Router) mediante exportación estática a la carpeta `out/`, publicada en Netlify. El contenido vive en archivos TypeScript tipados; las secciones son componentes sin texto fijo; las páginas solo componen. Las cabeceras de seguridad (incluida una CSP con *hashes*) se generan tras la compilación en `out/_headers`, que Netlify aplica.

```
contenido (src/content)  ──►  secciones (src/components/sections)  ──►  páginas (src/app)
        ▲                                                                   │
datos comunes (src/content/site.ts) ── validados al compilar ───────────────┘
                                                                    next build (export) → out/
                                                       scripts/postbuild → out/_headers (CSP con hashes)
```

## 2. Módulos y responsabilidades

### 2.1 Contenido — `src/content/`

| Archivo | Responsabilidad | RF |
|---|---|---|
| `types.ts` | Tipos de datos comunes, de cada sección y de página. | RNF-07 |
| `site.ts` | **Datos comunes únicos**: precios, condiciones, garantía, contacto, URL de reservas, número del asistente de ejemplo (opcional), plazas del piloto, datos de la titular, paleta. | RF-03, RF-04, RF-06, RF-20, RF-28, RNF-07 |
| `validate.ts` | Valida `site.ts`; lanza error con el nombre del dato si falta algo obligatorio. | RF-35, RF-20 |
| `hub.ts` | Contenido del HUB (de `contenido/hub.md`), con referencias a `site.ts`. | RF-08, RF-10, RF-11, RF-14 |
| `academias.ts` | Contenido de `/academias` (de `contenido/academias.md`). | RF-08, RF-15–RF-18 |
| `legal.ts` | Contenido de las tres páginas legales, con datos de la titular y plazos. | RF-20 |
| `seo.ts` | Título, descripción y datos estructurados por página. | RF-21, RF-23 |

### 2.2 Lógica pura — `src/lib/`

| Archivo | Responsabilidad | RF |
|---|---|---|
| `format.ts` | Formato de precios en `es-ES` («375 €», «75 €/mes»). | RF-03 |
| `pilot.ts` | Decide si el piloto se muestra según las plazas libres. | RF-04, RF-05 |
| `links.ts` | Construye el enlace de WhatsApp y los atributos de enlace externo. | RF-02, RF-27, RF-34 |

### 2.3 Componentes — `src/components/`

- **`layout/`**: `NavFull` (HUB; menú plegable sin JS), `NavMinimal` (academias), `Footer`, `CtaButton` (única llamada a la acción), `ExternalLink`, `SkipLink`.
- **`sections/`** (sin texto fijo, reciben props): `Hero`, `Problem`, `Features`, `Complements`, `Steps`, `Pricing`, `Guarantee`, `Pilot`, `Sectors`, `About`, `DataPrivacy`, `Faq`, `ChatDemo`, `Closing`.
- **`illustrations/`**: ilustraciones planas en SVG con la paleta A (equipo, imagen fija del 3D). RF-36.
- **`three/`**: `Hero3DSlot` (cliente; muestra la imagen fija y decide si carga el 3D) y `Hero3DScene` (escena 3D, cargada bajo demanda). RF-29, RF-33.

### 2.4 Rutas — `src/app/`

| Ruta / archivo | Contenido | RF |
|---|---|---|
| `layout.tsx` | `<html lang="es">`, fuentes autoalojadas, metadatos base. Sin GTM, banner de cookies ni botón flotante. | RF-25, RF-26 |
| `page.tsx` (`/`) | Compone el HUB + JSON-LD. | RF-10–RF-14, RF-23 |
| `academias/page.tsx` | Compone la landing. | RF-15–RF-19 |
| `aviso-legal/`, `politica-de-privacidad/`, `politica-de-cookies/` | Páginas legales desde `legal.ts`. | RF-20 |
| `not-found.tsx` | Página de error con enlace al HUB (genera `404.html`). | RF-09, RF-32 |
| `opengraph-image.tsx` (raíz y `academias/`) | Imagen para redes 1200×630 generada al compilar con la paleta A. | RF-21, RF-36 |
| `sitemap.ts`, `robots.ts` | Mapa del sitio con las 5 direcciones y archivo de rastreadores. | RF-22 |
| `llms.txt/route.ts` | `llms.txt` estático generado desde `site.ts` y `hub.ts`. | RF-24 |

**Se eliminan:** `app/api/contact/`, `app/portfolio/`, `components/CookieBanner.tsx`, `components/WhatsAppFloating.tsx`, el resto de componentes antiguos, `public/llms.txt` y las imágenes no usadas.

### 2.5 Compilación, servidor de pruebas y CI

| Archivo | Responsabilidad | RF |
|---|---|---|
| `next.config.ts` | `output: "export"`, `images.unoptimized: true`, `trailingSlash: false`, `reactCompiler: true`. | RNF-05 |
| `scripts/postbuild-headers.mjs` | Recorre `out/**/*.html`, calcula el SHA-256 de cada `<script>` en línea y escribe `out/_headers` con todas las cabeceras de seguridad. | RNF-06 |
| `scripts/serve-out.mjs` | Servidor estático mínimo (Node `http`, sin dependencias) que sirve `out/`, aplica `out/_headers` y devuelve `404.html` con código 404. Imita a Netlify para los tests. | RNF-06, RF-09, RF-32 |
| `netlify.toml` | Comando `npm run build`, carpeta `out`, `NODE_VERSION = "22"`. | Constitución §5 |
| `.github/workflows/ci.yml` | `npm ci` → `npm audit --omit=dev --audit-level=high` (bloquea) → `npm audit` completo (informa, no bloquea) → `npm test`. | Constitución §3, §6 (v1.1) |
| `playwright.config.ts` | Proyectos `desktop-chrome` (1280 px) y `mobile` (375 px); `webServer` = `serve-out.mjs`. | Tests |
| `lighthouserc.json` | Auditoría de `/` y `/academias` en móvil y escritorio; mínimo 0,9 en las 4 categorías; 3 ejecuciones (mediana). | RNF-01 |

## 3. Modelo de datos (interfaces)

```ts
// src/content/types.ts
export type Euros = number;

export interface Prices {
  assistantSetup: Euros;      // 375
  assistantMonthly: Euros;    // 75
  web: Euros;                 // 449
  mapsStandalone: Euros;      // 99
  pilotSetup: Euros;          // 190
}

export interface Conditions {
  vat: string;                // "IVA no incluido"
  commitment: string;         // "Sin permanencia"
  guarantee: string;          // "Si en los primeros 60 días no te convence, te devolvemos la instalación."
  installDays: number;        // 5 (laborables)
  updateHours: number;        // 24 (laborables)
}

export interface Owner {      // titular: Beatriz, autónoma
  fullName: string;
  nif: string;
  address: string;
  email: string;
}

export interface SiteData {
  name: string;
  url: string;                          // https://www.localdigital.es
  bookingUrl: string;                   // obligatorio (RF-35)
  demoWhatsapp?: string;                // opcional (RF-02, RF-34)
  phone: string;                        // +34 603 03 80 50
  email: string;                        // localdigital.es@gmail.com
  prices: Prices;
  conditions: Conditions;
  pilot: { total: number; remaining: number };   // 3 / 3
  owner: Owner;
  retention: { leadsMonths: number; mercantileYears: number; fiscalYears: number }; // 12 / 6 / 4
  activeSectors: ReadonlyArray<{ slug: "academias"; title: string; summary: string }>;
}

export type Section =
  | { kind: "hero"; id: string; eyebrow: string; title: string; subtitle: string; ctaNote: string; demoLinkText?: string; visual: "3d" | "illustration" }
  | { kind: "problem"; id: string; title: string; scenes: Scene[]; closing: string }
  | { kind: "features"; id: string; eyebrow?: string; title: string; intro: string; items: Item[]; control?: string }
  | { kind: "complements"; id: string; title: string; intro: string; items: Item[] }
  | { kind: "steps"; id: string; title: string; steps: Item[] }
  | { kind: "pricing"; id: string; title: string; variant: "hub" | "sector" }
  | { kind: "guarantee"; id: string; title: string; points: Item[] }
  | { kind: "pilot"; id: string; eyebrow: string; title: string; body: string; asks: string[] }
  | { kind: "sectors"; id: string }
  | { kind: "about"; id: string; title: string; body: string[]; commitments?: Item[] }
  | { kind: "privacy"; id: string; title: string; points: string[] }
  | { kind: "faq"; id: string; title: string; items: { q: string; a: string }[] }
  | { kind: "chatDemo"; id: string; title: string; intro: string; chats: Chat[] }
  | { kind: "closing"; id: string; title: string; body: string };

export interface Scene { title: string; body: string; tag?: "Academia" | "Autoescuela" }
export interface Item  { title: string; body: string; tag?: "Academia" | "Autoescuela" }
export interface Chat  { tag: "Academia" | "Autoescuela"; messages: { from: "alumno" | "asistente"; time?: string; text: string }[] }

export interface PageContent {
  slug: "" | "academias";
  nav: "full" | "minimal";
  seo: { title: string; description: string };
  sections: Section[];
}
```

```ts
// src/content/validate.ts
export class SiteDataError extends Error { readonly field: string }
export function validateSiteData(data: SiteData): void;   // lanza SiteDataError (p. ej. field = "bookingUrl", mensaje «Falta la URL de reservas»)

// src/lib/pilot.ts
export function isPilotVisible(pilot: SiteData["pilot"]): boolean;           // remaining > 0
export function withoutPilot(sections: Section[], visible: boolean): Section[]; // quita bloque y FAQ del piloto

// src/lib/format.ts
export function formatEuros(value: Euros): string;              // "375 €"
export function formatMonthly(value: Euros): string;            // "75 €/mes"

// src/lib/links.ts
export function whatsappUrl(phoneE164: string, text?: string): string;
export const externalLinkProps: { target: "_blank"; rel: "noopener noreferrer" };

// src/components/three/Hero3DSlot.tsx  ("use client")
export function Hero3DSlot(props: { fallbackAlt: string }): JSX.Element;
// Renderiza siempre la imagen fija en HTML. Tras montar, solo si
// matchMedia("(min-width: 768px)") && !matchMedia("(prefers-reduced-motion: reduce)") && WebGL disponible,
// importa dinámicamente Hero3DScene y lo superpone.

// src/components/three/Hero3DScene.tsx
export default function Hero3DScene(): JSX.Element;   // marca globalThis.__LD_3D_LOADED__ = true al evaluarse (para tests)
```

## 4. Decisiones técnicas (con motivo)

| # | Decisión | Motivo | Respeta |
|---|---|---|---|
| D-01 | Exportación estática (`output: "export"`). | Sin servidor, rápida y barata; encaja con Netlify gratis. | Const. §5, RNF-05 |
| D-02 | Preguntas frecuentes y menú móvil con `<details>/<summary>` nativos. | Funcionan sin JavaScript y con teclado, y anuncian su estado a lectores de pantalla sin código extra. | RF-07, RF-13, RNF-02, RNF-04 |
| D-03 | Animaciones solo con CSS y todas bajo `@media (prefers-reduced-motion: no-preference)`. | Sin `framer-motion`; cumple reducir movimiento por defecto. | Const. §2, RF-30 |
| D-04 | Fuentes con `next/font/google` (se descargan al compilar y se sirven desde el propio dominio). Titulares serif cálida + texto sans. | Cero peticiones a Google en tiempo de visita. | RF-26, Const. §8 |
| D-05 | Ilustraciones en SVG (en línea o en `public/`). | Pesan poco, escalan sin perder calidad y no necesitan optimizador. | RF-36, RNF-01 |
| D-06 | 3D con `three` + `@react-three/fiber`, **sin `drei`**, geometría hecha con primitivas (sin archivos de modelo). | Menos peso y una dependencia menos; no hace falta cargador de modelos. | Const. §2, RF-29 |
| D-07 | El 3D se importa dinámicamente solo si se cumplen ancho, movimiento y WebGL; la imagen fija va siempre en el HTML. | En móvil no se descarga nada del 3D; sin JS se ve la imagen; el LCP es el titular o la imagen, nunca el lienzo 3D. | RF-29, RF-33, RNF-01 |
| D-08 | CSP con **hashes SHA-256** de los scripts en línea, calculados tras compilar. `script-src 'self' 'sha256-…'`; `style-src 'self' 'unsafe-inline'`; `img-src 'self' data:`; `font-src 'self'`; `connect-src 'self'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'none'`. | Next.js inyecta scripts en línea para hidratar; con hashes se mantiene la CSP estricta sin `'unsafe-inline'` en scripts. Los estilos en línea (atributos `style`) no ejecutan código y son de propio dominio. | Const. §6, RNF-06 |
| D-09 | `llms.txt` y la imagen para redes se generan desde los datos al compilar. | Una sola fuente: si cambia un precio o el titular, se actualizan solos. | RF-21, RF-24, RNF-07 |
| D-10 | Validación de `site.ts` en tiempo de compilación (`validateSiteData` en `layout.tsx`). | Impide publicar sin URL de reservas o sin datos de la titular. | RF-35, RF-20 |
| D-11 | Servidor de pruebas propio (`serve-out.mjs`) que aplica `_headers` y el 404. | Prueba las cabeceras y el 404 tal como los servirá Netlify, sin añadir dependencias. | RNF-06, RF-09 |
| D-12 | Anclas antiguas: las secciones nuevas usan los `id` `servicios`, `proceso`, `sobre-nosotros`, `faq` donde corresponda; `casos-de-exito` no existe y el navegador se queda en la portada. | Cumple CL-07 sin JavaScript ni redirecciones. | CL-07 |
| D-13 | `scroll-margin-top` en secciones y `scroll-behavior: smooth` solo sin reducir movimiento. | El menú fijo no tapa el título de la sección destino. | RF-12, RF-30 |
| D-14 | Netlify con `NODE_VERSION = "22"` (LTS). | Next 16 requiere Node ≥ 20.9; en local hay Node 24, compatible. | Const. §5 |
| D-15 | Uso de la paleta según contraste calculado: texto `#1F2A24` sobre crema (≈ 14:1) para todo el texto; botón con texto blanco sobre terracota `#C2562F` (≈ 4,5:1, justo en el límite AA) en tamaño ≥ 16 px y negrita; verde salvia `#5E7D63` (≈ 4,3:1 sobre crema) **solo** en elementos decorativos o texto grande (≥ 24 px), nunca en texto normal. | Cumplir WCAG AA sin cambiar la paleta aprobada. | RF-28, RNF-02 |
| D-16 | Lighthouse arranca el mismo `serve-out.mjs` (con cabeceras) en lugar de su servidor estático interno. | La auditoría de «Buenas prácticas» ve las cabeceras reales. | RNF-01, RNF-06 |

**Dependencias resultantes** (todas dentro de la constitución):

- Producción: `next`, `react`, `react-dom`, `lucide-react`, `three`, `@react-three/fiber`.
- Desarrollo: `typescript`, `@types/*`, `eslint`, `eslint-config-next`, `tailwindcss`, `@tailwindcss/postcss`, `babel-plugin-react-compiler`, **`@playwright/test`**, **`@lhci/cli`**.
- Se eliminan: `framer-motion`, `resend`, `@next/third-parties`.
- **Novedad respecto a la constitución:** no se usa `@react-three/drei` (permitida pero innecesaria).

## 5. Estrategia de tests

**Comandos** (`package.json`):

| Script | Hace |
|---|---|
| `npm run build` | `next build` + `node scripts/postbuild-headers.mjs` |
| `npm run test:e2e` | `playwright test` (sirve `out/` con `serve-out.mjs`) |
| `npm run test:perf` | `lhci autorun` (móvil y escritorio) |
| `npm test` | `npm run build && npm run test:e2e && npm run test:perf` |

**Archivos de test** (`tests/`):

| Archivo | Cubre |
|---|---|
| `data.spec.ts` | `validateSiteData`, `isPilotVisible`, `withoutPilot`, `formatEuros` (importa módulos de `src`, sin navegador) — RF-03, RF-04, RF-05, RF-34, RF-35 |
| `common.spec.ts` | Botón único, enlace de prueba, precios iguales, plazas, pie, FAQ, textos sin `{nota`, tono — RF-01–RF-08, RNF-08 |
| `hub.spec.ts` | Orden de secciones, menú, anclas, menú móvil, sectores — RF-10–RF-14, CL-07 |
| `academias.spec.ts` | Orden, menú reducido, chats «Ejemplo», etiquetas, pie — RF-15–RF-19 |
| `legal.spec.ts` | Contenido legal obligatorio y ausencia de restos — RF-20 |
| `seo.spec.ts` | Metadatos, imagen para redes, sitemap, robots, JSON-LD, `llms.txt` — RF-21–RF-24 |
| `privacy.spec.ts` | Sin cookies ni almacenamiento, sin peticiones externas, enlaces externos — RF-25–RF-27 |
| `design.spec.ts` | Paleta, ilustraciones, reducir movimiento, 3D y su alternativa — RF-28–RF-30, RF-33, RF-36 |
| `legacy.spec.ts` | Sin cifras ni casos antiguos, `/portfolio` 404, ruta inexistente — RF-09, RF-31, RF-32, CL-08, CL-09 |
| `quality.spec.ts` | Accesibilidad (árbol accesible, foco, contraste vía auditoría), adaptable 320–1920 px, sin JS, cabeceras — RNF-02–RNF-04, RNF-06, CL-01–CL-03, CL-10 |
| `lighthouserc.json` | Puntuaciones ≥ 0,9 — RNF-01 |

**Variantes de datos en tests:** `data.spec.ts` prueba las funciones con datos de ejemplo (plazas 0, URL vacía, número opcional ausente) sin recompilar. Los tests de navegador usan los datos reales de `site.ts`.

## 6. Trazabilidad RF → módulo → test

| RF | Dónde se implementa | Test |
|---|---|---|
| RF-01 | `CtaButton`, `site.bookingUrl` | common |
| RF-02 | `Hero`, `ChatDemo`, `links.ts` | common, data |
| RF-03 | `site.ts`, `format.ts`, `Pricing`, `Guarantee`, `Faq` | data, common |
| RF-04 | `site.pilot`, `Pilot` | data, common |
| RF-05 | `pilot.ts` | data |
| RF-06 | `Footer` | common |
| RF-07 | `Faq` (`<details>`) | common |
| RF-08 | `hub.ts`, `academias.ts` | common |
| RF-09 | `not-found.tsx`, `serve-out.mjs` | legacy |
| RF-10 | `app/page.tsx` | hub |
| RF-11 | `NavFull` | hub |
| RF-12 | `id` de secciones, CSS | hub |
| RF-13 | `NavFull` (`<details>`) | hub |
| RF-14 | `Sectors`, `site.activeSectors` | hub |
| RF-15 | `app/academias/page.tsx` | academias |
| RF-16 | `NavMinimal` | academias |
| RF-17 | `ChatDemo` | academias |
| RF-18 | `academias.ts`, `ChatDemo`, CSS | academias |
| RF-19 | `Footer` (variante sector) | academias |
| RF-20 | `legal.ts`, páginas legales, `validate.ts` | legal, data |
| RF-21 | `seo.ts`, `opengraph-image.tsx` | seo |
| RF-22 | `sitemap.ts`, `robots.ts` | seo |
| RF-23 | JSON-LD en `app/page.tsx` | seo |
| RF-24 | `llms.txt/route.ts` | seo |
| RF-25 | `layout.tsx` (sin GTM ni banner) | privacy |
| RF-26 | `next/font`, sin recursos externos | privacy |
| RF-27 | `ExternalLink`, `links.ts` | privacy |
| RF-28 | `globals.css` (variables de la paleta) | design |
| RF-29 | `Hero3DSlot`, `Hero3DScene` | design, Lighthouse |
| RF-30 | `globals.css` (`prefers-reduced-motion`) | design |
| RF-31 | Eliminación de contenido antiguo | legacy |
| RF-32 | Eliminación de `app/portfolio`, `404.html` | legacy |
| RF-33 | `Hero3DSlot` | design |
| RF-34 | `links.ts`, `Hero`, `ChatDemo` | data, common |
| RF-35 | `validate.ts`, `layout.tsx` | data |
| RF-36 | `illustrations/`, `opengraph-image.tsx` | design |
| RNF-01 | Todo; `lighthouserc.json` | test:perf |
| RNF-02–04 | Componentes semánticos, CSS | quality |
| RNF-05 | `next.config.ts` | build (exporta `out/`) |
| RNF-06 | `postbuild-headers.mjs` | quality |
| RNF-07 | `site.ts` | data, common |
| RNF-08 | Contenido | common |
| RNF-09, RNF-10 | Arquitectura (sin entradas ni datos) | privacy (sin formularios ni peticiones) |

## 7. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| **Falta la URL de Calendly** (P-01). | La compilación falla por diseño (RF-35) y bloquea los tests de navegador. | Pedirla antes de la primera tarea que compile la web. |
| **Faltan los datos de la titular** (P-07). | La compilación falla (RF-20). | Igual: pedirlos antes de esa tarea. |
| El 3D baja la puntuación de escritorio por debajo de 90. | Incumple RNF-01. | Carga diferida, geometría simple, sin `drei`; si aun así falla, se propone cambio de spec (p. ej. 3D solo tras interacción). |
| La CSP con hashes rompe la hidratación si cambia la forma en que Next inyecta scripts. | Página sin interactividad (el contenido sigue visible). | Test de cabeceras + test de que el menú, FAQ y 3D funcionan con la CSP aplicada por `serve-out.mjs`. |
| `next/og` (imagen para redes) en exportación estática. | La imagen podría no generarse. | Test RF-21 comprueba que existe y mide 1200×630; alternativa: SVG convertido a PNG en `public/`. |
| El terracota del botón queda justo en 4,5:1 con texto blanco. | Un redondeo o un fondo distinto puede fallar AA. | D-15; si la auditoría falla, se propone cambio de spec para oscurecer ligeramente el terracota (p. ej. `#B34E2A`). |
| Lighthouse varía entre ejecuciones. | Fallos intermitentes. | Mediana de 3 ejecuciones. |
| Cambio de DNS a Netlify. | Minutos u horas sin web. | Fuera de alcance de código; documentar pasos y hacerlo en horario de poco tráfico. |
| Plan gratuito de Netlify (límites mensuales). | Si se superan, la web podría pausarse. | Revisar uso; cualquier pago, con aprobación (Const. §9). |

## 8. Cambio en la spec (aprobado y aplicado el 2026-10-14)

- **CL-01** dice que, sin JavaScript, «las preguntas frecuentes se muestran desplegadas». Con `<details>` nativo (D-02) se muestran **plegadas pero se pueden abrir sin JavaScript**, lo que es más usable y cumple RF-07 y RNF-04.
  - **Antes:** «Visitante con JavaScript desactivado → se cumple RNF-04; las preguntas frecuentes se muestran desplegadas.»
  - **Después:** «Visitante con JavaScript desactivado → se cumple RNF-04; las preguntas frecuentes y el menú móvil se abren y cierran igualmente.»

## 9. Cambio v1.1 · patrones de apple.com/services (aprobado)

### 9.1 Cambios en el modelo de datos

```ts
// src/content/types.ts
export interface ServiceBlock {
  icon: "chat" | "web" | "map";          // iconos de lucide-react ya instalada
  name: string;
  title: string;
  price: string;                          // generado desde site.ts, sin la llamada a nota
  link: { label: string; href: string };  // ancla interna (#servicios, #precios)
}

export interface Footnote { id: 1 | 2; text: string }

// Nuevas secciones y cambios en el union Section:
//  + { kind: "services"; id: string; title: string; intro: string; blocks: ServiceBlock[] }   // sustituye a "complements" en el HUB
//  + { kind: "marquee"; id: string; label: string; questions: string[] }
//  ~ pricing: plans[].lines pasan a { text: string; note?: 1 }[] ; footnote/guarantee → notes: Footnote[] y guaranteeLabel?: string
//  ~ hero: title se pinta partido por frases (sin cambiar el tipo)
```

### 9.2 Componentes

| Componente | Responsabilidad | RF |
|---|---|---|
| `Hero` (cambio) | Parte `title` por frases (`/(?<=\.)\s+/`) y pinta cada una en un `<span class="block">` dentro del mismo `h1`; tamaños `text-4xl` (36 px) / `md:text-6xl` (60 px). | RF-37 |
| `Services` (nuevo) | Tres bloques con plantilla idéntica; sin `CtaButton`; enlaces de texto internos. | RF-38, RF-41 |
| `QuestionMarquee` (nuevo) | Lista visible (accesible) + copia `aria-hidden` para el bucle; animación CSS `translateX` solo bajo `prefers-reduced-motion: no-preference`; control de pausa = `<input type="checkbox">` + `<label>` (funciona sin JS) que pone `animation-play-state: paused` vía `:has(:checked)`; pausa también con `:hover` y `:focus-within`. Con reducir movimiento: lista estática en varias líneas y control oculto. | RF-39, RF-40, CL-11, CL-12 |
| `NoteRef` (nuevo) | `<sup><a href="#nota-N" aria-label="Nota N">N</a></sup>` reutilizable. | RF-41 |
| `Pricing` (cambio) | Pinta las llamadas a nota en las líneas y la lista de notas `<ol>` con `id="nota-1"`/`"nota-2"` al final de la sección. | RF-41, RF-03 |

`Complements` se elimina (sin uso tras el cambio).

### 9.3 Decisiones técnicas

| # | Decisión | Motivo | Respeta |
|---|---|---|---|
| D-17 | Cinta solo con CSS (sin librería de carrusel). | Cero dependencias nuevas y cero JavaScript extra; no afecta a la nota de rendimiento. | Const. §2, RNF-01 |
| D-18 | Pausa con casilla nativa + selector `:has()`. | Funciona sin JavaScript y con teclado (Espacio); cumple WCAG 2.2.2 (pausar movimiento > 5 s). | RF-39, RNF-02, RNF-04 |
| D-19 | Copia duplicada de la cinta con `aria-hidden="true"` e `inert`. | Bucle visual continuo sin que el lector de pantalla repita las preguntas ni el foco entre en la copia. | CL-11 |
| D-20 | Notas al pie locales a la sección de precios de cada página. | Las condiciones siguen dentro de «precios» (no se pierden los textos que exige RF-03) y los enlaces de los bloques de servicios saltan a ellas. | RF-03, RF-41 |
| D-21 | Iconos de los servicios con `lucide-react` (ya instalada). | Sin dependencias ni imágenes nuevas. | Const. §2 |

### 9.4 Tests

| Archivo | Cubre |
|---|---|
| `hub.data.spec.ts` (ampliado) | Nuevo orden de secciones (RF-10), textos de `services` y `marquee`, sin precios a mano. |
| `hub.spec.ts` (ampliado) | RF-37 (líneas y tamaño), RF-38 (3 bloques, sin botones), RF-41 (llamadas y notas). |
| `marquee.spec.ts` (nuevo) | RF-39 (animación, pausa con clic/teclado/puntero, sin JS), RF-40 (reducir movimiento), CL-11. |
| `academias.spec.ts` (ampliado) | RF-37 y RF-41 en `/academias`. |
| Lighthouse | Sin regresión (≥ 90 en las 4 categorías, móvil y escritorio). |

**Tests existentes que cambian** (por cambio de requisito, no para hacerlos pasar): la prueba de orden de secciones de `hub.data.spec.ts` (RF-10) y la de «complementos» de `hub.spec.ts`, que pasa a probar «servicios».

### 9.5 Riesgos

| Riesgo | Mitigación |
|---|---|
| La animación continua consume CPU en móviles modestos. | Solo `transform` (lo acelera la GPU), velocidad lenta, pausa automática con reducir movimiento. |
| `:has()` no existe en navegadores antiguos. | Soportado en todos los navegadores actuales; si no, la cinta sigue moviéndose y se pausa con el puntero/foco. |
| Titular a 60 px desplaza el contenido en escritorio y empeora el LCP. | Lighthouse en la batería; si baja de 90 se ajusta el tamaño. |

## 10. Cambio v1.2 · estilo profesional inspirado en apple.com/careers (aprobado)

### 10.1 Medidas tomadas de apple.com/careers (navegador integrado, 1440 px)

| Elemento | Apple | Nuestra adaptación |
|---|---|---|
| Fuente | SF Pro Display / SF Pro Text (licencia restringida a plataformas Apple) | **Inter** con eje óptico (`opsz`): ya instalada vía `next/font`, autoalojada |
| Frase de impacto | 84 px · 600 · interlineado 1,0 | `h1` portada 72 px (40 px móvil) · 600 · `-0.03em`, portada en una columna centrada para que cada frase quepa en su línea (ajuste de T-34) |
| Titular de sección | 48 px · 600 · `-1.2px` | `h2` 48 px (32 px móvil) · 600 · `-0.02em` |
| Subtítulo | 21 px · 600 | `h3` 21 px · 600 |
| Texto | 17 px / 25 px · `-0.374px` | 17 px / 1,47 · `-0.01em` |
| Colores | `#000`, `#161617`, `#1D1D1F`, `#F5F5F7`, `#86868B` | Igual, pero gris secundario `#6E6E73` (claro) / `#A1A1A6` (oscuro): `#86868B` solo da 3,6:1 sobre blanco |
| Botón | píldora, 20 px, `10px 25px` | Píldora azul `#0D4964`, texto blanco (9,75:1), borde `rgba(255,255,255,.35)` |

### 10.2 Contrastes calculados (WCAG)

`#1D1D1F`/blanco 16,8 · `#1D1D1F`/`#F5F5F7` 15,5 · `#6E6E73`/blanco 5,1 · `#6E6E73`/`#F5F5F7` 4,7 · `#F5F5F7`/`#161617` 16,6 · `#A1A1A6`/`#161617` 7,0 · blanco/`#0D4964` 9,75 · azul/`#161617` 1,86 (por eso el borde claro del botón, CL-13).

### 10.3 Cambios técnicos

| Módulo | Cambio | RF |
|---|---|---|
| `globals.css` | Nuevos tokens `--ld-*` (fondos, texto, secundario, marca); escala tipográfica en `h1`–`h3` y `body`; utilidad `section-dark` que fija fondo `#161617` y colores de texto claros. Se eliminan crema, terracota y salvia. | RF-28, RF-43, RF-44 |
| `layout.tsx` | Solo Inter (`axes: ["opsz"]`); se elimina Fraunces (una fuente menos que descargar). | RF-43, RF-26 |
| `components/brand/Logo.tsx` (nuevo) | `<img>` del logotipo (`/logo-azul.png` o `/logo-blanco.png`) + texto; prop `tone: "light" \| "dark"`. | RF-42 |
| `NavFull`, `NavMinimal`, `Footer` | Usan `Logo` (cabecera blanca translúcida → logo azul). | RF-42 |
| `app/icon.png` | Sustituido por el logotipo azul a 64 px. | RF-42 |
| `lib/og.tsx` | Fondo `#161617`, logotipo blanco, Inter. | RF-42, RF-21 |
| Secciones | Cada sección recibe su fondo de una tabla por página (`tone: "dark" \| "white" \| "gray"`) calculada en `SectionRenderer` según RF-44, en lugar de clases fijas en cada componente. | RF-44 |
| `CtaButton` | Fondo azul, texto blanco, borde claro sutil. | RF-28, CL-13 |
| `HeroStill`, `TeamIllustration`, `Hero3DScene` | Nuevos colores: azul, grises y blanco. | RF-29, RF-36 |
| `TagPill`, `NoteRef`, `ChatDemo` | Colores neutros/azul. | RF-28 |

**Decisiones:**

| # | Decisión | Motivo | Respeta |
|---|---|---|---|
| D-22 | Inter en lugar de SF Pro. | SF Pro no se puede usar en webs ajenas a Apple; Inter es libre y su diseño es el más cercano. | Const. §2, §8 |
| D-23 | Fondo de sección decidido por `SectionRenderer` (alternancia automática). | Añadir o quitar secciones no rompe la alternancia ni obliga a tocar componentes. | RF-44 |
| D-24 | Logo provisional PNG transparente hasta tener el SVG (P-13). | Permite avanzar; sustituirlo será cambiar un archivo. | RF-42 |
| D-25 | Mismo estilo de botón en todas partes, con borde claro sutil. | Mantiene RF-01 (un único estilo) y se distingue también sobre fondo oscuro. | RF-01, CL-13 |

### 10.4 Tests

| Archivo | Cambio |
|---|---|
| `design.spec.ts` | RF-28 pasa a comprobar la paleta v1.2; la prueba de tipografía (RF-26) pasa de «Fraunces + Inter» a «solo Inter, autoalojada». *(Cambian por requisito.)* |
| `style.spec.ts` (nuevo) | RF-42 (logo en cabecera, favicon), RF-43 (escala), RF-44 (fondos por sección), CL-13. |
| Lighthouse | Accesibilidad (contrastes) y rendimiento sin regresión. |

### 10.5 Riesgos

| Riesgo | Mitigación |
|---|---|
| Logo PNG con bordes imperfectos al quitar el blanco. | P-13: sustituir por el SVG en cuanto llegue. |
| Títulos de 80 px desplazan el contenido y alteran el LCP. | Lighthouse en la batería; ajustar a 72 px si baja de 90. |
| Algún texto con color fijo pensado para fondo claro queda en una sección oscura. | Auditoría de accesibilidad de Lighthouse + test de contraste en RF-28. |

## 11. Cambio v1.3 · logo gris 3D (aprobado)

**Origen:** `C:\Users\cuba_\Downloads\logo-local-digital-svg.svg` (2,5 MB). Contiene dos imágenes de 2048×2086 px: una máscara de luminancia (la forma) y la caracola gris con relieve. Al combinarlas se obtiene el logo con fondo transparente. El archivo original **no se publica**: pesaría 2,5 MB en cada página.

| Archivo publicado | Contenido | Tamaño objetivo |
|---|---|---|
| `public/brand/logo-3d.webp` | Logo gris 3D, 112 px de alto (2× para pantallas retina de 56 px) | ≤ 30 KB |
| `src/assets/logo-3d-og.png` (no se publica) | PNG para generar la imagen de redes al compilar (el generador de Next.js trabaja de forma fiable con PNG) | — (no se sirve) |
| `src/app/icon.png` | Favicon 64×64 | ≤ 10 KB |
| Se eliminan | `logo-azul.png`, `logo-blanco.png` | — |

**Cambios técnicos:**

| Módulo | Cambio | RF |
|---|---|---|
| `scripts/` (nada nuevo) | La extracción se hace una vez y se versionan los archivos resultantes; no se añade dependencia. | Const. §2 |
| `components/brand/Logo.tsx` | Una sola imagen (`logo-3d.webp`) para cualquier fondo; se elimina la prop `tone`. | RF-42 |
| `lib/og.tsx` | Usa `logo-3d.png` sobre fondo `#161617`. | RF-42, RF-21 |
| `tests/style.spec.ts` | La prueba del logo pasa de «versión azul» a «logo 3D ≤ 30 KB»; la del favicon, de «píxeles azules» a «píxeles grises, sin azul de marca»; la de la imagen para redes, de «logo blanco» a «logo gris». *(Cambian por requisito.)* | RF-42 |

**Decisiones:**

| # | Decisión | Motivo |
|---|---|---|
| D-26 | Publicar derivados optimizados y no el SVG recibido. | El SVG no es vectorial y pesa 2,5 MB; no aporta nitidez frente a una imagen bien dimensionada. |
| D-27 | Misma imagen en fondo claro y oscuro. | El relieve gris con contorno blanco funciona en ambos (comparativa en `propuestas/comparativa-logos.png`). |

**Riesgos:**

| Riesgo | Mitigación |
|---|---|
| A 16–32 px el relieve se emborrona y el favicon se reconoce peor que el azul plano. | Recorte ajustado y redimensionado de alta calidad; revisión visual. Si no convence, volver al azul solo para el favicon (cambio de spec). |
| Más peso que el logo plano. | Límite de 30 KB por archivo con test; Lighthouse en la batería. |

## 12. Cambio v1.4 · negro puro de apple.com/services (aprobado)

**Origen:** captura de apple.com/services aportada por el usuario: cabecera y portada en negro puro, sin separación visible entre ambas.

**Contraste con `#000000`** (WCAG, mínimo AA 4,5:1): `#F5F5F7`/negro 19,3 · `#A1A1A6`/negro 8,1 · `#A1A1A6`/`#1D1D1F` 6,5 · azul `#0D4964`/negro 2,2 (el botón conserva su borde claro, CL-13; su texto blanco sobre azul sigue en 9,75).

**Cambios técnicos:**

| Módulo | Cambio | RF |
|---|---|---|
| `globals.css` | `--ld-dark: #000000`. Las tarjetas oscuras (`--tone-card` en `[data-tone="dark"]`) siguen en `#1D1D1F`. | RF-28, RF-44 |
| `lib/og.tsx` | Fondo `#000000`. | RF-42, RF-21 |
| `layout/NavFull.tsx`, `layout/NavMinimal.tsx` | La cabecera lleva `data-tone="dark"` y fondo `bg-surface` (el negro del tono oscuro); el borde inferior usa la línea oscura. El menú móvil desplegado hereda el tono. | RF-45 |
| `tests/design.spec.ts` | `--ld-dark` pasa a `#000000`; nuevo test de cabecera negra en las cuatro páginas, menú móvil abierto y tras desplazarse. *(Cambian por requisito.)* | RF-28, RF-45 |
| `tests/` de fondos y de imagen para redes | Esperan `rgb(0, 0, 0)` en lugar de `rgb(22, 22, 23)`. *(Cambian por requisito.)* | RF-44, RF-42 |

**Decisiones:**

| # | Decisión | Motivo |
|---|---|---|
| D-28 | Cabecera negra opaca, no translúcida. | Apple usa negro translúcido; opaco da el mismo aspecto sobre las secciones negras, no se vuelve gris sobre las blancas y el test es determinista. |
| D-29 | Reutilizar el tono `dark` existente en la cabecera en lugar de colores fijos. | Un solo sitio define el negro y sus textos; si cambia, cambia en todo. |

**Riesgos:**

| Riesgo | Mitigación |
|---|---|
| Negro puro junto a blanco puro resulta más duro en secciones largas. | Solo portada, problema (HUB) y cierre son negras; el resto sigue alternando blanco y gris. |
| Algún elemento de la cabecera con color pensado para fondo claro (borde del botón «Menú», subrayados). | Test de contraste de RF-45 y auditoría de accesibilidad de Lighthouse. |

## 13. Cambio v1.5 · botones de apple.com/services (aprobado)

**Origen:** capturas de apple.com/services aportadas por el usuario: «Try it free» (cápsula rellena), «Learn more» (cápsula de contorno o enlace «Learn more ›»), en fondos blanco, negro y sobre imagen.

**Colores por tono** (WCAG): blanco sobre `#1D1D1F` 16,8 · `#1D1D1F` sobre `#F5F5F7` 15,5 · relleno `#1D1D1F` sobre blanco 16,8 y sobre `#F5F5F7` 15,5 · relleno `#F5F5F7` sobre negro 19,3. Todos se distinguen sin borde.

**Cambios técnicos:**

| Módulo | Cambio | RF |
|---|---|---|
| `globals.css` | Nuevos tokens por tono `--tone-btn-bg` y `--tone-btn-fg` (claro: `#1D1D1F` / blanco; oscuro: `#F5F5F7` / `#1D1D1F`) y utilidades de Tailwind `bg-btn` y `text-on-btn`. Se retiran `--color-accent` del botón y `--color-on-accent`. | RF-46, RF-28 |
| `layout/CtaButton.tsx` | Cápsula `bg-btn text-on-btn`, sin borde, `min-h-11`, 17 px peso 500, relleno 11 × 22 px; contorno de foco del color del texto. | RF-01, RF-46, CL-13 |
| `layout/SecondaryButton.tsx` (nuevo) | Cápsula transparente con `border border-ink`; la usan los enlaces «prueba el asistente» de `Hero` y `ChatDemo`. | RF-46, RF-02 |
| `sections/Services.tsx`, `sections/Sectors.tsx` | Enlaces sin subrayado con « ›» añadido por CSS (`after:content`), subrayado en `hover` y `focus-visible`. El nombre accesible no incluye la flecha. | RF-46, RF-38 |
| `tests/design.spec.ts`, `tests/style.spec.ts` | El botón deja de esperar azul con borde claro y espera los colores por tono de RF-46. *(Cambian por requisito.)* | RF-28, CL-13 |

**Decisiones:**

| # | Decisión | Motivo |
|---|---|---|
| D-30 | Colores del botón como tokens del tono, no clases por sección. | El mismo componente se invierte solo en la cabecera y en las secciones negras; un único estilo (RF-01). |
| D-31 | El azul de marca se queda en iconos, ilustraciones y bordes destacados (precio principal, piloto). | La marca sigue presente sin competir con el botón, como el color de cada servicio en Apple. |
| D-32 | La flecha «›» se añade por CSS; la «→» final de los enlaces de servicios y de sectores sale del texto (el enlace «probar el asistente» la conserva). | Una sola flecha, igual en todos los enlaces, y los lectores de pantalla no la anuncian. |

**Riesgos:**

| Riesgo | Mitigación |
|---|---|
| Sin color de marca, el botón llama menos la atención. | Es el único relleno oscuro (o claro en negro) de cada pantalla; tamaño y posición se mantienen. Revisión visual. |
| Los enlaces sin subrayado se confunden con texto. | Solo en enlaces sueltos (no dentro de párrafos), con «›» y peso 600; subrayado al pasar el puntero o con el foco. Los enlaces del pie y de las notas siguen subrayados. |

## 14. Cambio v1.6 · menú sin botón de reserva (aprobado)

**Origen:** captura del usuario: el botón de la cabecera y el de la portada se ven a la vez. En apple.com el menú no lleva botones.

| Módulo | Cambio | RF |
|---|---|---|
| `layout/NavFull.tsx` | Se quita `CtaButton` y su envoltorio móvil (`peer-open`); quedan logo, enlaces y «Menú». | RF-11, RF-13 |
| `layout/NavMinimal.tsx` | Solo el logo. Afecta a `/academias`, páginas legales y 404. | RF-16 |
| `tests/hub.spec.ts`, `tests/academias.spec.ts` | Pasan de «hay botón en la cabecera» a «no hay botón en ninguna cabecera». *(Cambian por requisito.)* | RF-11, RF-16 |
| `tests/design.spec.ts`, `tests/style.spec.ts` | La comprobación de colores del botón se hace sobre los botones del contenido, no sobre el de la cabecera. *(Cambian por requisito.)* | RF-28, RF-46 |

**Decisión D-33:** las páginas legales y la 404 se quedan sin llamada a la acción: no son páginas de venta (RF-01 solo exige el botón en HUB y landings) y su salida es el logo, que lleva al inicio.

**Riesgo:** al bajar por la página no hay botón siempre visible. Mitigación: el botón aparece en portada, precios, piloto y cierre; el menú lleva a «Precios», donde está.

## 15. Cambio v1.7 · portada sin imagen y logo que vuelve arriba (aprobado)

**Origen:** el usuario considera que la imagen de la portada no aporta. Además, en la versión de prueba de Netlify, el logo del HUB no volvía arriba estando ya en `/` (la navegación interna de Next.js no cambia de página y conserva el desplazamiento).

| Módulo | Cambio | RF |
|---|---|---|
| `sections/Hero.tsx` | Sin columna de imagen; contenido centrado en una sola columna. | RF-47 |
| `content/types.ts`, `hub.ts`, `academias.ts` | Se elimina el campo `visual` de la portada. | RF-47 |
| `illustrations/HeroStill.tsx`, `three/*` | Se borran. | RF-47 |
| `package.json` | Se desinstalan `three`, `@react-three/fiber` y `@types/three`. | RF-47, Const. §2 |
| `layout/NavFull.tsx` | El logo es un enlace normal `<a href="/">` (recarga en el inicio) en lugar de `<Link>`. Ya aplicado con su test. | RNF-02 |
| `tests/three.spec.ts` | Se sustituye por las pruebas de RF-47. `design.spec.ts` deja de buscar la imagen fija. *(Cambian por requisito.)* | RF-47 |
| `postbuild-headers.mjs` / CSP | Sin cambios: no dependían del 3D. | — |

**Decisión D-34:** quitar también el 3D y sus dependencias, no solo ocultarlo: menos peso, menos código y menos superficie de seguridad.

**Riesgo:** portada más sobria, sin ningún elemento visual. Mitigación: es el patrón de apple.com/services (titular grande y botón); la cinta de preguntas, justo debajo, aporta el movimiento.

## 16. Cambio v1.8 · rediseño según la maqueta (aprobado)

**Origen:** maqueta aprobada por el usuario (https://claude.ai/artifact/7f21LBRWkeLUcTusVFdBzh). Vuelve a la línea clara de Apple con botones azules e imágenes de producto dibujadas, y rehace el menú.

**Módulos:**

| Módulo | Cambio | RF |
|---|---|---|
| `globals.css` | Tokens nuevos: `--ld-blue: #0071e3`, `--ld-blue-text: #0058b0`, `--ld-link: #0066cc`, tintes `--ld-tint-green/blue/warm`; tono `brand` para la banda del piloto. Se retiran el tono `dark` de las secciones y `--tone-btn-*`. | RF-48 |
| `layout/CtaButton.tsx` | Relleno `#0071E3`, texto blanco; variante `onBrand` (blanco/`#0058B0`) para la banda del piloto. Mismo texto y enlace (RF-01). | RF-48, RF-01 |
| `layout/SecondaryButton.tsx` | Contorno y texto `#0071E3`; acepta enlaces internos (`Ver precios`). | RF-48, RF-52 |
| `layout/SiteHeader.tsx` (nuevo; sustituye a `NavFull` y `NavMinimal`) | Cabecera clara en tres zonas (logo · menú · botón) con variantes `hub`, `landing` y `legal`. | RF-49 |
| `layout/MegaMenu.tsx` (nuevo) | Desplegables con `<details>` (funcionan sin JS) + un script pequeño (cliente) que cierra al elegir un enlace, con Escape, al abrir otro o al hacer clic fuera. Contenido desde `content/navigation.ts` (nuevo). | RF-50 |
| `layout/MobileMenu.tsx` (nuevo) | Panel a pantalla completa con `<details>` + script que lo cierra al pulsar un enlace o Escape; bloquea el desplazamiento del fondo mientras está abierto. | RF-51, RF-13 |
| `illustrations/PhoneChat.tsx`, `LockScreen.tsx`, `MonthlySummary.tsx`, `WebMockup.tsx`, `MapsCard.tsx`, `StepThumb.tsx` (nuevos) | Dibujos en HTML/SVG, sin imágenes de mapa de bits, con `role="img"` y descripción. | RF-52, RF-53, RF-54, RF-55 |
| `sections/Hero.tsx` | Fondo gris, dos botones, `PhoneChat` con la conversación del sector. | RF-52 |
| `sections/Problem.tsx` | Dos columnas: escenas + `LockScreen`. | RF-53 |
| `sections/Services.tsx` | Tarjeta grande del asistente + dos tarjetas con tinte; absorbe `Features` en el HUB (`Features` se queda para `/academias`). | RF-54, RF-38 |
| `sections/Steps.tsx` | Tarjetas con miniatura. | RF-55 |
| `sections/Pilot.tsx` | Banda azul con `CtaButton onBrand`. | RF-56 |
| `sections/Sectors.tsx`, `About.tsx`, `Faq.tsx`; se retira `DataPrivacy` del HUB | Tarjeta de sector; compromisos en tarjetas; pregunta de datos en la FAQ. | RF-57 |
| `content/hub.ts`, `academias.ts`, `types.ts` | Textos de v1.8, nuevos campos (`chat`, `lockScreen`…), fuera `features` y `privacy` del HUB. | RF-10 |
| `SectionRenderer.tsx` | Alternancia blanco/gris sin tonos oscuros; `piloto` con tono `brand`. | RF-48 |
| CSP (`postbuild-headers.mjs`) | Sin cambios: el script de menús va en un archivo propio del dominio, no en línea. | RNF-06 |
| Tests | Se reescriben los de paleta, cabecera, botones, menú y portada (v1.4–v1.7) según RF-48 a RF-57. *(Cambian por requisito.)* Nuevos: menú de escritorio, menú móvil, ilustraciones. | — |

**Decisiones:**

| # | Decisión | Motivo |
|---|---|---|
| D-35 | Menús con `<details>` + JavaScript mínimo. | Funcionan sin JS (RNF-04) y el script solo añade el cierre automático, que es lo que fallaba. |
| D-36 | Ilustraciones dibujadas en HTML/SVG, no fotos ni imágenes generadas. | Pesan casi nada, se ven nítidas, no inventan clientes reales y no afectan a Lighthouse. |
| D-37 | El resumen mensual de ejemplo **sin cifras**. | RF-31 prohíbe cifras sin clientes reales detrás; la maqueta llevaba números inventados. |
| D-38 | El botón del piloto mantiene el texto de RF-01 (la maqueta decía «Quiero una plaza»). | Un único texto de llamada a la acción en toda la web (RF-01). |
| D-39 | Contacto de las conversaciones de ejemplo: «Tu negocio» / «Tu academia». | Evita parecer un cliente real (la maqueta decía «Peluquería Bea»). |
| D-40 | Se conservan los `id` de sección (`servicios`, `proceso`, `sobre-nosotros`, `faq`…). | Las anclas antiguas siguen funcionando (CL-07). |

**Riesgos:**

| Riesgo | Mitigación |
|---|---|
| Cambio grande: muchos tests de v1.4–v1.7 se reescriben. | Por tareas pequeñas, cada una con su batería completa en verde. |
| El script de menús rompe la CSP. | Archivo propio del dominio (`script-src 'self'`); test de CSP sin violaciones. |
| Más dibujos = más peso y peor Lighthouse. | Solo HTML/CSS/SVG en línea; Lighthouse ≥ 90 en móvil y escritorio en la última tarea. |
| Contraste del azul `#0071E3` con texto blanco (4,6:1) justo por encima de AA. | Botones a 17 px con peso 500; auditoría de accesibilidad. |
