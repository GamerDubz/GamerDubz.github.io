export function SvgTo3dIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    >
      <path d="M4 6h6v6H4z" />
      <path d="M13 9l4 -2.3 4 2.3v6l-4 2.3 -4 -2.3z" />
      <path d="M13 9l4 2.3 4 -2.3M17 11.3v6" />
    </svg>
  );
}
