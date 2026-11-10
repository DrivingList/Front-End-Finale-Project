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
}

export function CharactersPage({
  characters,
  isLoading,
  error,
  onRetry,
}: CharactersPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCharacters = filterCharactersByName(characters, searchQuery);

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Star Wars Characters</h1>
        <p className="page-header__subtitle">
          Explore {characters.length > 0 ? characters.length : 'all'} characters from the SWAPI HoloNet archive. Click any character to view their homeworld, films, and starships.
        </p>
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
            return <CharacterCard key={id} character={character} />;
          })}
        </div>
      )}
    </section>
  );
}
