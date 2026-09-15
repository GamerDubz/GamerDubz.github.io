import { about } from "@/lib/content/about";
import { Reveal } from "./reveal";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">
          {about.heading}
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-(--color-ink-soft)">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
