import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export function PaginationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 0}
        aria-label="Previous projects"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) disabled:opacity-30"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <span className="text-sm font-medium text-(--color-ink-faint)">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next projects"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line) text-(--color-ink) disabled:opacity-30"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
