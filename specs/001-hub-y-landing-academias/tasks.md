# Tareas — Spec 001 · HUB y landing de academias

> Estado: aprobado · Fecha: 2026-10-14
> Basado en `spec.md` (aprobada) y `plan.md` (aprobado).
> Cada tarea se hace en un turno con TDD: test → ver que falla → código mínimo → batería completa → marcar `[x]`.
> Se trabaja en la rama local `feat/001-hub-academias` (nunca directamente en `main`, que publica la web). Commits y push solo cuando lo pidas.

## Datos necesarios antes de T-03

- **URL de Calendly** (P-01) y **nombre completo, NIF y domicilio profesional de Beatriz** (P-07). Sin ellos la validación de T-03 no puede usar datos reales.

## Bloque A · Base y limpieza

- [x] T-01 · Crear rama; configurar exportación estática, `scripts/serve-out.mjs` (sirve `out/`, aplica `_headers`, 404 con código 404) y Playwright (escritorio 1280 px y móvil 375 px) con los scripts `build`, `test:e2e` y `test`. Test: una ruta inexistente responde 404 y muestra enlace al HUB · cubre RF-09, RNF-05
- [x] T-02 · Eliminar código y contenido antiguo: Google Tag Manager, banner de cookies, botón flotante de WhatsApp, `api/contact`, `portfolio`, componentes antiguos, `public/llms.txt` e imágenes sin uso; quitar `framer-motion`, `resend` y `@next/third-parties`. Tests: sin cookies ni almacenamiento, sin peticiones a otros dominios, `/portfolio` responde 404, sin cifras ni casos de la web anterior · cubre RF-25, RF-26, RF-31, RF-32

## Bloque B · Datos y lógica

- [x] T-03 · Tipos (`types.ts`), datos comunes (`site.ts`) y validación (`validate.ts`). Tests: falta la URL de reservas → error «URL de reservas»; faltan datos de la titular → error con el campo; datos completos → sin error · cubre RF-35, RF-20, RNF-07
- [x] T-04 · Lógica pura: `format.ts`, `pilot.ts` y `links.ts`. Tests: «375 €», «75 €/mes»; plazas 0 → piloto oculto y FAQ del piloto eliminada; sin número de ejemplo → sin enlace de prueba; enlaces externos con pestaña nueva y sin acceso a la página de origen · cubre RF-03, RF-04, RF-05, RF-27, RF-34

## Bloque C · Estilo y estructura común

- [x] T-05 · Estilo base: variables de la paleta A, fuentes autoalojadas, `scroll-margin`, animaciones solo sin reducir movimiento. Tests: colores de fondo, texto y botón; con reducir movimiento no hay animaciones ni transiciones; las fuentes se sirven desde el propio dominio · cubre RF-28, RF-30, RF-26
- [x] T-06 · Componentes comunes: `CtaButton`, `ExternalLink`, `SkipLink` y `Footer`. Tests: el botón dice «Reserva una demo de 15 min», enlaza a la URL de reservas y abre pestaña nueva; el pie tiene correo, teléfono y los tres enlaces legales · cubre RF-01, RF-06, RF-27

## Bloque D · Web central (HUB)

- [x] T-07 · Contenido del HUB (`hub.ts`) a partir de `contenido/hub.md`. Tests: los textos clave coinciden con el documento; ninguna página contiene «{nota»; no aparecen «yo», «me » ni «escríbeme» · cubre RF-08, RNF-08
- [x] T-08 · Secciones `Hero` (con imagen fija provisional), `Problem`, `Features`, `Complements` y `Steps`. Tests: cada sección muestra su contenido; el enlace «pruébalo ya» aparece solo con número configurado y con estilo distinto al botón · cubre RF-10, RF-02, RF-34
- [x] T-09 · Secciones `Pricing`, `Guarantee` y `Pilot`. Tests: importes, «IVA no incluido», «Sin permanencia» y la frase de garantía; «Quedan 3 plazas» · cubre RF-03, RF-04, RF-05
- [x] T-10 · Secciones `Sectors`, `About` (con ilustración y texto alternativo), `DataPrivacy`, `Faq` y `Closing`. Tests: solo el sector academias y sin «próximamente»; las preguntas se abren y cierran con clic y teclado; «Quiénes somos» sin fotografías · cubre RF-14, RF-07, RF-36
- [x] T-11 · Página `/`: composición en el orden de la spec, `NavFull` con menú plegable en móvil y anclas antiguas. Tests: orden de secciones; 5 enlaces de menú + botón; cada enlace lleva a su sección; a 375 px el menú se pliega y se abre; `#faq`, `#servicios`, `#proceso` y `#sobre-nosotros` llevan a su sección · cubre RF-10, RF-11, RF-12, RF-13

## Bloque E · Landing de academias

- [x] T-12 · Contenido de academias (`academias.ts`) y sección `ChatDemo`. Tests: textos clave del documento; dos chats con etiqueta «Ejemplo»; etiquetas «Academia» y «Autoescuela»; a 1280 px los chats van uno junto a otro y a 375 px uno debajo de otro · cubre RF-08, RF-17, RF-18, RF-02
- [x] T-13 · Página `/academias`: composición, `NavMinimal` y pie con «Volver a localdigital.es». Tests: orden de secciones; menú solo con logo y botón; enlace de vuelta; un único estilo de botón principal en `/` y `/academias`; precios y plazas iguales en ambas páginas · cubre RF-15, RF-16, RF-19, RF-01, RF-03, RF-04

## Bloque F · Legal, SEO y datos

- [x] T-14 · Páginas legales desde `legal.ts`. Tests: las tres existen; incluyen titular, NIF, Calendly, WhatsApp, Netlify como encargado, plazos (12 meses / 6 años / 4 años), derechos y la AEPD; no contienen «[COMPLETAR», «formulario», «Resend» ni «Google Tag Manager» · cubre RF-20
- [x] T-15 · Conectar la validación de datos a la compilación. Test: compilar con la URL de reservas vacía falla e indica el dato; con datos completos compila · cubre RF-35, RF-20
- [x] T-16 · SEO: metadatos por página, imagen para redes generada (paleta A), `sitemap`, `robots` y JSON-LD del HUB. Tests: título y descripción en cada página; la imagen existe y mide 1200×630; el sitemap tiene las 5 direcciones; robots lo referencia; JSON-LD válido con imagen existente · cubre RF-21, RF-22, RF-23, RF-36
- [x] T-17 · `llms.txt` generado desde los datos. Test: responde; menciona el asistente, academias y +34 603 03 80 50; no contiene otros números de teléfono · cubre RF-24

## Bloque G · Ilustraciones y 3D

- [x] T-18 · Ilustraciones SVG con la paleta A (equipo e imagen fija de la portada). Tests: la portada muestra la imagen fija con texto alternativo; ninguna página carga fotografías de personas · cubre RF-36, RF-33
- [x] T-19 · 3D en escritorio: instalar `three` y `@react-three/fiber`; `Hero3DSlot` y `Hero3DScene`. Tests: a 1280 px se carga el 3D después de que el titular y el botón sean visibles; a 375 px, con reducir movimiento, sin WebGL o sin JavaScript no se descarga nada del 3D y se ve la imagen fija; el LCP no es el lienzo 3D · cubre RF-29, RF-33

## Bloque H · Seguridad, calidad y publicación

- [x] T-20 · Cabeceras: `scripts/postbuild-headers.mjs` genera `out/_headers` con HSTS, CSP con hashes, `frame-ancestors`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`. Tests: las cabeceras están en la respuesta; con la CSP aplicada, el menú, las FAQ y el 3D siguen funcionando y no hay errores de CSP en consola · cubre RF-26, RNF-06
- [x] T-21 · Calidad transversal: accesibilidad, adaptable y sin JavaScript. Tests: auditoría de accesibilidad sin errores; navegación completa con teclado y foco visible; sin desplazamiento horizontal a 320, 375, 768, 1280 y 1920 px; objetivos táctiles ≥ 44 px; con JavaScript desactivado se ven textos, precios y botón, y FAQ y menú funcionan · cubre RF-07, RF-13, RNF-02, RNF-03, RNF-04
- [x] T-22 · Lighthouse CI (`lighthouserc.json`, `npm run test:perf`) en móvil y escritorio para `/` y `/academias`, con `serve-out.mjs`. Test: las 4 categorías ≥ 0,9 (mediana de 3) · cubre RF-29, RNF-01
- [x] T-23 · Publicación: `netlify.toml` (build, `out`, Node 22) y GitHub Actions (`npm ci`, `npm audit --omit=dev --audit-level=high` bloqueante, `npm audit` completo informativo, `npm test`). Test: el flujo de CI se ejecuta en verde en local con los mismos comandos; sin vulnerabilidades altas o críticas en producción (constitución v1.1) · cubre RF-35, RNF-06

## Bloque I · Cambio v1.1 · patrones de apple.com/services (aprobado)

- [x] T-24 · Titular de portada en una línea por frase y tamaño grande (HUB y academias). Tests: dos líneas en `/`; tamaño ≥ 48 px a 1280 px y ≥ 36 px a 375 px; Lighthouse sin regresión · cubre RF-37
- [x] T-25 · Notas al pie: `NoteRef`, precios con «¹», garantía con «²» y lista de notas al final de «precios» en `/` y `/academias`. Tests: llamadas enlazadas a `#nota-1`/`#nota-2` con nombre accesible; las notas contienen IVA, sin permanencia y garantía · cubre RF-41, RF-03
- [x] T-26 · Sección «servicios» (sustituye a «complementos»): tipos, contenido en `hub.ts` y componente `Services`. Tests: nuevo orden de secciones; 3 bloques con icono, nombre, titular, precio con «¹» y enlace; sin botones ni CTA dentro; sin precios a mano · cubre RF-38, RF-10, RF-41
- [x] T-27 · Cinta de preguntas `QuestionMarquee` tras «problema». Tests: animación en curso; pausa y reanudación con clic, teclado y sin JS; pausa al pasar el puntero; las preguntas se anuncian una sola vez · cubre RF-39, RF-10
- [x] T-28 · Cinta con reducir movimiento y verificación final. Tests: con reducir movimiento, lista estática sin animación ni control; batería completa y Lighthouse ≥ 90 en móvil y escritorio · cubre RF-40, RF-39

## Bloque J · Cambio v1.2 · estilo profesional (aprobado)

- [x] T-29 · Paleta v1.2: tokens nuevos en `globals.css` y botón azul con borde claro. Tests: fondos, texto y botón con los valores de RF-28; mismo estilo de botón en `/` y `/academias` · cubre RF-28, RF-01
- [x] T-30 · Tipografía: solo Inter (sin Fraunces) y escala de titulares y texto. Tests: familias autoalojadas; tamaños y pesos de RF-43 a 1280 y 375 px; titular de portada sigue cumpliendo RF-37 · cubre RF-43, RF-26, RF-37
- [x] T-31 · Fondos por sección: alternancia automática en `SectionRenderer` y secciones de impacto casi negras. Tests: fondos de cada sección en `/` y `/academias` según RF-44; botón distinguible en fondo oscuro · cubre RF-44, RF-28
- [x] T-32 · Logotipo: componente `Logo` en cabeceras y pie, favicon e imagen para redes. Tests: imagen del logo del propio dominio con texto «Local Digital» en la cabecera de todas las páginas; favicon y OG con el logo · cubre RF-42, RF-21
- [x] T-33 · Ilustraciones, imagen fija y 3D con la paleta nueva. Tests: sin colores de la paleta A en SVG y escena; imagen fija y 3D siguen cumpliendo RF-29/RF-33 · cubre RF-36, RF-29, RF-33
- [x] T-34 · Verificación final v1.2: batería completa y Lighthouse ≥ 90 (móvil y escritorio) con accesibilidad sin incidencias de contraste · cubre RF-28, RF-43, RF-44

## Bloque K · Cambio v1.3 · logo gris 3D (aprobado)

- [x] T-35 · Logo gris 3D en cabecera y pie: generar `logo-3d.webp`/`.png` desde el SVG recibido, `Logo` con una sola imagen y eliminar las versiones azul y blanca. Tests: logo 3D ≤ 30 KB en cabecera y pie de todas las páginas, mismo archivo en claro y oscuro, enlace con nombre «Local Digital» · cubre RF-42
- [x] T-36 · Favicon e imagen para redes con el logo gris 3D y verificación final. Tests: favicon 64 px gris sin azul de marca; imagen para redes con el logo gris sobre casi negro; batería completa y Lighthouse ≥ 90 · cubre RF-42, RF-21

## Bloque L · Cambio v1.4 · negro puro (aprobado)

- [x] T-37 · Negro puro en las secciones de impacto y en la imagen para redes: `--ld-dark` a `#000000` y fondo de `og.tsx`. Tests: token y fondos de RF-44 en `/` y `/academias` a `rgb(0, 0, 0)`; imagen para redes con fondo negro; contraste AA · cubre RF-28, RF-44, RF-42
- [x] T-38 · Cabecera negra en todas las páginas y verificación final. Tests: fondo negro y texto claro en la cabecera de `/`, `/academias`, `/aviso-legal` y 404; menú móvil abierto negro; sigue negra sobre una sección blanca; batería completa y Lighthouse ≥ 90 (móvil y escritorio) · cubre RF-45, RNF-01

## Bloque M · Cambio v1.5 · botones de apple.com/services (aprobado)

- [x] T-39 · Botón principal en cápsula con colores por tono: tokens `--tone-btn-*`, `CtaButton` sin borde ni azul. Tests: colores del botón en secciones claras, en la cabecera negra y en el cierre negro de `/` y `/academias`; cápsula ≥ 44 px; sigue habiendo un único estilo (RF-01) · cubre RF-46, RF-01, RF-28, CL-13
- [x] T-40 · Botón secundario y enlaces «›», y verificación final. Tests: enlaces de servicios y sectores sin subrayado, con «›» y subrayado con el foco; nombre accesible sin la flecha; `SecondaryButton` transparente con contorno (prueba de componente); batería completa y Lighthouse ≥ 90 · cubre RF-46, RF-38, RNF-01

## Bloque N · Cambio v1.6 · menú sin botón (aprobado)

- [x] T-41 · Quitar la llamada a la acción de `NavFull` y `NavMinimal`. Tests: ninguna cabecera tiene `[data-cta]` (`/`, `/academias`, legales, 404, menú móvil abierto); los botones del contenido siguen cumpliendo RF-01 y RF-46; batería completa y Lighthouse ≥ 90 · cubre RF-11, RF-16, RF-46

## Bloque O · Cambio v1.7 · portada sin imagen (aprobado)

- [x] T-42 · El logo del menú del HUB vuelve arriba estando ya en `/` (enlace normal). Test: desplazarse a «precios», pulsar el logo y ver el `h1` · cubre RNF-02, RF-47
- [x] T-43 · Quitar la imagen y el 3D de la portada de `/` y `/academias`, borrar sus componentes y desinstalar `three`. Tests: RF-47 a 375 y 1280 px; sin peticiones del 3D; batería completa y Lighthouse ≥ 90 · cubre RF-47, RNF-01

## Bloque P · Cambio v1.8 · rediseño según la maqueta (aprobado)

- [x] T-44 · Paleta y botones: tokens azules, `CtaButton` azul (variante `onBrand`), `SecondaryButton` de contorno, enlaces `#0066CC` y alternancia blanco/gris sin secciones negras. Tests: colores de RF-48 en `/`, `/academias` y `/aviso-legal`; un único texto de botón (RF-01); contraste AA · cubre RF-48, RF-01
- [x] T-45 · Cabecera clara en tres zonas y menú de escritorio con desplegables (`SiteHeader`, `MegaMenu`, `content/navigation.ts`). Tests: RF-49 en las cuatro páginas; menú centrado; desplegables con clic, teclado, Escape, clic fuera y sin JS; «Sectores» lleva a `/academias`; CSP sin violaciones · cubre RF-49, RF-50, RF-16
- [x] T-46 · Menú móvil a pantalla completa (`MobileMenu`). Tests: RF-51 a 375 px (abre, apartados, cierra al pulsar enlace, ✕ y Escape, sin JS) · cubre RF-51, RF-13
- [x] T-47 · Portada y problema con dibujos (`PhoneChat`, `LockScreen`) en `/` y `/academias`. Tests: RF-52 y RF-53; sin imágenes de mapa de bits ni 3D; textos de v1.8 · cubre RF-52, RF-53, RF-17
- [x] T-48 · Servicios unificados, pasos con miniatura, piloto en banda azul, sector, quiénes somos y datos en la FAQ (HUB). Tests: RF-54 a RF-57, RF-10 (nuevo orden), RF-38, RF-04, CL-07 · cubre RF-54, RF-55, RF-56, RF-57, RF-10
- [x] T-49 · `/academias` con el mismo sistema visual y verificación final: batería completa, Lighthouse ≥ 90 (móvil y escritorio) y revisión visual a 375 y 1280 px · cubre RF-48 a RF-52, RNF-01

## Trazabilidad

### RF → tareas

| RF | Tareas | RF | Tareas |
|---|---|---|---|
| RF-01 | T-06, T-13, T-29 | RF-19 | T-13 |
| RF-02 | T-08, T-12 | RF-20 | T-03, T-14, T-15 |
| RF-03 | T-04, T-09, T-13, T-25 | RF-21 | T-16, T-36 |
| RF-04 | T-04, T-09, T-13 | RF-22 | T-16 |
| RF-05 | T-04, T-09 | RF-23 | T-16 |
| RF-06 | T-06 | RF-24 | T-17 |
| RF-07 | T-10, T-21 | RF-25 | T-02 |
| RF-08 | T-07, T-12 | RF-26 | T-02, T-05, T-20 |
| RF-09 | T-01 | RF-27 | T-04, T-06 |
| RF-10 | T-08, T-11, T-26, T-27 | RF-28 | T-05, T-37, T-39 |
| RF-11 | T-11 | RF-29 | T-19, T-22 |
| RF-12 | T-11 | RF-30 | T-05 |
| RF-13 | T-11, T-21 | RF-31 | T-02 |
| RF-14 | T-10 | RF-32 | T-02 |
| RF-15 | T-13 | RF-33 | T-18, T-19 |
| RF-16 | T-13 | RF-34 | T-04, T-08 |
| RF-17 | T-12 | RF-35 | T-03, T-15, T-23 |
| RF-18 | T-12 | RF-36 | T-10, T-16, T-18 |
|  |  | RF-37 | T-24 |
|  |  | RF-38 | T-26 |
|  |  | RF-39 | T-27, T-28 |
|  |  | RF-40 | T-28 |
|  |  | RF-41 | T-25, T-26 |
|  |  | RF-42 | T-32, T-35, T-36, T-37 |
|  |  | RF-43 | T-30, T-34 |
|  |  | RF-44 | T-31, T-34, T-37 |
|  |  | RF-45 | T-38 |
|  |  | RF-46 | T-39, T-40, T-41 |
|  |  | RF-47 | T-42, T-43 |
|  |  | RF-48 a RF-57 | T-44 a T-49 |

### RNF → tareas

| RNF | Tareas |
|---|---|
| RNF-01 | T-22 |
| RNF-02, RNF-03, RNF-04 | T-21 |
| RNF-05 | T-01 |
| RNF-06 | T-20, T-23 |
| RNF-07 | T-03 |
| RNF-08 | T-07 |
| RNF-09, RNF-10 | T-02 (sin formularios, peticiones externas ni almacenamiento) |

Todas las tareas (T-01 a T-49) cubren al menos un RF.
