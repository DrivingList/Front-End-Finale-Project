import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type {
  SwapiCharacter,
  SwapiFilm,
  SwapiPlanet,
  SwapiStarship,
} from '../types/character';
import { formatSwapiMeasurement } from '../utils/swapiHelpers';
import { StatusMessage } from '../components/StatusMessage';

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<SwapiCharacter | null>(null);
  const [homeworld, setHomeworld] = useState<SwapiPlanet | null>(null);
  const [films, setFilms] = useState<SwapiFilm[]>([]);
  const [starships, setStarships] = useState<SwapiStarship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    if (!id) {
      setError('Missing character ID in URL.');
      setIsLoading(false);
      return;
    }

    const characterId: string = id;
    let isCancelled = false;

    async function loadCharacterDossier() {
      setIsLoading(true);
      setError(null);

      try {
        const charResponse = await fetch(
          `https://swapi.info/api/people/${encodeURIComponent(characterId)}`,
        );
        if (!charResponse.ok) {
          throw new Error(
            `Could not find character #${characterId} (status ${charResponse.status}).`,
          );
        }
        const charData: SwapiCharacter = await charResponse.json();

        const planetPromise: Promise<SwapiPlanet | null> = charData.homeworld
          ? fetch(charData.homeworld).then((res) =>
              res.ok ? (res.json() as Promise<SwapiPlanet>) : null,
            )
          : Promise.resolve(null);

        const filmsPromise: Promise<SwapiFilm[]> = Promise.all(
          charData.films.map(async (filmUrl) => {
            const res = await fetch(filmUrl);
            if (!res.ok) {
              throw new Error('Failed to load film details.');
            }
            return (await res.json()) as SwapiFilm;
          }),
        );

        const starshipsPromise: Promise<SwapiStarship[]> = Promise.all(
          charData.starships.map(async (shipUrl) => {
            const res = await fetch(shipUrl);
            if (!res.ok) {
              throw new Error('Failed to load starship details.');
            }
            return (await res.json()) as SwapiStarship;
          }),
        );

        const [planetData, filmsData, starshipsData] = await Promise.all([
          planetPromise,
          filmsPromise,
          starshipsPromise,
        ]);

        if (isCancelled) return;

        filmsData.sort((a, b) => a.episode_id - b.episode_id);

        setCharacter(charData);
        setHomeworld(planetData);
        setFilms(filmsData);
        setStarships(starshipsData);
      } catch (err) {
        if (isCancelled) return;
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to load character dossier from SWAPI.';
        setError(message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadCharacterDossier();

    return () => {
      isCancelled = true;
    };
  }, [id, reloadCount]);

  return (
    <section className="page-section">
      <div className="detail-nav">
        <Link to="/" className="back-link">
          &larr; Back to Characters
        </Link>
      </div>

      {isLoading && (
        <StatusMessage
          variant="loading"
          title={`Loading Dossier #${id}...`}
          message="Retrieving character attributes, homeworld, films, and piloted starships from SWAPI."
        />
      )}

      {!isLoading && error && (
        <StatusMessage
          variant="error"
          title="Could Not Load Character"
          message={error}
          onRetry={() => setReloadCount((prev) => prev + 1)}
        />
      )}

      {!isLoading && !error && character && (
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
              <dd>
                {homeworld
                  ? `${homeworld.name} (${homeworld.terrain})`
                  : 'Unknown'}
              </dd>
            </div>
          </dl>

          <div className="detail-sections">
            <div className="detail-subcard">
              <h2>Films ({films.length})</h2>
              {films.length === 0 ? (
                <p className="detail-empty">No films recorded.</p>
              ) : (
                <ul className="detail-item-list">
                  {films.map((film) => (
                    <li key={film.url} className="detail-item-row">
                      <span className="detail-item-row__title">
                        Episode {film.episode_id}: {film.title}
                      </span>
                      <span className="detail-item-row__meta">
                        {film.release_date.slice(0, 4)} &middot; Dir. {film.director}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="detail-subcard">
              <h2>Starships Piloted ({starships.length})</h2>
              {starships.length === 0 ? (
                <p className="detail-empty">
                  No starships recorded for this character.
                </p>
              ) : (
                <ul className="detail-item-list">
                  {starships.map((ship) => (
                    <li key={ship.url} className="detail-item-row">
                      <span className="detail-item-row__title">{ship.name}</span>
                      <span className="detail-item-row__meta">
                        {ship.model} &middot; {ship.starship_class}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
