/**
 * Extracts the numeric/string ID from the end of a SWAPI resource URL.
 * Example: "https://swapi.info/api/people/1" -> "1"
 */
export function extractIdFromUrl(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, '');
  const segments = trimmed.split('/');
  const lastSegment = segments[segments.length - 1] ?? '';
  return lastSegment;
}

/**
 * Converts a SWAPI numeric string (like "172" or "1,358" or "unknown")
 * into a finite number, or null if the value is unknown/invalid.
 */
export function parseSwapiNumber(value: string): number | null {
  const cleaned = value.trim().replace(/,/g, '');
  if (!cleaned || cleaned.toLowerCase() === 'unknown' || cleaned.toLowerCase() === 'n/a') {
    return null;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Formats a SWAPI numeric string with a unit (e.g. "172 cm"),
 * returning "Unknown" when the value is not a valid number.
 */
export function formatSwapiMeasurement(value: string, unit: string): string {
  const numeric = parseSwapiNumber(value);
  if (numeric === null) {
    return 'Unknown';
  }
  return `${numeric.toLocaleString()} ${unit}`;
}
