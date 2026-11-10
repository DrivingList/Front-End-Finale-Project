# Star Wars Character Explorer

A **React + Vite + TypeScript** master-detail front-end application that explores the Star Wars universe using the public **SWAPI** (`https://swapi.info/api`) archive.

Users can browse Star Wars characters, search by name in real time, open a detailed dossier for any character (including their resolved homeworld planet, film appearances, and piloted starships), save favorite characters to `localStorage`, and compare any two characters side by side.

---

## Features & Pages

| Page | Route | Description |
|---|---|---|
| **Characters (List)** | `/` | Displays the character archive rendered with `.map()`, real-time name search (`SearchBar`), and favorite star toggles (`CharacterCard`). Includes `RECORD #17` to demonstrate SWAPI's live 404 error state when clicked. |
| **Character Details** | `/characters/:id` | Reads `:id` via `useParams` and fetches the character's attributes, homeworld planet (`SwapiPlanet`), films (`SwapiFilm[]`), and starships (`SwapiStarship[]`). |
| **Favorites** | `/favorites` | Displays all starred characters persisted in `localStorage` across page reloads, with one-click removal. |
| **Compare** | `/compare` | Side-by-side comparison (`ComparisonTable`) of any two characters across 9 attributes, highlighting higher numeric stats (`Height`, `Mass`, `Films`, `Starships`, `Vehicles`). |
| **Not Found (404)** | `*` | Friendly fallback page for unknown URLs with a link back to the archive. |

---

## Public API Used

- **SWAPI (`https://swapi.info/api`)** — Free, public, no API key required, CORS enabled.
- Endpoints used:
  - `GET https://swapi.info/api/people` — Full list of Star Wars characters.
  - `GET https://swapi.info/api/people/:id` — Individual character record.
  - `GET https://swapi.info/api/planets/:id` — Character homeworld details.
  - `GET https://swapi.info/api/films/:id` — Film details (`title`, `episode_id`, `director`, `release_date`).
  - `GET https://swapi.info/api/starships/:id` — Piloted starship details (`name`, `model`, `starship_class`).

---

## How to Run the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for production
```bash
npm run build
```

---

## How to Run the Unit Tests (Vitest)

### Run tests in the terminal
```bash
npm test
```

### Run tests in the browser with Vitest UI
```bash
npm run test:ui
```
Then open the full URL printed in the terminal (including `?token=...`) in your browser to view the interactive Vitest UI dashboard.

---

## Project Documentation

- [PRD.md](PRD.md) — Product requirements, pages table, and acceptance criteria.
- [tasks.md](tasks.md) — Step-by-step build tasks and completion criteria.
- [docs/architecture.md](docs/architecture.md) — Component hierarchy, routing, state management, and unit test overview.
- [PROMPTS.md](PROMPTS.md) — Automated prompt log.
