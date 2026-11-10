import { Link } from 'react-router-dom';
import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl, formatSwapiMeasurement } from '../utils/swapiHelpers';

export interface CharacterCardProps {
  character: SwapiCharacter;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const id = extractIdFromUrl(character.url);

  return (
    <article className="character-card">
      <div className="character-card__header">
        <span className="character-card__id">#{id}</span>
        <span className="character-card__badge">{character.birth_year}</span>
      </div>

      <h2 className="character-card__name">
        <Link to={`/characters/${id}`} className="character-card__link">
          {character.name}
        </Link>
      </h2>

      <dl className="character-card__stats">
        <div className="character-card__stat">
          <dt>Gender</dt>
          <dd>{character.gender}</dd>
        </div>
        <div className="character-card__stat">
          <dt>Height</dt>
          <dd>{formatSwapiMeasurement(character.height, 'cm')}</dd>
        </div>
        <div className="character-card__stat">
          <dt>Mass</dt>
          <dd>{formatSwapiMeasurement(character.mass, 'kg')}</dd>
        </div>
        <div className="character-card__stat">
          <dt>Eye Color</dt>
          <dd>{character.eye_color}</dd>
        </div>
      </dl>

      <div className="character-card__footer">
        <span>{character.films.length} Films</span>
        <span>{character.starships.length} Starships</span>
        <Link to={`/characters/${id}`} className="character-card__cta">
          Details &rarr;
        </Link>
      </div>
    </article>
  );
}
