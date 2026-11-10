import { useState } from 'react';
import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl } from '../utils/swapiHelpers';
import { ComparisonTable } from '../components/ComparisonTable';
import { StatusMessage } from '../components/StatusMessage';

export interface ComparePageProps {
  characters: SwapiCharacter[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function ComparePage({
  characters,
  isLoading,
  error,
  onRetry,
}: ComparePageProps) {
  const [firstId, setFirstId] = useState<string>('1');
  const [secondId, setSecondId] = useState<string>('4');

  const firstCharacter =
    characters.find((char) => extractIdFromUrl(char.url) === firstId) ??
    characters[0];
  const secondCharacter =
    characters.find((char) => extractIdFromUrl(char.url) === secondId) ??
    characters[1] ??
    characters[0];

  const handleSwap = () => {
    if (!firstCharacter || !secondCharacter) return;
    const currentFirst = extractIdFromUrl(firstCharacter.url);
    const currentSecond = extractIdFromUrl(secondCharacter.url);
    setFirstId(currentSecond);
    setSecondId(currentFirst);
  };

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Compare Characters</h1>
        <p className="page-header__subtitle">
          Select any two Star Wars characters to compare their physical attributes, film appearances, and piloted starships side by side.
        </p>
      </div>

      {isLoading && (
        <StatusMessage
          variant="loading"
          title="Preparing Comparison Matrix..."
          message="Loading character records from SWAPI."
        />
      )}

      {!isLoading && error && (
        <StatusMessage
          variant="error"
          title="Could Not Load Characters for Comparison"
          message={error}
          onRetry={onRetry}
        />
      )}

      {!isLoading && !error && firstCharacter && secondCharacter && (
        <>
          <div className="compare-controls">
            <div className="compare-selector">
              <label htmlFor="compare-first" className="search-bar__label">
                First Character
              </label>
              <select
                id="compare-first"
                className="compare-selector__select"
                value={extractIdFromUrl(firstCharacter.url)}
                onChange={(event) => setFirstId(event.target.value)}
              >
                {characters.map((char) => {
                  const id = extractIdFromUrl(char.url);
                  return (
                    <option key={id} value={id}>
                      #{id} — {char.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="button"
              className="compare-swap-btn"
              onClick={handleSwap}
              title="Swap characters"
            >
              &#8646; Swap
            </button>

            <div className="compare-selector">
              <label htmlFor="compare-second" className="search-bar__label">
                Second Character
              </label>
              <select
                id="compare-second"
                className="compare-selector__select"
                value={extractIdFromUrl(secondCharacter.url)}
                onChange={(event) => setSecondId(event.target.value)}
              >
                {characters.map((char) => {
                  const id = extractIdFromUrl(char.url);
                  return (
                    <option key={id} value={id}>
                      #{id} — {char.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <ComparisonTable
            firstCharacter={firstCharacter}
            secondCharacter={secondCharacter}
          />
        </>
      )}
    </section>
  );
}
