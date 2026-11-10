import { Link } from 'react-router-dom';
import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl, formatSwapiMeasurement } from '../utils/swapiHelpers';

export interface CharacterCardProps {
  character: SwapiCharacter;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function CharacterCard({
  character,
  isFavorite = false,
  onToggleFavorite,
}: CharacterCardProps) {
  const id = extractIdFromUrl(character.url);

  return (
    <article className="character-card">
      <div className="character-card__header">
        <span className="character-card__id">#{id}</span>
        <div className="character-card__header-actions">
          <span className="character-card__badge">{character.birth_year}</span>
          {onToggleFavorite && (
            <button
              type="button"
              className={
                isFavorite
                  ? 'favorite-btn favorite-btn--active'
                  : 'favorite-btn'
              }
              onClick={() => onToggleFavorite(id)}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite
                  ? `Remove ${character.name} from favorites`
                  : `Add ${character.name} to favorites`
              }
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          )}
        </div>
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
