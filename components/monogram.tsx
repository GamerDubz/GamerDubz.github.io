export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Ubaid Desai"
    >
      <path
        d="M7 6v13a6 6 0 0 0 12 0V6"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path
        d="M17 26 27 6"
        stroke="var(--color-accent)"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
