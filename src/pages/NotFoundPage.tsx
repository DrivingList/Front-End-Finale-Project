import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="page-section detail-card">
      <h1>404 &mdash; Sector Not Found</h1>
      <p className="page-header__subtitle">
        These aren&apos;t the coordinates you&apos;re looking for. This route does not exist in the HoloNet archive.
      </p>
      <p style={{ marginTop: '1.25rem' }}>
        <Link to="/" className="back-link">
          &larr; Return to Characters Archive
        </Link>
      </p>
    </section>
  );
}
