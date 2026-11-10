import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { SwapiCharacter } from './types/character';
import { toggleFavoriteId } from './utils/swapiHelpers';
import { Navbar } from './components/Navbar';
import { CharactersPage } from './pages/CharactersPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ComparePage } from './pages/ComparePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

const SWAPI_PEOPLE_URL = 'https://swapi.info/api/people';
const FAVORITES_STORAGE_KEY = 'swapi_favorite_character_ids';

function loadInitialFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

function App() {
  const [characters, setCharacters] = useState<SwapiCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadInitialFavoriteIds);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Ignore storage write failures (e.g., private browsing quota)
    }
  }, [favoriteIds]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchCharacters() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(SWAPI_PEOPLE_URL);
        if (!response.ok) {
          throw new Error(
            `SWAPI returned status ${response.status}. Please try again.`,
          );
        }
        const data: SwapiCharacter[] = await response.json();
        if (!isCancelled) {
          setCharacters(data);
        }
      } catch (err) {
        if (!isCancelled) {
          const message =
            err instanceof Error
              ? err.message
              : 'Failed to load Star Wars characters from SWAPI.';
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCharacters();

    return () => {
      isCancelled = true;
    };
  }, [reloadCount]);

  const handleRetry = () => {
    setReloadCount((prev) => prev + 1);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => toggleFavoriteId(prev, id));
  };

  return (
    <div className="app-shell">
      <Navbar favoriteCount={favoriteIds.length} />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <CharactersPage
                characters={characters}
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/characters/:id"
            element={
              <CharacterDetailPage
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                characters={characters}
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/compare"
            element={
              <ComparePage
                characters={characters}
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
