import Image from "next/image";
import { ArrowUpRight, Code } from "lucide-react";
import type { Project } from "@/lib/content/projects";
import { EuropeanNightsIcon } from "./project-icons/european-nights-icon";
import { FlightPathIcon } from "./project-icons/flight-path-icon";
import { SvgTo3dIcon } from "./project-icons/svg-to-3d-icon";
import { ThefixsirIcon } from "./project-icons/thefixsir-icon";
import { HalaqIcon } from "./project-icons/halaq-icon";

const FALLBACK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  thefixsir: ThefixsirIcon,
  "european-nights": EuropeanNightsIcon,
  "flight-path-app": FlightPathIcon,
  "svg-to-3d-converter": SvgTo3dIcon,
  halaq: HalaqIcon,
};

export function ProjectCard({ project }: { project: Project }) {
  const FallbackIcon = FALLBACK_ICONS[project.slug];

  return (
    <article className="flex h-full flex-col rounded-xl border border-(--color-line) bg-(--color-surface) p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-bg) text-(--color-ink)">
        {project.iconSrc ? (
          <Image src={project.iconSrc} alt="" width={22} height={22} aria-hidden="true" />
        ) : FallbackIcon ? (
          <FallbackIcon className="h-[22px] w-[22px]" />
        ) : null}
      </div>
      <h3 className="mt-4 text-base font-semibold text-(--color-ink)">{project.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-(--color-ink-soft)">
        {project.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-sm font-medium">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-(--color-ink) hover:text-(--color-accent)"
        >
          Live <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-(--color-ink-soft) hover:text-(--color-accent)"
            aria-label={`${project.name} source code on GitHub`}
          >
            <Code size={14} aria-hidden="true" /> Code
          </a>
        )}
      </div>
    </article>
  );
}
