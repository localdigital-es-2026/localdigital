export type Euros = number;

export interface Prices {
  assistantSetup: Euros;
  assistantMonthly: Euros;
  web: Euros;
  mapsStandalone: Euros;
  pilotSetup: Euros;
}

export interface Conditions {
  vat: string;
  commitment: string;
  guarantee: string;
  /** Días laborables de instalación. */
  installDays: number;
  /** Horas laborables para aplicar cambios. */
  updateHours: number;
}

/** Titular de la web (Beatriz, autónoma). */
export interface Owner {
  fullName: string;
  nif: string;
  address: string;
  email: string;
}

export interface Sector {
  slug: "academias";
  title: string;
  summary: string;
  linkText: string;
}

export interface SiteData {
  name: string;
  url: string;
  /** Obligatoria: sin ella no se puede publicar (RF-35). */
  bookingUrl: string;
  /** Opcional: sin ella no se muestra el enlace «pruébalo ya» (RF-34). */
  demoWhatsapp?: string;
  phone: string;
  email: string;
  prices: Prices;
  conditions: Conditions;
  pilot: { total: number; remaining: number };
  owner: Owner;
  retention: { leadsMonths: number; mercantileYears: number; fiscalYears: number };
  activeSectors: ReadonlyArray<Sector>;
}

export type Tag = "Academia" | "Autoescuela";

export interface Item {
  title: string;
  body: string;
  tag?: Tag;
}

export interface Scene {
  title: string;
  body: string;
  tag?: Tag;
}

export interface FaqItem {
  q: string;
  a: string;
  /** Solo tiene sentido mientras haya plazas del piloto (RF-05). */
  pilotOnly?: boolean;
  /** Frase que se añade a la respuesta solo mientras haya plazas del piloto (RF-05). */
  pilotNote?: string;
}

export interface ChatMessage {
  from: "alumno" | "asistente";
  time?: string;
  text: string;
}

/** Conversación del móvil dibujado de la portada (RF-52). */
export interface HeroChat {
  contact: string;
  /** Descripción para lectores de pantalla. */
  description: string;
  messages: { from: "cliente" | "asistente"; time: string; text: string }[];
}

/** Pantalla de bloqueo dibujada de la sección «problema» (RF-53). */
export interface LockScreenData {
  date: string;
  time: string;
  title: string;
  previews: string[];
  more: string;
  /** Descripción para lectores de pantalla. */
  description: string;
}

export interface Chat {
  tag: Tag;
  messages: ChatMessage[];
}

export type Section =
  | { kind: "hero"; id: string; eyebrow: string; title: string; subtitle: string; ctaNote: string; demoLinkText?: string; secondaryCta?: NavLink; chat?: HeroChat }
  | { kind: "problem"; id: string; title: string; scenes: Scene[]; closing: string; lockScreen?: LockScreenData }
  | { kind: "features"; id: string; eyebrow?: string; title: string; intro: string; items: Item[]; control?: Item; benefits?: { title: string; items: string[] }; cta?: boolean }
  | { kind: "services"; id: string; title: string; intro: string; blocks: ServiceBlock[] }
  | { kind: "marquee"; id: string; label: string; questions: string[] }
  | { kind: "steps"; id: string; title: string; steps: (Item & { thumb?: StepThumbKind })[] }
  | { kind: "pricing"; id: string; title: string; plans: PricingPlan[]; notes: Footnote[]; guaranteeLabel?: string; cta?: boolean }
  | { kind: "guarantee"; id: string; title: string; points: Item[] }
  | { kind: "pilot"; id: string; eyebrow: string; title: string; body: string; asksIntro: string; asks: string[] }
  | { kind: "sectors"; id: string }
  | { kind: "about"; id: string; title: string; body: string[]; commitments?: Item[] }
  | { kind: "faq"; id: string; title: string; items: FaqItem[] }
  | { kind: "chatDemo"; id: string; title: string; intro: string; chats: Chat[]; demoLinkText?: string }
  | { kind: "closing"; id: string; title: string; body: string };

/** Miniatura dibujada de cada paso de «cómo funciona» (RF-55). */
export type StepThumbKind = "call" | "list" | "chat";

/** Tarjeta grande del servicio principal (RF-54). El resumen es un dibujo sin cifras (D-37). */
export interface FeaturedService {
  badge: string;
  features: string[];
  summary: { label: string; items: string[]; description: string };
}

/** Bloque de servicio con plantilla común (RF-38). */
export interface ServiceBlock {
  icon: "chat" | "web" | "map";
  name: string;
  title: string;
  /** Generado desde site.ts; la llamada a nota la añade el componente. */
  price: string;
  link: NavLink;
  featured?: FeaturedService;
}

/** Nota al pie numerada de la sección de precios (RF-41). */
export interface Footnote {
  id: 1 | 2;
  text: string;
}

export interface PriceLine {
  text: string;
  /** Llamada a nota que acompaña al precio (RF-41). */
  note?: 1;
}

export interface PricingPlan {
  title: string;
  badge?: string;
  lines: PriceLine[];
  includes?: string;
  includesList?: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export type Tone = "dark" | "white" | "gray" | "brand";

export interface PageContent {
  slug: "" | "academias";
  nav: "full" | "minimal";
  seo: { title: string; description: string };
  sections: Section[];
}
