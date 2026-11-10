export interface SwapiCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPlanet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  url: string;
}

export interface SwapiFilm {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  url: string;
}

export interface SwapiStarship {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  url: string;
}
