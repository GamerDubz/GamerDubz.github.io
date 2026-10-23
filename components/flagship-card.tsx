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
    <article className="py-10 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="flex items-center gap-3 text-4xl font-semibold tracking-tight text-(--color-ink)">
          {Icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center text-(--color-accent)">
              <Icon className="h-7 w-7" />
            </span>
          )}
          {project.name}
        </h3>
        <p className="text-base text-(--color-ink-faint)">{project.period}</p>
      </div>
      <p className="mt-2 text-base font-medium text-(--color-accent)">{project.role}</p>
      <p className="mt-5 max-w-[62ch] font-reading text-lg leading-[1.7] text-(--color-ink-soft)">
        {project.description}
      </p>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-(--color-ink) underline decoration-(--color-line) decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-(--color-accent) hover:decoration-(--color-accent)"
      >
        {project.liveLabel}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
