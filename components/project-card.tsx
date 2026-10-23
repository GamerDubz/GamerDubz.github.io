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

const LINK_CLASS =
  "inline-flex min-h-11 items-center gap-1 underline decoration-(--color-line) decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-(--color-accent) hover:decoration-(--color-accent)";

export function ProjectCard({ project }: { project: Project }) {
  const FallbackIcon = FALLBACK_ICONS[project.slug];

  return (
    <article className="flex gap-4 border-t border-(--color-line) py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-(--color-line) bg-(--color-surface) text-(--color-ink)">
        {project.iconSrc ? (
          <Image src={project.iconSrc} alt="" width={22} height={22} aria-hidden="true" />
        ) : FallbackIcon ? (
          <FallbackIcon className="h-[22px] w-[22px]" />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-semibold text-(--color-ink)">{project.name}</h3>
        <p className="mt-1 flex-1 font-reading text-base leading-relaxed text-(--color-ink-soft)">
          {project.description}
        </p>
        <div className="mt-2 flex items-center gap-5 text-base font-medium">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_CLASS} text-(--color-ink)`}
          >
            Live <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${LINK_CLASS} text-(--color-ink-soft)`}
              aria-label={`${project.name} source code on GitHub`}
            >
              <Code size={14} aria-hidden="true" /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
