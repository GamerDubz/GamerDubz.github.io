import { Code, ExternalLink, Mail, Phone } from "lucide-react";
import { identity } from "@/lib/content/identity";
import { Reveal } from "./reveal";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-(--color-line) bg-(--color-surface)">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">
          Let&apos;s work together
        </h2>
        <p className="mt-2 max-w-xl text-(--color-ink-soft)">
          Open to full-stack roles and freelance projects — reach out any way that&apos;s easiest.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-(--color-ink)">
          <a href={`mailto:${identity.email}`} className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)">
            <Mail size={18} aria-hidden="true" /> {identity.email}
          </a>
          <a href={`tel:${identity.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)">
            <Phone size={18} aria-hidden="true" /> {identity.phone}
          </a>
          <a
            href={identity.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)"
          >
            <ExternalLink size={18} aria-hidden="true" /> LinkedIn
          </a>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 hover:text-(--color-accent)"
          >
            <Code size={18} aria-hidden="true" /> GitHub
          </a>
        </div>
        <p className="mt-12 text-xs text-(--color-ink-faint)">
          © {new Date().getFullYear()} {identity.name}
        </p>
        </Reveal>
      </div>
    </footer>
  );
}
