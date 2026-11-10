import { Link } from 'react-router-dom';
import type { SwapiCharacter } from '../types/character';
import {
  compareNumericValues,
  extractIdFromUrl,
  formatSwapiMeasurement,
  parseSwapiNumber,
  type StatComparisonWinner,
} from '../utils/swapiHelpers';

export interface ComparisonTableProps {
  firstCharacter: SwapiCharacter;
  secondCharacter: SwapiCharacter;
}

interface ComparisonRow {
  label: string;
  firstDisplay: string;
  secondDisplay: string;
  winner: StatComparisonWinner;
}

export function ComparisonTable({
  firstCharacter,
  secondCharacter,
}: ComparisonTableProps) {
  const firstId = extractIdFromUrl(firstCharacter.url);
  const secondId = extractIdFromUrl(secondCharacter.url);

  const firstHeight = parseSwapiNumber(firstCharacter.height);
  const secondHeight = parseSwapiNumber(secondCharacter.height);

  const firstMass = parseSwapiNumber(firstCharacter.mass);
  const secondMass = parseSwapiNumber(secondCharacter.mass);

  const firstFilmsCount = firstCharacter.films.length;
  const secondFilmsCount = secondCharacter.films.length;

  const firstShipsCount = firstCharacter.starships.length;
  const secondShipsCount = secondCharacter.starships.length;

  const firstVehiclesCount = firstCharacter.vehicles.length;
  const secondVehiclesCount = secondCharacter.vehicles.length;

  const rows: ComparisonRow[] = [
    {
      label: 'Height',
      firstDisplay: formatSwapiMeasurement(firstCharacter.height, 'cm'),
      secondDisplay: formatSwapiMeasurement(secondCharacter.height, 'cm'),
      winner: compareNumericValues(firstHeight, secondHeight),
    },
    {
      label: 'Mass',
      firstDisplay: formatSwapiMeasurement(firstCharacter.mass, 'kg'),
      secondDisplay: formatSwapiMeasurement(secondCharacter.mass, 'kg'),
      winner: compareNumericValues(firstMass, secondMass),
    },
    {
      label: 'Films Appeared In',
      firstDisplay: `${firstFilmsCount} films`,
      secondDisplay: `${secondFilmsCount} films`,
      winner: compareNumericValues(firstFilmsCount, secondFilmsCount),
    },
    {
      label: 'Starships Piloted',
      firstDisplay: `${firstShipsCount} starships`,
      secondDisplay: `${secondShipsCount} starships`,
      winner: compareNumericValues(firstShipsCount, secondShipsCount),
    },
    {
      label: 'Vehicles Piloted',
      firstDisplay: `${firstVehiclesCount} vehicles`,
      secondDisplay: `${secondVehiclesCount} vehicles`,
      winner: compareNumericValues(firstVehiclesCount, secondVehiclesCount),
    },
    {
      label: 'Birth Year',
      firstDisplay: firstCharacter.birth_year,
      secondDisplay: secondCharacter.birth_year,
      winner: 'unknown',
    },
    {
      label: 'Gender',
      firstDisplay: firstCharacter.gender,
      secondDisplay: secondCharacter.gender,
      winner: 'unknown',
    },
    {
      label: 'Eye Color',
      firstDisplay: firstCharacter.eye_color,
      secondDisplay: secondCharacter.eye_color,
      winner: 'unknown',
    },
    {
      label: 'Hair Color',
      firstDisplay: firstCharacter.hair_color,
      secondDisplay: secondCharacter.hair_color,
      winner: 'unknown',
    },
  ];

  return (
    <div className="comparison-card">
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th scope="col" className="comparison-table__attr-col">
                Attribute
              </th>
              <th scope="col" className="comparison-table__char-col">
                <span className="character-card__id">#{firstId}</span>
                <Link
                  to={`/characters/${firstId}`}
                  className="comparison-table__char-link"
                >
                  {firstCharacter.name}
                </Link>
              </th>
              <th scope="col" className="comparison-table__char-col">
                <span className="character-card__id">#{secondId}</span>
                <Link
                  to={`/characters/${secondId}`}
                  className="comparison-table__char-link"
                >
                  {secondCharacter.name}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const firstIsWinner = row.winner === 'first';
              const secondIsWinner = row.winner === 'second';

              return (
                <tr key={row.label}>
                  <th scope="row" className="comparison-table__label">
                    {row.label}
                  </th>
                  <td
                    className={
                      firstIsWinner
                        ? 'comparison-table__value comparison-table__value--winner'
                        : 'comparison-table__value'
                    }
                  >
                    <span>{row.firstDisplay}</span>
                    {firstIsWinner && (
                      <span className="comparison-table__winner-tag">Higher</span>
                    )}
                  </td>
                  <td
                    className={
                      secondIsWinner
                        ? 'comparison-table__value comparison-table__value--winner'
                        : 'comparison-table__value'
                    }
                  >
                    <span>{row.secondDisplay}</span>
                    {secondIsWinner && (
                      <span className="comparison-table__winner-tag">Higher</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
