export function FlightPathIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.8 2.3 2.8 15 0 17M12 3.5c-2.8 2.3-2.8 15 0 17" />
      <path d="M6 7l3 -2.2M18 17l-3 2.2" strokeLinecap="round" />
    </svg>
  );
}
