/**
 * Imagen fija de la portada (RF-33, RF-36): móvil con burbujas de conversación.
 * Es lo que se ve en móvil, con «reducir movimiento», sin WebGL o sin JavaScript,
 * y la base sobre la que se superpone el 3D en escritorio (T-19). Paleta v1.2.
 */
const FRAME = "#d2d2d7";
const SCREEN = "#ffffff";
const INCOMING = "#e5e5ea";
const TEXT = "#86868b";
const BRAND = "var(--ld-brand)";

export function HeroStill() {
  return (
    <svg
      data-hero-still
      role="img"
      aria-label="Móvil con una conversación de WhatsApp: un cliente pregunta y el asistente responde al momento"
      viewBox="0 0 320 360"
      className="h-auto w-full max-w-sm"
    >
      <circle cx="160" cy="180" r="150" fill="var(--tone-card)" />
      <rect x="95" y="30" width="130" height="270" rx="26" fill={FRAME} />
      <rect x="104" y="48" width="112" height="234" rx="16" fill={SCREEN} />
      <rect x="140" y="38" width="40" height="5" rx="2.5" fill={SCREEN} opacity="0.6" />
      <rect x="112" y="70" width="70" height="24" rx="12" fill={INCOMING} />
      <rect x="120" y="79" width="44" height="6" rx="3" fill={TEXT} opacity="0.6" />
      <rect x="132" y="104" width="76" height="38" rx="12" fill={BRAND} />
      <rect x="140" y="114" width="56" height="6" rx="3" fill={SCREEN} opacity="0.85" />
      <rect x="140" y="126" width="40" height="6" rx="3" fill={SCREEN} opacity="0.85" />
      <rect x="112" y="152" width="60" height="24" rx="12" fill={INCOMING} />
      <rect x="120" y="161" width="36" height="6" rx="3" fill={TEXT} opacity="0.6" />
      <rect x="128" y="186" width="80" height="38" rx="12" fill={BRAND} />
      <rect x="136" y="196" width="60" height="6" rx="3" fill={SCREEN} opacity="0.85" />
      <rect x="136" y="208" width="44" height="6" rx="3" fill={SCREEN} opacity="0.85" />
      <g transform="translate(40 92)">
        <rect width="54" height="40" rx="14" fill={SCREEN} />
        <circle cx="16" cy="20" r="4" fill={TEXT} />
        <circle cx="27" cy="20" r="4" fill={TEXT} />
        <circle cx="38" cy="20" r="4" fill={TEXT} />
      </g>
      <g transform="translate(232 232)">
        <circle cx="22" cy="22" r="22" fill={BRAND} stroke={SCREEN} strokeWidth="2" />
        <path d="M13 22l6 6 12-12" stroke={SCREEN} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
