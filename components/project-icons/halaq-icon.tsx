export function HalaqIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    >
      <path d="M4 18v-5M9 18V9M14 18v-6M19 18v-3" strokeLinecap="round" />
      <path
        d="M19 4a2.5 2.5 0 1 0 1.8 4.2A3 3 0 1 1 19 4Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

