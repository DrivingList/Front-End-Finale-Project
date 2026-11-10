import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl } from '../utils/swapiHelpers';
import { CharacterCard } from '../components/CharacterCard';
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
  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Star Wars Characters</h1>
        <p className="page-header__subtitle">
          Explore {characters.length > 0 ? characters.length : 'all'} characters from the SWAPI HoloNet archive. Click any character to view their homeworld, films, and starships.
        </p>
      </div>

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

      {!isLoading && !error && (
        <div className="character-grid" aria-label="Star Wars characters">
          {characters.map((character) => {
            const id = extractIdFromUrl(character.url);
            return <CharacterCard key={id} character={character} />;
          })}
        </div>
      )}
    </section>
  );
}
