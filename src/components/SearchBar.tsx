export interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  resultCount: number;
  totalCount: number;
}

export function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <label htmlFor="character-search" className="search-bar__label">
          Search by name
        </label>
        <div className="search-bar__control">
          <input
            id="character-search"
            type="search"
            className="search-bar__input"
            placeholder="e.g. Skywalker, Vader, Kenobi..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          {value.trim().length > 0 && (
            <button
              type="button"
              className="search-bar__clear"
              onClick={() => onChange('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="search-bar__count" aria-live="polite">
        Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong>{' '}
        characters
      </p>
    </div>
  );
}
