import { education } from "@/lib/content/education";
import { Reveal } from "./reveal";

export function EducationSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Education</h2>
        <ul className="mt-8 space-y-4">
          {education.map((entry) => (
            <li key={entry.credential} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-(--color-line) pb-4">
              <div>
                <p className="font-medium text-(--color-ink)">{entry.credential}</p>
                <p className="text-sm text-(--color-ink-soft)">{entry.institution}</p>
              </div>
              <span className="text-sm text-(--color-ink-faint)">{entry.period}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
