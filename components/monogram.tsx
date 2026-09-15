export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Ubaid Desai"
    >
      <rect x="1.5" y="1.5" width="29" height="29" rx="7.5" stroke="currentColor" strokeWidth={1.4} />
      <path
        d="M10 10v7a6 6 0 0 0 6 6h1a5 5 0 0 0 5-5v-1a5 5 0 0 0-5-5h-3"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <circle cx="22" cy="17" r="1.6" fill="var(--color-accent)" />
    </svg>
  );
}
