import { flagshipProjects } from "@/lib/content/flagship";
import { FlagshipCard } from "./flagship-card";
import { Reveal } from "./reveal";

export function FlagshipSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Shipped work</h2>
      <p className="mt-2 max-w-2xl text-(--color-ink-soft)">
        Production software in real people&apos;s hands, not just prototypes.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {flagshipProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.1} className="h-full">
            <FlagshipCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
