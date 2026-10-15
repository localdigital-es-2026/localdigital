// Menús de la cabecera (RF-50, RF-51, D-35). Sin este archivo los <details> siguen abriendo y
// cerrando; esto solo añade el cierre automático: al elegir un enlace, con Escape, al abrir otro
// desplegable o con un clic fuera, y bloquea el desplazamiento del fondo con el menú móvil abierto.
(() => {
  const MENUS = "details[data-menu], details[data-mobile-menu]";
  const all = () => [...document.querySelectorAll(MENUS)];
  const close = (except) => all().forEach((d) => { if (d !== except) d.open = false; });

  document.addEventListener(
    "toggle",
    (event) => {
      const d = event.target;
      if (!(d instanceof HTMLDetailsElement)) return;
      if (d.matches("[data-menu]") && d.open) close(d);
      if (d.matches("[data-mobile-menu]")) document.documentElement.classList.toggle("ld-menu-open", d.open);
    },
    true,
  );

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("details[data-menu] a, details[data-mobile-menu] a")) {
      close(null);
      return;
    }
    if (!target.closest("details[data-menu]")) {
      document.querySelectorAll("details[data-menu][open]").forEach((d) => { d.open = false; });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const open = all().filter((d) => d.open);
    if (!open.length) return;
    open.forEach((d) => { d.open = false; });
    open[0].querySelector("summary")?.focus();
  });
})();
