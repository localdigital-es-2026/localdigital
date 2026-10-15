/** Ilustración plana de Beatriz y Mauri con la paleta v1.2 (RF-36). Mejora futura: foto real. */
export function TeamIllustration() {
  return (
    <svg
      role="img"
      aria-label="Ilustración de Beatriz y Mauri, las dos personas detrás de Local Digital"
      viewBox="0 0 320 240"
      className="h-auto w-full max-w-xs"
    >
      <rect x="0" y="180" width="320" height="60" rx="12" fill="var(--tone-card)" />
      <circle cx="110" cy="90" r="34" fill="#86868b" />
      <path d="M50 200c0-40 27-66 60-66s60 26 60 66z" fill="#86868b" />
      <circle cx="210" cy="96" r="30" fill="var(--ld-brand)" />
      <path d="M155 200c0-36 25-60 55-60s55 24 55 60z" fill="var(--ld-brand)" />
    </svg>
  );
}
