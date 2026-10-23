import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const PAGE_BUTTON =
  "flex h-11 w-11 items-center justify-center rounded-md bg-(--color-ink) text-(--color-bg) transition-colors duration-200 hover:bg-(--color-accent) active:bg-(--color-ink) disabled:opacity-30 disabled:hover:bg-(--color-ink)";

export function PaginationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="mt-6 flex items-center gap-4 border-t border-(--color-line) pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 0}
        aria-label="Previous projects"
        className={PAGE_BUTTON}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <span className="text-base font-medium tabular-nums text-(--color-ink-faint)">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next projects"
        className={PAGE_BUTTON}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
