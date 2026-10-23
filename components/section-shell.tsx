import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

// Every section shares one frame: a heading hung in the left column and the
// content on the right, so the page reads as a single ruled document instead
// of a stack of centred blocks.
export function SectionShell({ id, title, intro, children }: SectionShellProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6">
      <div className="grid gap-x-12 gap-y-8 border-t border-(--color-ink) py-16 md:grid-cols-[13rem_1fr] md:py-24">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="text-2xl font-semibold tracking-tight text-(--color-ink)">{title}</h2>
          {intro && (
            <p className="mt-3 max-w-xs font-reading text-base leading-relaxed text-(--color-ink-soft)">
              {intro}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
