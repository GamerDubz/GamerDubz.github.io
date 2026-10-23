import { skillGroups } from "@/lib/content/skills";
import { Reveal } from "./reveal";

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Skills</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.1} className="h-full">
            <div className="h-full rounded-2xl border border-(--color-line) bg-(--color-surface) p-6 transition-transform duration-300 hover:-translate-y-1.5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-(--color-accent)">
                {group.title}
              </h3>
              <p className="mt-3 text-base text-(--color-ink)">{group.skills}</p>
              <p className="mt-3 text-sm text-(--color-ink-faint)">{group.evidence}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
