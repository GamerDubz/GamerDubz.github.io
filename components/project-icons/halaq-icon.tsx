export function HalaqIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a9822e"
      strokeWidth={1.7}
      className={className}
      aria-hidden="true"
    >
      <path d="M13 4.5a7.5 7.5 0 1 0 0 15 6.5 6.5 0 1 1 0-15Z" />
      <path d="M6.5 17.5v-4M10 17.5V10M13.5 17.5v-6" strokeLinecap="round" />
    </svg>
  );
}
