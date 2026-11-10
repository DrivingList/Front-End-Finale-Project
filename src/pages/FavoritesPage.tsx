import { Link } from 'react-router-dom';
import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl } from '../utils/swapiHelpers';
import { CharacterCard } from '../components/CharacterCard';
import { StatusMessage } from '../components/StatusMessage';

export interface FavoritesPageProps {
  characters: SwapiCharacter[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export function FavoritesPage({
  characters,
  isLoading,
  error,
  onRetry,
  favoriteIds,
  onToggleFavorite,
}: FavoritesPageProps) {
  const favoriteCharacters = characters.filter((character) =>
    favoriteIds.includes(extractIdFromUrl(character.url)),
  );

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Favorite Characters</h1>
        <p className="page-header__subtitle">
          Your starred Star Wars characters are saved in your browser so they stay here even after you reload.
        </p>
      </div>

      {isLoading && (
        <StatusMessage
          variant="loading"
          title="Loading Favorites..."
          message="Syncing your saved character IDs with the SWAPI archive."
        />
      )}

      {!isLoading && error && (
        <StatusMessage
          variant="error"
          title="Could Not Load Favorites"
          message={error}
          onRetry={onRetry}
        />
      )}

      {!isLoading && !error && favoriteCharacters.length === 0 && (
        <div className="empty-search-state" role="status">
          <h2>No Favorites Yet</h2>
          <p>
            Click the star button (☆) on any character card or detail page to add them to your favorites.
          </p>
          <Link to="/" className="back-link" style={{ marginTop: '0.5rem' }}>
            &larr; Browse All Characters
          </Link>
        </div>
      )}

      {!isLoading && !error && favoriteCharacters.length > 0 && (
        <div className="character-grid" aria-label="Favorite Star Wars characters">
          {favoriteCharacters.map((character) => {
            const id = extractIdFromUrl(character.url);
            return (
              <CharacterCard
                key={id}
                character={character}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
