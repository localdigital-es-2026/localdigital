# Constitución del proyecto — Local Digital (localdigital.es)

> Reglas permanentes del proyecto. Toda especificación, plan y tarea debe respetarlas.
> Cambiarlas exige proponer el cambio, explicar el motivo y obtener aprobación explícita.
> Fecha de aprobación: 2026-10-14 · Versión: 1.1 (2026-10-15: §6, política de `npm audit`)

## Contexto

Web comercial de Local Digital, agencia de dos personas (Beatriz y Mauricio) que instala asistentes de WhatsApp y, como complemento, hace webs y fichas de Google Maps para negocios locales en España. La web se organiza como una **web central (HUB)** más **páginas por sector** en subcarpetas (la primera, `/academias`).

---

## 1. Stack

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.**
- **3D opcional** en la portada mediante React Three Fiber, solo si una especificación lo pide.
- Idioma de la web: español (España).

**Motivo:** es la tecnología del repositorio actual, que el equipo ya conoce; mantiene el despliegue y permite 3D igual que otras alternativas. La calidad (velocidad, SEO, accesibilidad) se garantiza con requisitos medibles y tests, no con la elección de framework.

## 2. Dependencias permitidas

**Producción (lista cerrada):**
- `next`, `react`, `react-dom`
- `tailwindcss` / `@tailwindcss/postcss`
- `lucide-react` (iconos)
- `three`, `@react-three/fiber`, `@react-three/drei` — **solo** si se implementa el 3D.

**Desarrollo:** TypeScript, ESLint y su configuración de Next, y las herramientas de test del punto 3.

**Se eliminan:** `framer-motion` (las animaciones se hacen con CSS), `resend` (ya no hay formulario) y `@next/third-parties` (ya no hay analítica con cookies).

**Regla:** cualquier dependencia nueva necesita un motivo escrito en el `plan.md` correspondiente y aprobación explícita.

**Motivo:** menos dependencias = web más ligera, menos actualizaciones y menos riesgo de seguridad.

## 3. Tests

- **Playwright:** tests de navegador en escritorio (Chrome) y móvil simulado. Comprueban contenido, enlaces, botón principal, páginas y accesibilidad básica.
- **Lighthouse CI:** en móvil, puntuación **≥ 90** en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- **Comandos:**
  - `npm test` → ejecuta toda la batería (Playwright + Lighthouse).
  - `npm run test:perf` → solo Lighthouse.
- Se desarrolla con TDD: test primero, que falle, código mínimo, batería completa en verde.
- Prohibido modificar o borrar un test para que pase.
- Ejecución local y, opcionalmente, en GitHub Actions dentro del cupo gratuito.

**Motivo:** la web es sobre todo contenido; lo que importa verificar es lo que ve el visitante y que la velocidad no baje del mínimo.

## 4. Separación de capas

1. **Contenido:** un archivo de datos tipado por página (HUB, cada sector). Solo textos, enlaces y referencias a datos comunes. Sin JSX ni estilos.
2. **Datos comunes:** un único archivo con precios, condiciones (IVA, garantía, plazos), contacto y enlaces de Calendly/WhatsApp. Ninguna página repite estos valores.
3. **Secciones:** componentes reutilizables que reciben contenido por props y lo pintan. **Ningún texto visible fijo** dentro de una sección.
4. **Páginas:** cada ruta solo elige qué secciones usa y con qué contenido.

Un sector nuevo = un archivo de contenido nuevo + una ruta, sin duplicar componentes.

**Motivo:** el modelo HUB + sectores reutiliza las mismas secciones con distinto texto; cambiar un precio debe ser cambiar una línea.

## 5. Persistencia y hosting

- **Persistencia:** ninguna. Sin base de datos ni almacenamiento de datos de usuarios. Todo el contenido vive en el repositorio.
- **Web 100 % estática** (exportación estática de Next.js). Sin rutas de API ni funciones de servidor.
- **Hosting:** **Netlify, plan gratuito**, con despliegue automático desde la rama `main` y vistas previas por cambio.
- **Dominio:** `localdigital.es`; los DNS se cambian para apuntar a Netlify (ver punto 8 sobre Cloudflare).

**Motivo:** sin formulario no hace falta servidor; lo estático es más rápido, barato y seguro. El plan gratuito de Netlify permite uso comercial, a diferencia de Vercel Hobby.

## 6. Seguridad

- **Cabeceras HTTP** configuradas en Netlify:
  - `Strict-Transport-Security` (HTTPS obligatorio).
  - `Content-Security-Policy` que solo permite recursos del propio dominio.
  - `X-Frame-Options: DENY` / `frame-ancestors 'none'` (nadie puede incrustar la web).
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy` y `Permissions-Policy` restrictivas.
- **Ningún secreto, clave ni token** en el repositorio ni en el código. Si alguna vez hacen falta, van en variables de entorno de Netlify.
- **`npm audit`** en cada cambio:
  - **Producción** (`npm audit --omit=dev --audit-level=high`): **bloquea** si hay vulnerabilidades de nivel alto o crítico en lo que se publica.
  - **Desarrollo** (`npm audit` completo): **se revisa pero no bloquea**; el resultado queda en el registro de CI y se actualizan esas herramientas cuando haya arreglo compatible.
- **Enlaces externos** (Calendly, WhatsApp, redes) abren en pestaña nueva con `rel="noopener noreferrer"`. Nada incrustado.

**Motivo:** poca superficie de ataque, pero sin dejar puertas abiertas; coherente con la instrucción global de no guardar secretos en código. Las herramientas de desarrollo (Lighthouse CI, linter) no llegan a la web publicada y algunas no tienen arreglo compatible; bloquear por ellas impediría publicar sin mejorar la seguridad de la web.

## 7. Datos personales

- **Normativa:** RGPD, LOPDGDD y LSSI-CE (responsable en España; web comercial).
- **La web no recoge ni guarda datos personales:** sin formulario, sin base de datos, sin analítica con cookies.
- **Sin cookies no esenciales → sin banner de cookies.** Si en el futuro se añade cualquier cookie no esencial, hará falta consentimiento previo y se revisa esta constitución.
- **Medición:** Google Search Console (sin cookies en la web) y número de reservas en Calendly.
- **Terceros que reciben datos al pulsar un enlace:** Calendly (reserva de demo) y WhatsApp (consultas). La política de privacidad los nombra, con finalidad, base legal, plazos de conservación y derechos.
- **Páginas legales** (aviso legal, privacidad, cookies) se reescriben acorde a esto.
- **Plazos de conservación** de cada tipo de dato: se fijan en la fase de clarificación de cada especificación.

**Motivo:** cero datos en la web = cero riesgo de fuga y mínima carga legal.

## 8. Restricciones de plataforma

- **Cloudflare: solo DNS** (modo «Solo DNS», nube gris). Prohibido proxy, Workers, Pages o cualquier servicio de Cloudflare que sirva contenido. **Motivo:** LaLiga bloquea IPs de Cloudflare en España y la web dejaría de verse.
- **Vercel Hobby: prohibido**, tanto para esta web como para webs de clientes. **Motivo:** sus condiciones solo permiten uso personal no comercial.
- **Sin scripts, fuentes ni widgets de terceros:** las fuentes se sirven desde el propio dominio; Calendly, WhatsApp y redes solo como enlaces. **Motivo:** velocidad, seguridad (CSP estricta) y privacidad (sin cookies de terceros).

## 9. Presupuesto

- **0 €/mes.** Todo en planes gratuitos: Netlify, GitHub, GitHub Actions (cupo gratuito) y Calendly.
- Único coste fijo existente: el dominio (anual, ya contratado).
- Si un límite gratuito se queda corto, se para y se pide aprobación antes de pagar nada, indicando coste mensual.

**Motivo:** preferencia de capas gratuitas; cualquier pago requiere aprobación previa.
