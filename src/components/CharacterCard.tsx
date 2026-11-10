import { Link } from 'react-router-dom';
import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl, formatSwapiMeasurement } from '../utils/swapiHelpers';

export interface CharacterCardProps {
  character: SwapiCharacter;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

function getCharacterInitials(name: string): string {
  const parts = name.trim().split(/[\s-]+/);
  if (parts.length === 1) {
    return (parts[0] ?? '').slice(0, 2).toUpperCase();
  }
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}

export function CharacterCard({
  character,
  isFavorite = false,
  onToggleFavorite,
}: CharacterCardProps) {
  const id = extractIdFromUrl(character.url);
  const initials = getCharacterInitials(character.name);

  return (
    <article
      className={
        isFavorite
          ? 'character-card character-card--favorited'
          : 'character-card'
      }
    >
      <div className="character-card__header">
        <span className="character-card__id">RECORD #{id}</span>
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

      <div className="character-card__identity">
        <div className="character-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <h2 className="character-card__name">
          <Link to={`/characters/${id}`} className="character-card__link">
            {character.name}
          </Link>
        </h2>
      </div>

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
        <div className="character-card__chips">
          <span className="character-card__chip">
            {character.films.length} Films
          </span>
          <span className="character-card__chip">
            {character.starships.length} Ships
          </span>
        </div>
        <Link to={`/characters/${id}`} className="character-card__cta">
          Open Dossier &rarr;
        </Link>
      </div>
    </article>
  );
}
