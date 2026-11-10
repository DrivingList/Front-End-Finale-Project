import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl } from '../utils/swapiHelpers';
import { CharacterCard } from '../components/CharacterCard';

export interface CharactersPageProps {
  characters: SwapiCharacter[];
}

export function CharactersPage({ characters }: CharactersPageProps) {
  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Star Wars Characters</h1>
        <p className="page-header__subtitle">
          Showing {characters.length} characters from the archive. Click a character to inspect their full dossier.
        </p>
      </div>

      <div className="character-grid" aria-label="Star Wars characters">
        {characters.map((character) => {
          const id = extractIdFromUrl(character.url);
          return <CharacterCard key={id} character={character} />;
        })}
      </div>
    </section>
  );
}
