import { flagshipProjects } from "@/lib/content/flagship";
import { FlagshipCard } from "./flagship-card";
import { SectionShell } from "./section-shell";

export function FlagshipSection() {
  return (
    <SectionShell
      id="work"
      title="Shipped work"
      intro="Production software in real people's hands, not just prototypes."
    >
      <div className="divide-y divide-(--color-line)">
        {flagshipProjects.map((project) => (
          <FlagshipCard key={project.name} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}
