/**
 * Officiële MERIT-logo's (afgeleid van src/assets/brand/merit-logo-origineel.jpg
 * via scripts/assets/generate.html). Paden zijn relatief aan de base van de site.
 */
const base = import.meta.env.BASE_URL;

export const logoFiles = {
  /** Horizontaal: embleem + MERIT + Administratie & Advies (navy/goud, transparant) */
  horizontal: `${base}brand/logo-merit.png`,
  /** Horizontaal, witte variant voor donkere achtergronden */
  horizontalWhite: `${base}brand/logo-merit-wit.png`,
  /** Staand logo (voor "Over ons" en social) */
  stacked: `${base}brand/logo-merit-staand.png`,
  /** Alleen het embleem */
  emblem: `${base}brand/logo-merit-embleem.png`,
} as const;

/** Verhouding van het horizontale logo (breedte / hoogte) — voor layout zonder verspringen */
export const LOGO_HORIZONTAL_RATIO = 900 / 184;
