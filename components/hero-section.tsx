import type { CSSProperties } from "react";
import { identity } from "@/lib/content/identity";
import { LocalClock } from "./local-clock";
import { GithubIcon } from "./social-icons/github-icon";
import { LinkedinIcon } from "./social-icons/linkedin-icon";

const BUTTON_BASE =
  "inline-flex min-h-11 items-center rounded-md px-5 text-base font-semibold transition-colors duration-200";
const BUTTON_OUTLINE = `${BUTTON_BASE} border border-(--color-ink) text-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-bg) active:bg-(--color-accent)`;
const ICON_LINK =
  "flex h-11 w-11 items-center justify-center rounded-md text-(--color-ink-soft) transition-colors duration-200 hover:bg-(--color-surface) hover:text-(--color-accent)";

function riseStyle(index: number) {
  return { "--rise-index": index } as CSSProperties;
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100dvh-73px)] max-w-6xl flex-col justify-end px-6 pb-14 pt-12 md:pb-20"
    >
      <p className="rise text-lg text-(--color-ink-soft)" style={riseStyle(0)}>
        <LocalClock location={identity.location} />
      </p>
      <h1
        className="rise mt-5 text-[clamp(3.5rem,14vw,12rem)] font-bold leading-[0.88] tracking-[-0.035em] text-(--color-ink) [font-stretch:75%]"
        style={riseStyle(1)}
      >
        {identity.name}
        <span className="mt-3 block text-[0.42em] font-medium leading-none tracking-[-0.02em] text-(--color-ink-soft)">
          {identity.headline}
        </span>
      </h1>
      <p
        className="rise mt-10 max-w-2xl font-reading text-xl leading-relaxed text-(--color-ink) md:text-2xl"
        style={riseStyle(2)}
      >
        {identity.summary}
      </p>
      <div className="rise mt-8 flex flex-wrap items-center gap-3" style={riseStyle(3)}>
        <a
          href="#work"
          className={`${BUTTON_BASE} bg-(--color-ink) text-(--color-bg) hover:bg-(--color-accent) active:bg-(--color-ink)`}
        >
          View my work
        </a>
        <a href={`mailto:${identity.email}`} className={BUTTON_OUTLINE}>
          Email me
        </a>
        <a href={identity.resumeHref} download className={BUTTON_OUTLINE}>
          Resume
        </a>
        <div className="ml-1 flex items-center gap-1">
          <a
            href={identity.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={ICON_LINK}
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={ICON_LINK}
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
