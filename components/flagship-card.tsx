import { ArrowUpRight } from "lucide-react";
import type { FlagshipProject } from "@/lib/content/flagship";
import { YanaIcon } from "./flagship-icons/yana-icon";
import { DosestreaksIcon } from "./flagship-icons/dosestreaks-icon";
import { QromaIcon } from "./flagship-icons/qroma-icon";

const FLAGSHIP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Yana: YanaIcon,
  DoseStreaks: DosestreaksIcon,
  Qroma: QromaIcon,
};

export function FlagshipCard({ project }: { project: FlagshipProject }) {
  const Icon = FLAGSHIP_ICONS[project.name];

  return (
    <article className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-8 transition-transform duration-300 hover:-translate-y-1.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--color-bg) text-(--color-accent)">
              <Icon className="h-[22px] w-[22px]" />
            </span>
          )}
          <h3 className="font-serif-display text-2xl font-medium text-(--color-ink)">{project.name}</h3>
        </div>
        <span className="text-sm text-(--color-ink-faint)">{project.period}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-(--color-accent)">{project.role}</p>
      <p className="mt-4 text-base leading-relaxed text-(--color-ink-soft)">
        {project.description}
      </p>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-ink) hover:text-(--color-accent)"
      >
        {project.liveLabel}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
