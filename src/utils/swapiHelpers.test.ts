import { describe, expect, it } from 'vitest';
import mockCharactersData from '../data/mockCharacters.json';
import type { SwapiCharacter } from '../types/character';
import {
  compareNumericValues,
  extractIdFromUrl,
  filterCharactersByName,
  formatSwapiMeasurement,
  parseSwapiNumber,
  toggleFavoriteId,
} from './swapiHelpers';

const sampleCharacters: SwapiCharacter[] = mockCharactersData;

describe('swapiHelpers', () => {
  it('extractIdFromUrl extracts the ID from SWAPI URLs with or without trailing slashes', () => {
    expect(extractIdFromUrl('https://swapi.info/api/people/1')).toBe('1');
    expect(extractIdFromUrl('https://swapi.info/api/people/42/')).toBe('42');
    expect(extractIdFromUrl('https://swapi.info/api/starships/12')).toBe('12');
  });

  it('parseSwapiNumber converts numeric strings and comma-formatted numbers into numbers', () => {
    expect(parseSwapiNumber('172')).toBe(172);
    expect(parseSwapiNumber('1,358')).toBe(1358);
    expect(parseSwapiNumber(' 41.9 ')).toBe(41.9);
  });

  it('parseSwapiNumber returns null for unknown, n/a, or invalid strings', () => {
    expect(parseSwapiNumber('unknown')).toBeNull();
    expect(parseSwapiNumber('N/A')).toBeNull();
    expect(parseSwapiNumber('')).toBeNull();
  });

  it('formatSwapiMeasurement formats valid measurements with units and falls back to Unknown', () => {
    expect(formatSwapiMeasurement('172', 'cm')).toBe('172 cm');
    expect(formatSwapiMeasurement('unknown', 'kg')).toBe('Unknown');
  });

  it('filterCharactersByName performs case-insensitive substring filtering and returns all on empty query', () => {
    const skyResult = filterCharactersByName(sampleCharacters, '  SKY ');
    expect(skyResult).toHaveLength(1);
    expect(skyResult[0]?.name).toBe('Luke Skywalker');

    const emptyQueryResult = filterCharactersByName(sampleCharacters, '   ');
    expect(emptyQueryResult).toHaveLength(sampleCharacters.length);

    const noMatchResult = filterCharactersByName(sampleCharacters, 'Mandalorian');
    expect(noMatchResult).toHaveLength(0);
  });

  it('compareNumericValues identifies the higher stat, ties, and unknown values', () => {
    expect(compareNumericValues(202, 172)).toBe('first');
    expect(compareNumericValues(77, 136)).toBe('second');
    expect(compareNumericValues(77, 77)).toBe('tie');
    expect(compareNumericValues(172, null)).toBe('unknown');
  });

  it('toggleFavoriteId adds new IDs and removes existing IDs immutably', () => {
    const afterAdd = toggleFavoriteId(['1', '4'], '10');
    expect(afterAdd).toEqual(['1', '4', '10']);

    const afterRemove = toggleFavoriteId(afterAdd, '4');
    expect(afterRemove).toEqual(['1', '10']);
  });
});
