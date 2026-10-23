import { about } from "@/lib/content/about";
import { SectionShell } from "./section-shell";

export function AboutSection() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <SectionShell id="about" title="About">
      <p className="max-w-[34ch] font-reading text-3xl leading-snug text-(--color-ink) md:text-4xl">
        {lead}
      </p>
      <div className="mt-8 max-w-[62ch] space-y-4 font-reading text-lg leading-[1.7] text-(--color-ink-soft)">
        {rest.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </SectionShell>
  );
}
