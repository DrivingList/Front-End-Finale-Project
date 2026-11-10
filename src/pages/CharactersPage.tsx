import { useState } from 'react';
import type { SwapiCharacter } from '../types/character';
import {
  extractIdFromUrl,
  filterCharactersByName,
} from '../utils/swapiHelpers';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { StatusMessage } from '../components/StatusMessage';

export interface CharactersPageProps {
  characters: SwapiCharacter[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export function CharactersPage({
  characters,
  isLoading,
  error,
  onRetry,
  favoriteIds,
  onToggleFavorite,
}: CharactersPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCharacters = filterCharactersByName(characters, searchQuery);

  return (
    <section className="page-section">
      <div className="hero-banner">
        <div className="hero-banner__content">
          <span className="hero-banner__tag">
            GALACTIC HOLONET DATABANK // SECTOR 7G
          </span>
          <h1>Star Wars Character Explorer</h1>
          <p className="page-header__subtitle">
            Browse intelligence dossiers across the galaxy. Inspect homeworlds, film appearances, and piloted starships, or star characters to build your personal squad.
          </p>
        </div>
        <div className="hero-banner__stats">
          <div className="hero-stat">
            <span className="hero-stat__value">
              {characters.length > 0 ? characters.length : '82'}
            </span>
            <span className="hero-stat__label">Total Records</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__value">{favoriteIds.length}</span>
            <span className="hero-stat__label">Starred</span>
          </div>
        </div>
      </div>

      {!isLoading && !error && (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredCharacters.length}
          totalCount={characters.length}
        />
      )}

      {isLoading && (
        <StatusMessage
          variant="loading"
          title="Scanning the HoloNet Archive..."
          message="Fetching Star Wars character records from SWAPI."
        />
      )}

      {!isLoading && error && (
        <StatusMessage
          variant="error"
          title="Transmission Interrupted"
          message={error}
          onRetry={onRetry}
        />
      )}

      {!isLoading && !error && filteredCharacters.length === 0 && (
        <div className="empty-search-state" role="status">
          <h2>No Matching Characters</h2>
          <p>
            No characters in the archive matched{' '}
            <code>&ldquo;{searchQuery}&rdquo;</code>.
          </p>
          <button
            type="button"
            className="status-message__button"
            onClick={() => setSearchQuery('')}
          >
            Reset Search
          </button>
        </div>
      )}

      {!isLoading && !error && filteredCharacters.length > 0 && (
        <div className="character-grid" aria-label="Star Wars characters">
          {filteredCharacters.map((character) => {
            const id = extractIdFromUrl(character.url);
            return (
              <CharacterCard
                key={id}
                character={character}
                isFavorite={favoriteIds.includes(id)}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
