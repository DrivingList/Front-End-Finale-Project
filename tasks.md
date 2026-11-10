# Tasks: Star Wars Character Explorer

Build order follows the course workflow: local JSON first, then routing, live API fetch, unit tests, and finally search, extra pages, styling, and documentation.
Work on **one task at a time**, test in the browser, and commit after each task.

---

## [x] Task 1: Local sample data, TypeScript types, and character list
- Create `src/types/character.ts` with interfaces for SWAPI character, planet, film, and starship data (no `any`).
- Create `src/utils/swapiHelpers.ts` with helper functions (`extractIdFromUrl`, `parseSwapiNumber`).
- Create `src/data/mockCharacters.json` with a sample list of Star Wars characters matching the SWAPI structure.
- Create `src/components/CharacterCard.tsx` (in its own file with typed props) and render the list in `src/App.tsx` using `.map()` with a unique `key`.
- **Done when:** `npm run dev` shows the list of sample characters from the local JSON file with zero console errors, and `npm run build` succeeds.

## [x] Task 2: Routing with React Router, navbar, and character detail page
- Install `react-router-dom`.
- Create `src/components/Navbar.tsx` using `NavLink` for navigation between Characters (`/`), Favorites (`/favorites`), and Compare (`/compare`).
- Create `src/pages/CharactersPage.tsx` (`/`), `src/pages/CharacterDetailPage.tsx` (`/characters/:id` using `useParams`), placeholder pages for `/favorites` and `/compare`, and `src/pages/NotFoundPage.tsx` (`*`).
- **Done when:** Clicking a character card opens `/characters/:id` and shows that character's details from the sample data, and the navigation bar switches between all pages without reloading the browser.

## [x] Task 3: Live SWAPI fetch with loading and error states
- Replace the local JSON data with `fetch` inside `useEffect` calling `https://swapi.info/api/people`.
- On `CharacterDetailPage`, fetch the character (`https://swapi.info/api/people/:id`) along with their homeworld, films, and starships URLs.
- Create `src/components/StatusMessage.tsx` to display clear **loading** and **error** states on screen.
- **Done when:** The list and detail pages display real data from SWAPI (including resolved planet name, film titles, and starship names + models), and loading/error states work properly.

## [x] Task 4: Unit tests with Vitest and Vitest UI
- Install `vitest` and `@vitest/ui`, and add `"test": "vitest run"` and `"test:ui": "vitest --ui"` scripts to `package.json`.
- Add helper functions in `src/utils/swapiHelpers.ts` for filtering characters by name and comparing two characters' stats.
- Create `src/utils/swapiHelpers.test.ts` with at least 5 unit tests testing real logic: `extractIdFromUrl`, `parseSwapiNumber` (including `"unknown"` and comma values), `filterCharactersByName`, and `compareStat`.
- **Done when:** `npm test` passes all unit tests (5+ tests) and `npm run test:ui` launches the Vitest browser UI.

## [x] Task 5: Search bar for filtering characters
- Create `src/components/SearchBar.tsx` with typed props (`value`, `onChange`, `resultCount`, `totalCount`).
- Connect `SearchBar` to `CharactersPage` using `filterCharactersByName` so typing filters the character list in real time.
- Show a friendly message when no characters match the search query, with a button to clear the search.
- **Done when:** Typing `"sky"` in the search box shows only matching characters (e.g., Luke Skywalker, Anakin Skywalker, Shmi Skywalker), and clearing the input restores all 82 characters.

## [x] Task 6: Favorites state with `localStorage` and Favorites page
- Create a favorites hook/state at the top level (`App.tsx`) backed by `localStorage` so starred character IDs persist across page reloads.
- Pass `isFavorite` and `onToggleFavorite` props to `CharacterCard` and `CharacterDetailPage`.
- Build `src/pages/FavoritesPage.tsx` (`/favorites`) showing all starred characters with the option to view details or remove them from favorites.
- **Done when:** Starring a character highlights its star button, shows it on `/favorites`, and keeps it saved after refreshing the page.

## [x] Task 7: Compare page and comparison table component
- Create `src/components/ComparisonTable.tsx` (with typed props) that displays two characters side by side: height, mass, birth year, gender, eye/hair color, number of films, and number of starships, highlighting higher numeric stats.
- Build `src/pages/ComparePage.tsx` (`/compare`) allowing the user to select any two characters from dropdowns and view `ComparisonTable`.
- **Done when:** Selecting two characters (e.g., Luke Skywalker and Darth Vader) on `/compare` displays their stats side by side and highlights the taller/heavier/more-featured character.

## [x] Task 8: Custom Star Wars CSS and responsive mobile layout
- Style the application with custom CSS (dark galaxy background, gold/cyan accents, readable cards, badges for films and starships, accessible contrast).
- Add responsive media queries so the navbar, character grid, detail view, and comparison table adapt cleanly to narrow mobile screens.
- **Done when:** The app looks polished on both desktop and narrow screens (~375px wide) with no horizontal scrolling or overlapping text.

## [ ] Task 9: Architecture documentation and final `README.md`
- Create `docs/architecture.md` explaining the folder structure, component hierarchy, routing, and state flow (and link to it from `PRD.md`) to support the project defense.
- Rewrite `README.md` with what the app does, which API it uses (`https://swapi.info/api`), and how to run the app (`npm run dev`, `npm run build`) and tests (`npm test`, `npm run test:ui`).
- **Done when:** `README.md` and `docs/architecture.md` are complete, `npm run build` passes with zero errors, and `npm test` passes all tests.
