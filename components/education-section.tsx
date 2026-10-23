import { education } from "@/lib/content/education";
import { SectionShell } from "./section-shell";

export function EducationSection() {
  return (
    <SectionShell id="education" title="Education">
      <ul className="divide-y divide-(--color-line)">
        {education.map((entry) => (
          <li
            key={entry.credential}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-lg font-semibold text-(--color-ink)">{entry.credential}</p>
              <p className="text-base text-(--color-ink-soft)">{entry.institution}</p>
            </div>
            <span className="text-base text-(--color-ink-faint)">{entry.period}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
