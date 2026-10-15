import type { SiteData } from "./types";

export class SiteDataError extends Error {
  readonly field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "SiteDataError";
    this.field = field;
  }
}

function isBlank(value: string | undefined): boolean {
  return !value || value.trim() === "";
}

/** Lanza SiteDataError con el campo que falta o es incorrecto (RF-20, RF-35). */
export function validateSiteData(data: SiteData): void {
  if (isBlank(data.bookingUrl) || !data.bookingUrl.startsWith("https://")) {
    throw new SiteDataError("bookingUrl", "Falta la URL de reservas (debe empezar por https://).");
  }

  const ownerLabels = {
    fullName: "el nombre completo de la titular",
    nif: "el NIF de la titular",
    address: "el domicilio profesional de la titular",
    email: "el correo de la titular",
  } as const;
  for (const field of Object.keys(ownerLabels) as (keyof typeof ownerLabels)[]) {
    if (isBlank(data.owner[field])) {
      throw new SiteDataError(`owner.${field}`, `Falta ${ownerLabels[field]} para el aviso legal.`);
    }
  }

  const { total, remaining } = data.pilot;
  if (remaining < 0 || remaining > total) {
    throw new SiteDataError(
      "pilot.remaining",
      `Las plazas libres del piloto (${remaining}) deben estar entre 0 y ${total}.`,
    );
  }
}
