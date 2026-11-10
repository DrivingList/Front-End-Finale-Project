import { Link } from 'react-router-dom';

export function FavoritesPage() {
  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Favorite Characters</h1>
        <p className="page-header__subtitle">
          Star your favorite characters from the list or detail page to save them here.
        </p>
      </div>
      <div className="detail-card">
        <p>No favorites saved yet. Browse the archive to star characters.</p>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/" className="back-link">
            &larr; Browse Characters
          </Link>
        </p>
      </div>
    </section>
  );
}
