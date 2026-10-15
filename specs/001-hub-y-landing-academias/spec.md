# Spec 001 — Web central (HUB) y landing de academias y autoescuelas

> Estado: aprobada · v1.1 aprobada el 2026-10-15 · v1.2 (estilo profesional) aprobada el 2026-10-15 · Fecha: 2026-10-14 · Constitución: `docs/constitution.md` v1.1
> Contenido aprobado (textos literales): `specs/001-hub-y-landing-academias/contenido/hub.md` y `contenido/academias.md`.

## 1. Contexto

La web actual de Local Digital (www.localdigital.es) vende a la vez web, SEO local e IA a "negocios locales" en general, con estilo oscuro tecnológico. Tiene problemas detectados:

- Casos de éxito y resultados ("-98 % de ausencias", "+200 % pedidos") presentados como reales cuando son ejemplos → riesgo de publicidad engañosa.
- Estadísticas sin fuente, voz mezclada ("nosotros"/"yo"), varios caminos de contacto compitiendo (WhatsApp, teléfono, formulario, presupuesto).
- Aviso legal publicado con el hueco "[COMPLETAR: tu DNI/NIF]".
- Imagen para redes (`og-image.jpg`) inexistente (error 404).
- Analítica con cookies (Google Tag Manager) y un formulario que envía datos por correo.
- Número de WhatsApp distinto en distintos sitios (+34 603 03 80 50 y +34 606 701 267).

Tras el análisis de webs de referencia y de los cursos MKT-Hackers y de redacción clara, se decidió:

- La web pasa a ser un **HUB** de marca con el **asistente de WhatsApp como servicio protagonista** (web y Google Maps como complementos).
- Cada sector tendrá su propia **landing** en una subcarpeta; la primera, **academias y autoescuelas**.
- **Precios visibles**, **un único botón principal** ("Reserva una demo de 15 min") y **programa piloto** en lugar de casos de éxito.
- Estilo visual **A · cálida y cercana**.
- **v1.2 (2026-10-15):** la versión A resulta «infantil» (titulares con serifa redondeada, crema y terracota). Se adopta un estilo profesional inspirado en apple.com/careers: tipografía sans única (Inter, la alternativa libre más próxima a SF Pro, cuya licencia no permite usarla fuera de plataformas Apple), gran contraste de tamaños entre titulares y texto, fondos blanco y gris claro alternos, secciones de impacto casi negras, y el nuevo logo (caracola azul `#0D4964`) con el azul como color del botón principal.
- **v1.1 (2026-10-15):** se incorporan cuatro patrones de apple.com/services: titular grande en dos líneas, un bloque por servicio con la misma plantilla, una cinta animada de preguntas que contesta el asistente y notas al pie numeradas para las condiciones de precio.

## 2. Objetivo

Que un dueño de negocio local entienda en 5 segundos qué ofrece Local Digital, cuánto cuesta y cómo dar el siguiente paso, y que lo dé: **reservar una demo de 15 minutos**. Que un dueño de academia o autoescuela encuentre una página que habla de su caso concreto.

Éxito medible: la web cumple todos los requisitos de esta spec con los tests en verde, y las reservas de demo se miden en Calendly (fuera de esta spec).

## 3. Historias de usuario

- **HU-01** · Como dueño de un negocio local, quiero entender rápido qué hacéis y cuánto cuesta, para decidir si me interesa sin tener que llamar.
- **HU-02** · Como dueño de un negocio local, quiero reservar una demo en pocos clics, para ver el asistente funcionando con mis preguntas.
- **HU-03** · Como dueño de una academia o autoescuela, quiero ver ejemplos de mi sector, para saber que el asistente sirve para mi caso.
- **HU-04** · Como visitante desconfiado, quiero ver quién hay detrás, las condiciones (sin permanencia, garantía, IVA) y cómo se tratan los datos, para confiar.
- **HU-05** · Como visitante con móvil o con necesidades de accesibilidad, quiero que la web cargue rápido y se pueda usar con teclado y lector de pantalla.
- **HU-06** · Como Beatriz o Mauricio, quiero cambiar un precio, el número de plazas o un texto en un único sitio, para que todas las páginas queden coherentes.

## 4. Requisitos funcionales (EARS)

### 4.1 Comunes a todas las páginas

- **RF-01** · El sistema deberá mostrar en cada página de venta (HUB y landing de sector) una única llamada a la acción principal con el texto «Reserva una demo de 15 min», que enlace a la página de reservas externa y se abra en una pestaña nueva.
- **RF-02** · Donde esté configurado el número del asistente de ejemplo, el sistema deberá mostrar el enlace de prueba por WhatsApp («pruébalo ya») como enlace de texto, con un estilo visual distinto y de menor peso que la llamada a la acción principal.
- **RF-34** · Si el número del asistente de ejemplo no está configurado, entonces el sistema deberá omitir el enlace de prueba y cualquier texto que lo anuncie, sin dejar huecos visibles.
- **RF-35** · Si la URL de la página de reservas no está configurada, entonces la publicación deberá fallar con un mensaje que indique el dato que falta.
- **RF-03** · El sistema deberá mostrar los precios y condiciones con valores idénticos en todas las páginas donde aparezcan:
  - Asistente: instalación desde 375 € + 75 €/mes.
  - Web: desde 449 €, con ficha de Google Maps incluida.
  - Ficha de Google Maps suelta: 99 €.
  - Precio piloto: 190 € de instalación.
  - Indicación «IVA no incluido», «Sin permanencia» y la garantía: «Si en los primeros 60 días no te convence, te devolvemos la instalación.»
- **RF-04** · El sistema deberá mostrar el número de plazas libres del programa piloto, a partir de un único contador compartido por todas las páginas (valor inicial: 3).
- **RF-05** · Si el número de plazas libres del piloto es 0, entonces el sistema deberá ocultar el bloque del programa piloto y cualquier mención al precio piloto (190 €) en todas las páginas, incluidas las preguntas frecuentes.
- **RF-06** · El sistema deberá mostrar en el pie de cada página: nombre, correo (`localdigital.es@gmail.com`), teléfono (+34 603 03 80 50) y enlaces a Aviso legal, Política de privacidad y Política de cookies.
- **RF-07** · Cuando el visitante pulse una pregunta frecuente, el sistema deberá mostrar su respuesta si estaba oculta u ocultarla si estaba visible, y esto deberá poder hacerse también con el teclado.
- **RF-08** · El sistema deberá mostrar los textos tal como figuran en los documentos de contenido aprobados, sin incluir las indicaciones marcadas como `{nota: …}`.
- **RF-09** · Si un visitante accede a una dirección que no existe, entonces el sistema deberá mostrar una página de error con un enlace a la web central.

### 4.2 Web central (HUB) — `/`

- **RF-10** · El sistema deberá mostrar en la raíz del dominio las secciones de `contenido/hub.md` en este orden: portada, problema, preguntas que contesta (cinta), qué hacemos, servicios, cómo funciona, precios, programa piloto, sector, quiénes somos, tus datos, preguntas frecuentes, cierre y pie. *(v1.1: «complementos» pasa a «servicios» y se añade la cinta tras «problema».)*
- **RF-11** · El sistema deberá mostrar en el HUB un menú con enlaces a las secciones Qué hacemos, Cómo funciona, Precios, Quiénes somos y Preguntas, más la llamada a la acción principal.
- **RF-12** · Cuando el visitante pulse un enlace del menú, el sistema deberá desplazar la vista hasta la sección correspondiente.
- **RF-13** · Mientras el ancho de pantalla sea menor de 768 px, el sistema deberá mostrar el menú plegado tras un botón accesible que lo abre y lo cierra.
- **RF-14** · El sistema deberá mostrar en la sección de sectores solo los sectores activos (en esta spec, únicamente «Academias y autoescuelas», con enlace a `/academias`), sin mencionar sectores «próximamente».

### 4.3 Landing de academias y autoescuelas — `/academias`

- **RF-15** · El sistema deberá mostrar en `/academias` las secciones de `contenido/academias.md` en este orden: portada, dolor, solución, oferta y precio, garantía, demo, programa piloto, quiénes somos, preguntas frecuentes, cierre y pie.
- **RF-16** · El sistema deberá mostrar en `/academias` un menú reducido formado solo por el logotipo (que enlaza al HUB) y la llamada a la acción principal.
- **RF-17** · El sistema deberá mostrar las conversaciones de ejemplo con aspecto de chat de WhatsApp y con una etiqueta visible «Ejemplo» en cada una.
- **RF-18** · El sistema deberá mostrar en `/academias` a la vez los ejemplos de academia y de autoescuela: en las secciones de dolor y solución, cada ejemplo con su etiqueta visible («Academia» / «Autoescuela»); en la demo, las dos conversaciones de ejemplo, una junto a otra en pantallas de 768 px o más y una debajo de otra en pantallas menores.
- **RF-19** · El sistema deberá incluir en el pie de `/academias` un enlace «Volver a localdigital.es» que lleve al HUB.

### 4.4 Páginas legales

- **RF-20** · El sistema deberá publicar `/aviso-legal`, `/politica-de-privacidad` y `/politica-de-cookies` con contenido actualizado:
  - sin referencias a formulario, envío de correos ni analítica con cookies;
  - con Calendly y WhatsApp como terceros a los que el visitante envía datos al pulsar sus enlaces, indicando finalidad, base legal, plazos de conservación y derechos;
  - con el proveedor de alojamiento como encargado del tratamiento de los registros técnicos de acceso (dirección IP, fecha y página), que la web no guarda ni consulta;
  - con responsable, finalidad, base legal, plazo de conservación por cada tipo de dato, derechos (acceso, rectificación, supresión, oposición, limitación, portabilidad), cómo ejercerlos y derecho a reclamar ante la AEPD;
  - con la declaración de que la web no instala cookies no esenciales;
  - con estos plazos de conservación: reservas de Calendly y conversaciones de WhatsApp de quien no contrata, **12 meses desde el último contacto**, tras los cuales se borran (incluidas copias exportadas o notas); datos de clientes, durante la relación y después los plazos legales (6 años documentación mercantil, 4 años datos con efectos fiscales); registros técnicos del alojamiento, según la política del proveedor;
  - con los datos identificativos completos de la titular, **Beatriz, como autónoma (persona física)**: nombre y apellidos, NIF, domicilio profesional y correo de contacto, sin huecos «[COMPLETAR]». Estos datos se definen una sola vez, junto al resto de datos comunes.

### 4.5 Buscadores, redes y datos estructurados

- **RF-21** · El sistema deberá incluir en cada página un título, una descripción y una imagen para redes de 1200×630 px que exista y responda correctamente.
- **RF-22** · El sistema deberá publicar un mapa del sitio que incluya `/`, `/academias` y las tres páginas legales, y un archivo de instrucciones para rastreadores que lo referencie.
- **RF-23** · El sistema deberá incluir en el HUB datos estructurados de negocio local con nombre, URL, teléfono, imagen existente y descripción coherentes con el contenido nuevo.
- **RF-24** · El sistema deberá publicar un archivo de contexto para asistentes de IA (`llms.txt`) coherente con el contenido nuevo: servicios, precios, sectores activos y un único número de contacto.

### 4.6 Privacidad y terceros

- **RF-25** · El sistema no deberá instalar cookies ni almacenar datos en el navegador del visitante.
- **RF-26** · El sistema deberá servir todos los recursos de las páginas (scripts, estilos, fuentes, imágenes) desde el propio dominio.
- **RF-27** · El sistema deberá abrir todos los enlaces externos (Calendly, WhatsApp, redes) en una pestaña nueva y sin dar acceso a la página de origen.

### 4.7 Diseño (versión visual A)

- **RF-28** · *(v1.2, sustituye a la paleta A)* El sistema deberá usar esta paleta: fondos claros blanco `#FFFFFF` y gris `#F5F5F7`; fondo de impacto casi negro `#161617`; texto `#1D1D1F` sobre claro y `#F5F5F7` sobre oscuro; texto secundario `#6E6E73` sobre claro y `#A1A1A6` sobre oscuro; color de marca y de la llamada a la acción azul `#0D4964` con texto blanco.
- **RF-29** · Mientras el ancho de pantalla sea de 768 px o más y el visitante no tenga activada la preferencia de reducir movimiento, el sistema deberá mostrar en la portada del HUB un elemento 3D suave con la paleta de RF-28 (un móvil con burbujas de conversación que flotan despacio), cargado después de que el titular y la llamada a la acción sean visibles.
- **RF-33** · Si el ancho de pantalla es menor de 768 px, o el visitante tiene activada la preferencia de reducir movimiento, o el navegador no permite gráficos 3D, o JavaScript está desactivado, entonces el sistema deberá mostrar en su lugar una imagen fija equivalente y no descargar ningún recurso del elemento 3D.
- **RF-36** · El sistema deberá usar ilustraciones planas con la paleta de RF-28, en lugar de fotografías, en «Quiénes somos», en la imagen para redes y en la imagen fija que sustituye al 3D; las ilustraciones de personas deberán tener texto alternativo descriptivo.
- **RF-30** · Mientras el visitante tenga activada la preferencia de reducir movimiento, el sistema deberá desactivar animaciones y transiciones no esenciales.

### 4.8 Patrones de apple.com/services (v1.1)

- **RF-37** · El sistema deberá mostrar el titular de la portada con cada frase en su propia línea y con un tamaño de letra de al menos 48 px en pantallas de 768 px o más y de al menos 36 px en pantallas menores.
- **RF-38** · El sistema deberá mostrar en el HUB una sección «servicios» con un bloque por servicio (asistente de WhatsApp, web y ficha de Google Maps) con la misma estructura: icono, nombre, titular corto, precio «desde» con su llamada a nota y un enlace de texto a la sección correspondiente; los bloques no deberán contener la llamada a la acción principal ni ningún otro botón.
- **RF-39** · Mientras el visitante no tenga activada la preferencia de reducir movimiento, el sistema deberá mostrar en el HUB una cinta con las preguntas de ejemplo que contesta el asistente desplazándose horizontalmente de forma lenta y continua, con un control visible y accesible por teclado para pausarla y reanudarla, que funcione también sin JavaScript; la cinta deberá detenerse mientras el puntero o el foco estén sobre ella.
- **RF-40** · Si el visitante tiene activada la preferencia de reducir movimiento, entonces el sistema deberá mostrar las preguntas de la cinta como una lista estática, sin desplazamiento y sin control de pausa.
- **RF-41** · El sistema deberá marcar los precios con una llamada a nota numerada (¹) y la garantía con otra (²), enlazadas a una lista de notas situada al final de la sección de precios de la misma página que contenga las condiciones («IVA no incluido», «Sin permanencia» y la frase de garantía); cada llamada deberá tener un nombre accesible («Nota 1», «Nota 2»).

### 4.10 Estilo profesional (v1.2)

- **RF-42** · El sistema deberá mostrar el logotipo de la caracola junto al nombre «Local Digital» en el menú de todas las páginas, en azul `#0D4964` sobre fondos claros y en blanco sobre fondos oscuros, servido desde el propio dominio y con «Local Digital» como nombre accesible del enlace al inicio; el mismo logotipo deberá usarse como icono del sitio (favicon) y en la imagen para redes.
- **RF-43** · El sistema deberá usar una única familia tipográfica sans (Inter) para titulares y texto, con esta escala en pantallas de 768 px o más (entre paréntesis, por debajo de 768 px): titular de portada ≥ 72 px (≥ 40 px); titular de sección (h2) 48 px (32 px); subtítulo (h3) 21 px; texto 17 px con interlineado ≈ 1,47; titulares en peso semi-negrita (600) con espaciado de letras ligeramente negativo.
- **RF-44** · El sistema deberá mostrar las secciones de portada, problema y cierre del HUB, y las de portada y cierre de academias, sobre fondo casi negro (secciones de impacto), y las demás secciones alternando fondo blanco y gris claro, sin dos secciones claras consecutivas con el mismo fondo.

### 4.9 Contenido heredado

- **RF-31** · El sistema no deberá mostrar casos de éxito, cifras de resultados ni estadísticas que no estén respaldadas por clientes reales o por una fuente citada.
- **RF-32** · Cuando un visitante acceda a `/portfolio`, el sistema deberá responder con la página de error de RF-09 (código 404), ya que su contenido actual se elimina.

## 5. Requisitos no funcionales

- **RNF-01 · Calidad:** en la auditoría de la constitución, puntuación ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO para `/` y `/academias`, en móvil y también en escritorio (donde se carga el 3D).
- **RNF-02 · Accesibilidad:** cumplir WCAG 2.1 nivel AA. Contraste de texto ≥ 4,5:1, navegación completa con teclado, foco visible, textos alternativos en imágenes con contenido e idioma de página `es`.
- **RNF-03 · Adaptable:** sin desplazamiento horizontal entre 320 px y 1920 px de ancho; botones y enlaces táctiles de al menos 44×44 px en móvil.
- **RNF-04 · Sin JavaScript:** con JavaScript desactivado, todos los textos, precios y enlaces (incluida la llamada a la acción) deberán verse y funcionar.
- **RNF-05 · Estático:** las páginas se generan de antemano; no hay procesamiento en servidor por visita.
- **RNF-06 · Seguridad:** las respuestas incluyen las cabeceras definidas en la constitución (HSTS, CSP solo propio dominio, prohibición de incrustar, `nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- **RNF-07 · Mantenibilidad:** precios, plazas, contacto y enlaces de reserva están definidos una sola vez y se reutilizan en todas las páginas.
- **RNF-09 · Entradas públicas:** la web no tiene ninguna entrada de datos (formularios, inicio de sesión ni API); por tanto no requiere límite de peticiones. Si una spec futura añade una entrada, deberá incluir validación y límite de peticiones.
- **RNF-10 · Copias y registros:** la web no genera copias de seguridad, registros ni cachés con datos personales propios; los registros técnicos del alojamiento son del proveedor y se rigen por su política.
- **RNF-08 · Tono:** tuteo y primera persona del plural en todos los textos; ninguna aparición de «yo», «me» o «escríbeme».

## 6. Casos límite

- **CL-01** · Visitante con JavaScript desactivado → se cumple RNF-04; las preguntas frecuentes y el menú móvil se abren y cierran igualmente.
- **CL-02** · Ancho de 320 px o zoom al 200 % → sin desplazamiento horizontal y sin texto cortado (RNF-03).
- **CL-03** · Preferencia de reducir movimiento → RF-30.
- **CL-04** · Enlace de WhatsApp en un ordenador sin la aplicación → el enlace abre WhatsApp Web (comportamiento del propio WhatsApp; la web solo garantiza el enlace correcto con el número de RF-06).
- **CL-05** · Página de reservas externa caída → fuera del control de la web; el enlace sigue siendo correcto. No se muestra ningún mensaje propio.
- **CL-06** · Plazas del piloto = 0 → RF-05 (el bloque y el precio piloto desaparecen en todas las páginas).
- **CL-07** · Visitante que llega con una dirección antigua con ancla → la página carga sin error. `/#faq` lleva a Preguntas frecuentes y `/#servicios` a Qué hacemos; `/#casos-de-exito`, `/#proceso` y `/#sobre-nosotros` cargan la página (`#proceso` → Cómo funciona, `#sobre-nosotros` → Quiénes somos; `#casos-de-exito` → portada).
- **CL-08** · Dirección inexistente → RF-09.
- **CL-10** · Navegador de escritorio sin soporte de gráficos 3D → RF-33 (imagen fija, sin error).
- **CL-11** · Lector de pantalla en la cinta de preguntas → las preguntas se anuncian una sola vez (la copia que permite el bucle visual queda oculta a tecnologías de asistencia).
- **CL-13** · Llamada a la acción azul dentro de una sección casi negra → debe seguir distinguiéndose: el botón lleva un borde claro sutil en todas sus apariciones (mismo estilo en todas las páginas, RF-01).
- **CL-12** · Cinta con JavaScript desactivado → el control de pausa sigue funcionando (RF-39).
- **CL-09** · Visitante que llega a `/portfolio` desde Google → RF-32 (404 con enlace al HUB).

## 7. Fuera de alcance

- Formulario de contacto, envío de correos y cualquier base de datos.
- Analítica con cookies y banner de cookies.
- Landings de otros sectores (clínicas, reformas…).
- El asistente de WhatsApp en sí, la cuenta de Calendly y su configuración.
- El cambio de DNS y el alta del proyecto en Netlify (tarea operativa de Beatriz; se documenta en el plan, no se programa).
- Contratos con clientes y redacción jurídica definitiva de garantías (las páginas legales sí entran, ver RF-20).
- **Mejora futura anotada:** sustituir las ilustraciones de «Quiénes somos» (y, si procede, de la imagen para redes) por fotografías reales de Beatriz y Mauricio, porque mostrar las caras refuerza la cercanía del estilo A. Requiere una spec o cambio posterior.
- Botón flotante de WhatsApp (se elimina por la regla de una única llamada a la acción).
- Blog.
- Nueva página `/portfolio` como escaparate de opciones de web para clientes (proyectos reales o maquetas marcadas como ejemplo, sin cifras no verificadas): **spec futura**. Mientras tanto, la dirección devuelve 404 (RF-32).

## 8. Criterios de aceptación

| RF | Criterio de aceptación (comprobable) |
|---|---|
| RF-01 | En `/` y `/academias` existe exactamente un estilo de botón principal; todas sus apariciones dicen «Reserva una demo de 15 min», enlazan a la URL de reservas configurada y se abren en una pestaña nueva. |
| RF-02 | Con el número configurado, el enlace de WhatsApp de prueba existe, abre una conversación de WhatsApp con el número configurado y no tiene el estilo del botón principal. |
| RF-34 | Con el número vacío, ninguna página contiene el enlace de prueba ni la frase «Prefieres probarlo ya». |
| RF-35 | Con la URL de reservas vacía, la generación de la web falla e indica «URL de reservas». |
| RF-03 | Los importes 375 €, 75 €/mes, 449 €, 99 € y 190 € y los textos «IVA no incluido», «Sin permanencia» y la frase de garantía aparecen iguales en todas las páginas donde salen; no aparece ningún «[X €]». |
| RF-04 | Con el contador en 3, `/` y `/academias` muestran «Quedan 3 plazas»; al cambiar el contador, ambas muestran el nuevo valor. |
| RF-05 | Con el contador en 0, ninguna página contiene el bloque del piloto, «190 €» ni «plazas»; el resto de secciones y precios normales siguen visibles. |
| RF-06 | El pie de cada página contiene el correo, el teléfono y los tres enlaces legales, y estos responden sin error. |
| RF-07 | Cada pregunta frecuente se abre y se cierra con clic y con teclado (Intro/Espacio) y expone su estado a lectores de pantalla. |
| RF-08 | Los titulares y textos de cada sección coinciden con los documentos de contenido; ninguna página contiene «{nota». |
| RF-09 | Una dirección inexistente devuelve la página de error con enlace al HUB. |
| RF-10 | Los títulos de sección de `/` aparecen en el orden indicado. |
| RF-11 | El menú del HUB contiene los 5 enlaces y la llamada a la acción. |
| RF-12 | Al pulsar cada enlace del menú, la sección destino queda visible en pantalla. |
| RF-13 | A 375 px el menú aparece plegado; el botón lo abre y lo cierra y tiene nombre accesible y estado. |
| RF-14 | La sección de sectores contiene un único enlace a `/academias`; la palabra «próximamente» no aparece en ninguna página. |
| RF-15 | Los títulos de sección de `/academias` aparecen en el orden indicado. |
| RF-16 | El menú de `/academias` contiene solo el logo (enlace a `/`) y la llamada a la acción. |
| RF-17 | Cada conversación de ejemplo muestra la etiqueta «Ejemplo». |
| RF-18 | `/academias` contiene las etiquetas «Academia» y «Autoescuela» en dolor y solución, y dos conversaciones de ejemplo; a 1280 px están lado a lado y a 375 px apiladas; ambas visibles sin JavaScript. |
| RF-19 | El pie de `/academias` contiene «Volver a localdigital.es» enlazando a `/`. |
| RF-20 | La política de privacidad indica «12 meses» para no clientes y los plazos legales para clientes. Las tres páginas legales existen; no contienen «[COMPLETAR», «formulario», «Resend» ni «Google Tag Manager»; mencionan Calendly y WhatsApp. |
| RF-21 | Cada página tiene título, descripción e imagen para redes; la imagen responde con éxito y mide 1200×630. |
| RF-22 | El mapa del sitio lista las 5 direcciones; el archivo de rastreadores lo referencia. |
| RF-23 | Los datos estructurados del HUB son válidos y su imagen existe. |
| RF-24 | `llms.txt` responde, menciona el asistente de WhatsApp, academias y el número +34 603 03 80 50, y no contiene otros números. |
| RF-25 | Tras cargar `/` y `/academias`, el navegador no tiene cookies ni datos de almacenamiento local del dominio. |
| RF-26 | Durante la carga de `/` y `/academias` no se hace ninguna petición a otros dominios. |
| RF-27 | Todos los enlaces externos se abren en pestaña nueva y la página abierta no puede acceder ni modificar la página de origen. |
| RF-28 | Los fondos de sección son `#FFFFFF`, `#F5F5F7` o `#161617`; el texto es `#1D1D1F` en claro y `#F5F5F7` en oscuro; la llamada a la acción tiene fondo `#0D4964` y texto blanco; ningún texto incumple el contraste AA (auditoría de accesibilidad). |
| RF-29 | A 1280 px sin reducir movimiento, la portada muestra el elemento 3D; el titular y la llamada a la acción son visibles antes de que empiece a cargar; el elemento más grande pintado (LCP) no es el 3D. |
| RF-33 | A 375 px, con reducir movimiento, sin soporte 3D o sin JavaScript, se ve la imagen fija y no se descarga ningún recurso del elemento 3D. |
| RF-30 | Con reducir movimiento activado, no hay animaciones ni transiciones no esenciales. |
| RF-36 | Ninguna página carga fotografías de personas; «Quiénes somos» muestra una ilustración con texto alternativo; la imagen para redes y la imagen fija del 3D usan la paleta A. |
| RF-37 | El `h1` de `/` muestra «Ningún cliente sin respuesta.» y «Ni a las 11 de la noche.» en líneas distintas; su tamaño calculado es ≥ 48 px a 1280 px y ≥ 36 px a 375 px. |
| RF-38 | La sección «servicios» de `/` tiene exactamente 3 bloques con icono, nombre, titular, precio con «¹» y un enlace; dentro no hay `[data-cta='primary']` ni botones. |
| RF-39 | Sin reducir movimiento, la lista de la cinta tiene una animación en curso; al activar el control de pausa (clic o teclado, también sin JS) la animación queda en pausa y al reactivarlo continúa; al pasar el puntero se pausa. |
| RF-40 | Con reducir movimiento, la cinta no tiene animación, no se muestra el control de pausa y todas las preguntas son visibles. |
| RF-41 | En `/` y `/academias` cada precio «desde» lleva «¹» enlazado a `#nota-1` y la garantía «²» enlazado a `#nota-2` (si aparece en precios); las notas existen dentro de la sección de precios y contienen las condiciones; cada llamada tiene nombre accesible «Nota N». |
| RF-42 | El enlace al inicio de la cabecera contiene la imagen del logotipo (del propio dominio) y el texto «Local Digital»; en fondo claro se usa la versión azul; el favicon es el logotipo; la imagen para redes lo incluye. |
| RF-43 | `h1`, `h2`, `h3` y el texto usan Inter; tamaños calculados a 1280 px: `h1` portada ≥ 72 px, `h2` = 48 px, `h3` = 21 px, texto = 17 px; a 375 px: `h1` ≥ 40 px, `h2` = 32 px; peso de titulares 600. |
| RF-44 | En `/` las secciones `inicio`, `problema` y `cierre` tienen fondo `#161617`; en `/academias`, `inicio` y `cierre`; el resto alterna `#FFFFFF` / `#F5F5F7` sin que dos secciones claras consecutivas compartan fondo. |
| RF-31 | Ninguna página contiene porcentajes de resultados ni las frases de casos de la web anterior. |
| RF-32 | `/portfolio` devuelve código 404 y muestra la página de error con enlace al HUB; ninguna página enlaza a `/portfolio`. |

Los RNF se aceptan con: RNF-01 auditoría ≥ 90 ×4 en móvil y en escritorio; RNF-02 auditoría de accesibilidad sin errores y navegación por teclado; RNF-03 sin desplazamiento horizontal a 320/375/768/1280/1920 px; RNF-04 pruebas con JavaScript desactivado; RNF-06 cabeceras presentes en la respuesta; CL-07 cada ancla antigua lleva a la sección indicada; RNF-08 búsqueda de «yo», «me » y «escríbeme» sin resultados en los textos.

## 9. Preguntas abiertas

- **P-01 · Enlaces externos (parcial):** resuelto el comportamiento (RF-02, RF-34, RF-35). Pendiente: la URL de Calendly, obligatoria antes de publicar. El número del asistente de ejemplo se añadirá cuando exista. URL de Calendly configurada el 2026-10-14; falta solo el número del asistente de ejemplo.
- ~~P-02~~ · Resuelta: 3D suave solo en escritorio, con imagen fija en móvil, reducir movimiento, sin soporte 3D o sin JavaScript (RF-29, RF-33).
- ~~P-03~~ · Resuelta: `/portfolio` devuelve 404 ahora y se reutilizará en una spec futura como escaparate de webs (RF-32, Fuera de alcance).
- ~~P-04~~ · Resuelta: contador único compartido, inicial 3; a 0 se oculta el piloto en todas las páginas (RF-04, RF-05).
- ~~P-05~~ · Resuelta: se muestran los dos tipos a la vez, con etiquetas (RF-18).
- ~~P-06~~ · Resuelta: HUB «Ningún cliente sin respuesta. Ni a las 11 de la noche.»; academias «Septiembre sin 200 WhatsApps sin contestar.» (actualizado en los documentos de contenido).
- ~~P-07~~ · Resuelta: titular Beatriz Palomo del Pozo, autónoma; NIF y domicilio en `site.ts` (2026-10-15).
- ~~P-08~~ · Resuelta: 12 meses desde el último contacto para no clientes; plazos legales para clientes (RF-20).
- ~~P-09~~ · Resuelta: ilustraciones planas con la paleta A en lugar de fotos (RF-36); sustitución por fotos reales anotada como mejora futura.
- ~~P-10~~ · Resuelta: «junio o julio» (actualizado en `contenido/academias.md`).
- ~~P-11~~ · Resuelta: «Si en los primeros 60 días no te convence, te devolvemos la instalación.» (RF-03). Reflejar en el contrato (fuera de alcance).
- ~~P-12~~ · Resuelta: textos nuevos v1.1 aprobados el 2026-10-15 (`contenido/hub.md` §3b y §5).
- **P-13 · Logotipo en SVG:** el logo recibido es un PNG de 370 px con fondo blanco. Hasta tener el SVG original se usa una versión PNG transparente generada a partir de él (bordes no perfectos). Al recibir el SVG se sustituye sin cambiar requisitos.
