import Link from "next/link";
import { Monogram } from "./monogram";
import { identity } from "@/lib/content/identity";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-(--color-line) bg-(--color-bg)/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-2 font-serif-display text-lg font-medium text-(--color-ink)">
          <Monogram className="h-8 w-8 text-(--color-ink)" />
          {identity.name}
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium text-(--color-ink-soft) md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="min-h-11 py-2 hover:text-(--color-ink)">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={identity.resumeHref}
          className="inline-flex min-h-11 items-center rounded-full bg-(--color-ink) px-4 text-sm font-semibold text-(--color-bg) transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
          download
        >
          Résumé
        </a>
      </div>
    </header>
  );
}
