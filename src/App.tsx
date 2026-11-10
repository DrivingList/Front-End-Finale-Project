import { Routes, Route } from 'react-router-dom';
import mockCharactersData from './data/mockCharacters.json';
import type { SwapiCharacter } from './types/character';
import { Navbar } from './components/Navbar';
import { CharactersPage } from './pages/CharactersPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ComparePage } from './pages/ComparePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

const sampleCharacters: SwapiCharacter[] = mockCharactersData;

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<CharactersPage characters={sampleCharacters} />}
          />
          <Route
            path="/characters/:id"
            element={<CharacterDetailPage characters={sampleCharacters} />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
