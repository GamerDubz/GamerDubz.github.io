import { experience } from "@/lib/content/experience";
import { SectionShell } from "./section-shell";

export function ExperienceSection() {
  return (
    <SectionShell id="experience" title="Experience">
      <ol className="space-y-12 border-l border-(--color-line) pl-8">
        {experience.map((entry) => (
          <li key={entry.role} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2rem+5px)] top-2.5 h-2.5 w-2.5 rounded-full bg-(--color-accent)"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-xl font-semibold text-(--color-ink)">{entry.role}</h3>
              <span className="text-base text-(--color-ink-faint)">
                {entry.start} – {entry.end}
              </span>
            </div>
            <p className="mt-1 text-base text-(--color-ink-soft)">
              {entry.org} · {entry.location}
            </p>
            <ul className="mt-4 max-w-[62ch] space-y-2 font-reading text-lg leading-relaxed text-(--color-ink-soft)">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
