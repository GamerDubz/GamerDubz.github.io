import { skillGroups } from "@/lib/content/skills";
import { SectionShell } from "./section-shell";

export function SkillsSection() {
  return (
    <SectionShell id="skills" title="Skills">
      <dl className="divide-y divide-(--color-line)">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="grid gap-2 py-7 first:pt-0 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            <dt className="text-lg font-semibold text-(--color-ink)">{group.title}</dt>
            <dd>
              <p className="text-base font-medium text-(--color-ink)">{group.skills}</p>
              <p className="mt-2 max-w-[58ch] font-reading text-lg leading-relaxed text-(--color-ink-soft)">
                {group.evidence}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
