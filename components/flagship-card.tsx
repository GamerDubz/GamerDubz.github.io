import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { FlagshipProject } from "@/lib/content/flagship";
import { withBasePath } from "@/lib/base-path";

export function FlagshipCard({ project }: { project: FlagshipProject }) {
  return (
    <article className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-8 transition-transform duration-300 hover:-translate-y-1.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-(--color-bg)">
            <Image src={withBasePath(project.iconSrc)} alt="" width={28} height={28} aria-hidden="true" />
          </span>
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
