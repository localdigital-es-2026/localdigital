import type { Euros } from "@/content/types";

const NBSP = " ";
const number = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 });

/** «375 €» (espacio duro para que el símbolo no quede solo en otra línea). */
export function formatEuros(value: Euros): string {
  return `${number.format(value)}${NBSP}€`;
}

/** «75 €/mes». */
export function formatMonthly(value: Euros): string {
  return `${formatEuros(value)}/mes`;
}
