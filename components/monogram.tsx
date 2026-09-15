export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Ubaid Desai"
    >
      <circle cx="32" cy="32" r="21" stroke="currentColor" strokeWidth={2.5} />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="22"
        fontFamily="var(--font-serif), Georgia, serif"
        fill="currentColor"
      >
        UD
      </text>
    </svg>
  );
}
