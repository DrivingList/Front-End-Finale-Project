import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { SwapiCharacter } from './types/character';
import { Navbar } from './components/Navbar';
import { CharactersPage } from './pages/CharactersPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ComparePage } from './pages/ComparePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

const SWAPI_PEOPLE_URL = 'https://swapi.info/api/people';

function App() {
  const [characters, setCharacters] = useState<SwapiCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);

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

  return (
    <div className="app-shell">
      <Navbar />

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
              />
            }
          />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
