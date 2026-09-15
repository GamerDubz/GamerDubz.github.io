import { ArrowUpRight } from "lucide-react";
import type { FlagshipProject } from "@/lib/content/flagship";

export function FlagshipCard({ project }: { project: FlagshipProject }) {
  return (
    <article className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-8 transition-transform duration-300 hover:-translate-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif-display text-2xl font-medium text-(--color-ink)">{project.name}</h3>
        <span className="text-sm text-(--color-ink-faint)">{project.period}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-(--color-accent)">{project.role}</p>
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
