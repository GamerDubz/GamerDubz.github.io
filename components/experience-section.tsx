import { experience } from "@/lib/content/experience";
import { Reveal } from "./reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Experience</h2>
      <ol className="mt-10 space-y-10 border-l border-(--color-line) pl-8">
        {experience.map((entry, index) => (
          <li key={entry.role} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-(--color-accent)" />
            <Reveal delay={index * 0.1}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-(--color-ink)">{entry.role}</h3>
                <span className="text-sm text-(--color-ink-faint)">
                  {entry.start} – {entry.end}
                </span>
              </div>
              <p className="text-sm text-(--color-ink-soft)">
                {entry.org} · {entry.location}
              </p>
              <ul className="mt-3 space-y-1.5 text-base text-(--color-ink-soft)">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
