import mockCharactersData from './data/mockCharacters.json';
import type { SwapiCharacter } from './types/character';
import { extractIdFromUrl } from './utils/swapiHelpers';
import { CharacterCard } from './components/CharacterCard';
import './App.css';

const sampleCharacters: SwapiCharacter[] = mockCharactersData;

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-header__eyebrow">HoloNet Archive</p>
        <h1>Star Wars Character Explorer</h1>
        <p className="app-header__subtitle">
          Showing {sampleCharacters.length} sample characters from the archive
        </p>
      </header>

      <main className="app-main">
        <section className="character-grid" aria-label="Star Wars characters">
          {sampleCharacters.map((character) => {
            const id = extractIdFromUrl(character.url);
            return <CharacterCard key={id} character={character} />;
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
