import type { SwapiCharacter } from '../types/character';

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

/**
 * Filters a list of SWAPI characters by name (case-insensitive substring match).
 */
export function filterCharactersByName(
  characters: SwapiCharacter[],
  query: string,
): SwapiCharacter[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return characters;
  }
  return characters.filter((character) =>
    character.name.toLowerCase().includes(normalizedQuery),
  );
}

export type StatComparisonWinner = 'first' | 'second' | 'tie' | 'unknown';

/**
 * Compares two numeric values (or null if unknown) and returns which side has the higher value.
 */
export function compareNumericValues(
  firstValue: number | null,
  secondValue: number | null,
): StatComparisonWinner {
  if (firstValue === null || secondValue === null) {
    return 'unknown';
  }
  if (firstValue > secondValue) {
    return 'first';
  }
  if (secondValue > firstValue) {
    return 'second';
  }
  return 'tie';
}

/**
 * Adds a character ID to the favorites list if not present, or removes it if already present.
 */
export function toggleFavoriteId(
  currentIds: string[],
  targetId: string,
): string[] {
  if (currentIds.includes(targetId)) {
    return currentIds.filter((id) => id !== targetId);
  }
  return [...currentIds, targetId];
}

/**
 * SWAPI's /people endpoint skips ID #17 (goes from #16 Jabba to #18 Wedge).
 * Inserts a placeholder record for #17 so the archive sequence is continuous
 * and clicking #17 demonstrates the 404 error state from SWAPI (/api/people/17).
 */
export function withMissingSwapiRecord17(
  characters: SwapiCharacter[],
): SwapiCharacter[] {
  const has17 = characters.some(
    (char) => extractIdFromUrl(char.url) === '17',
  );
  if (has17) {
    return characters;
  }

  const indexAfter16 = characters.findIndex(
    (char) => extractIdFromUrl(char.url) === '16',
  );
  if (indexAfter16 === -1) {
    return characters;
  }

  const corruptedRecord17: SwapiCharacter = {
    name: 'Unindexed Record #17 (404)',
    height: 'unknown',
    mass: 'unknown',
    hair_color: 'unknown',
    skin_color: 'unknown',
    eye_color: 'unknown',
    birth_year: 'REDACTED',
    gender: 'unknown',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: 'https://swapi.info/api/people/17',
  };

  return [
    ...characters.slice(0, indexAfter16 + 1),
    corruptedRecord17,
    ...characters.slice(indexAfter16 + 1),
  ];
}
