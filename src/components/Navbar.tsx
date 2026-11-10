import { NavLink } from 'react-router-dom';

export interface NavbarProps {
  favoriteCount?: number;
}

export function Navbar({ favoriteCount = 0 }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__eyebrow">HoloNet Archive</span>
        <NavLink to="/" className="navbar__title">
          Star Wars Explorer
        </NavLink>
      </div>

      <nav className="navbar__links" aria-label="Primary navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Characters
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Favorites
          {favoriteCount > 0 && (
            <span className="navbar__badge">{favoriteCount}</span>
          )}
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Compare
        </NavLink>
      </nav>
    </header>
  );
}
