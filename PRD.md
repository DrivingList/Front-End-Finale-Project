# PRD: Star Wars Character Explorer

## Who it's for and why
Star Wars fans who want to look up information about their favorite characters:
find them fast, see the details, compare two characters, and keep a list of favorites.

## Data
- API: SWAPI (`https://swapi.info/api`), free, no key, CORS open.
- Endpoints: `/people` (82 characters), `/people/:id`, plus the planet, film and starship URLs in each character.
- SWAPI has no `id` field, so the id is extracted from the character's `url`.
- Numbers like height and mass arrive as strings (some are `"unknown"`), so they are converted in code.

## Pages
| Page | URL | What the user does or sees |
|---|---|---|
| Characters (list) | `/` | A list of all characters, a name search box, and a star button on each one |
| Character details | `/characters/:id` | Birth year, gender, height, mass, home planet, films, and the starships they piloted |
| Favorites | `/favorites` | The characters the user starred, with a remove option. Saved in `localStorage` |
| Compare | `/compare` | Pick 2 characters and see their attributes side by side |
| Not found (bonus) | `*` | A message and a link back home for URLs that don't exist |

A nav menu (`NavLink`) appears on every page.

## When I…, I see…
1. When I open the app, I see a loading message, then a list of characters.
2. When I type "sky" in the search box, I see only characters whose name contains "sky".
3. When I click a character, I see the URL change to `/characters/1` and their full details, including the planet name and the starship names.
4. When I star a character and reload the page, I still see them in Favorites.
5. When I pick Luke and Vader on the Compare page, I see their height, mass and number of films next to each other.
6. When the network fails, I see an error message instead of a blank screen.

## Out of scope
Server, login, Redux, UI libraries, separate pages for starships.

## Technical decisions
React + Vite + TypeScript, React Router, plain CSS, Vitest (+ `@vitest/ui`).
State: favorites live in one place (the top-level `App`) so every page can read them.
See [docs/architecture.md](docs/architecture.md) for the full component hierarchy, routing, and data flow.
