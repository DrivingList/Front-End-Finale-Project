export interface StatusMessageProps {
  variant: 'loading' | 'error';
  title: string;
  message: string;
  onRetry?: () => void;
}

export function StatusMessage({
  variant,
  title,
  message,
  onRetry,
}: StatusMessageProps) {
  return (
    <div
      className={`status-message status-message--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      {variant === 'loading' && (
        <div className="status-message__spinner" aria-hidden="true" />
      )}
      <h2 className="status-message__title">{title}</h2>
      <p className="status-message__text">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="status-message__button"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
