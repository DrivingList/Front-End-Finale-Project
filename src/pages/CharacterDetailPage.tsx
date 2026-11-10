import { Link, useParams } from 'react-router-dom';
import type { SwapiCharacter } from '../types/character';
import { extractIdFromUrl, formatSwapiMeasurement } from '../utils/swapiHelpers';

export interface CharacterDetailPageProps {
  characters: SwapiCharacter[];
}

export function CharacterDetailPage({ characters }: CharacterDetailPageProps) {
  const { id } = useParams<{ id: string }>();

  const character = characters.find(
    (item) => extractIdFromUrl(item.url) === id,
  );

  if (!character) {
    return (
      <section className="page-section detail-card">
        <h1>Character Not Found</h1>
        <p className="page-header__subtitle">
          No character with archive ID <code>#{id}</code> was found in the current records.
        </p>
        <p style={{ marginTop: '1.25rem' }}>
          <Link to="/" className="back-link">
            &larr; Back to Characters
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="detail-nav">
        <Link to="/" className="back-link">
          &larr; Back to Characters
        </Link>
      </div>

      <article className="detail-card">
        <div className="detail-card__header">
          <div>
            <span className="character-card__id">Archive ID #{id}</span>
            <h1>{character.name}</h1>
          </div>
          <span className="character-card__badge">{character.birth_year}</span>
        </div>

        <dl className="detail-stats-grid">
          <div className="detail-stat-box">
            <dt>Birth Year</dt>
            <dd>{character.birth_year}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Gender</dt>
            <dd>{character.gender}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Height</dt>
            <dd>{formatSwapiMeasurement(character.height, 'cm')}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Mass</dt>
            <dd>{formatSwapiMeasurement(character.mass, 'kg')}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Hair Color</dt>
            <dd>{character.hair_color}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Eye Color</dt>
            <dd>{character.eye_color}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Skin Color</dt>
            <dd>{character.skin_color}</dd>
          </div>
          <div className="detail-stat-box">
            <dt>Homeworld</dt>
            <dd>Planet #{extractIdFromUrl(character.homeworld)}</dd>
          </div>
        </dl>

        <div className="detail-sections">
          <div className="detail-subcard">
            <h2>Films ({character.films.length})</h2>
            <ul className="detail-pill-list">
              {character.films.map((filmUrl) => (
                <li key={filmUrl} className="detail-pill">
                  Film #{extractIdFromUrl(filmUrl)}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-subcard">
            <h2>Starships Piloted ({character.starships.length})</h2>
            {character.starships.length === 0 ? (
              <p className="detail-empty">No starships recorded for this character.</p>
            ) : (
              <ul className="detail-pill-list">
                {character.starships.map((shipUrl) => (
                  <li key={shipUrl} className="detail-pill">
                    Starship #{extractIdFromUrl(shipUrl)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
