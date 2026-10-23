import { Phone } from "lucide-react";
import { identity } from "@/lib/content/identity";
import { GithubIcon } from "./social-icons/github-icon";
import { LinkedinIcon } from "./social-icons/linkedin-icon";

const LINK_CLASS =
  "flex min-h-11 items-center gap-2 text-base font-medium text-(--color-ink) transition-colors duration-200 hover:text-(--color-accent)";

export function SiteFooter() {
  return (
    <footer id="contact" className="mx-auto w-full max-w-6xl px-6">
      <div className="grid gap-x-12 gap-y-8 border-t border-(--color-ink) py-16 md:grid-cols-[13rem_1fr] md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight text-(--color-ink)">Get in touch</h2>
        <div>
          <a
            href={`mailto:${identity.email}`}
            className="inline-block break-all text-3xl font-semibold tracking-tight text-(--color-ink) underline decoration-(--color-line) decoration-2 underline-offset-[10px] transition-colors duration-200 hover:text-(--color-accent) hover:decoration-(--color-accent) md:text-5xl"
          >
            {identity.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-x-8">
            <a href={`tel:${identity.phone.replace(/\s/g, "")}`} className={LINK_CLASS}>
              <Phone size={18} aria-hidden="true" /> {identity.phone}
            </a>
            <a
              href={identity.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              <LinkedinIcon className="h-[18px] w-[18px]" /> LinkedIn
            </a>
            <a
              href={identity.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              <GithubIcon className="h-[18px] w-[18px]" /> GitHub
            </a>
          </div>
          <p className="mt-16 text-base text-(--color-ink-faint)">
            © {new Date().getFullYear()} {identity.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
