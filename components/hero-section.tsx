"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { identity } from "@/lib/content/identity";
import { GithubIcon } from "./social-icons/github-icon";
import { LinkedinIcon } from "./social-icons/linkedin-icon";

const emptySubscribe = () => () => {};

// useSyncExternalStore is React's own recommended replacement for the old
// "setState inside a mount effect" hasMounted pattern: getServerSnapshot
// returns false during SSR and during the client's first render (before
// hydration finishes), so server and client markup are guaranteed
// identical — no hydration mismatch — and it flips to true right after,
// with no synchronous setState-in-effect for the linter to flag.
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a
        href="#work"
        className="inline-flex min-h-11 items-center rounded-full bg-(--color-accent) px-6 text-sm font-semibold text-(--color-accent-ink) transition-transform duration-200 hover:-translate-y-0.5"
      >
        View my work
      </a>
      <a
        href={`mailto:${identity.email}`}
        className="inline-flex min-h-11 items-center rounded-full border border-(--color-line) px-6 text-sm font-semibold text-(--color-ink) transition-transform duration-200 hover:-translate-y-0.5"
      >
        Email me
      </a>
      <a
        href={identity.resumeHref}
        download
        className="inline-flex min-h-11 items-center rounded-full border border-(--color-line) px-6 text-sm font-semibold text-(--color-ink) transition-transform duration-200 hover:-translate-y-0.5"
      >
        Resume
      </a>
      <div className="ml-1 flex items-center gap-2">
        <a
          href={identity.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-11 w-11 items-center justify-center rounded-full text-(--color-ink-soft) transition-transform duration-200 hover:-translate-y-0.5 hover:text-(--color-ink)"
        >
          <LinkedinIcon className="h-5 w-5" />
        </a>
        <a
          href={identity.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-11 w-11 items-center justify-center rounded-full text-(--color-ink-soft) transition-transform duration-200 hover:-translate-y-0.5 hover:text-(--color-ink)"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  // Server render and the client's first render must produce identical
  // markup (hasMounted is false in both), or React logs a hydration
  // mismatch. Rendering the plain, fully-visible structure until after
  // mount also means a static export with no JavaScript ships real,
  // visible hero content instead of an opacity:0 husk.
  if (!hasMounted || shouldReduceMotion) {
    return (
      <section
        id="top"
        className="mx-auto flex min-h-[calc(100dvh-80px)] max-w-6xl flex-col justify-center px-6 py-12"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
            {identity.location}
          </p>
        </div>
        <div>
          <h1 className="mt-4 max-w-3xl font-serif-display text-6xl font-medium leading-[1.05] text-(--color-ink) sm:text-7xl">
            {identity.name}, {identity.headline.toLowerCase()}.
          </h1>
        </div>
        <div>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-(--color-ink-soft)">
            {identity.summary}
          </p>
        </div>
        <HeroButtons />
      </section>
    );
  }

  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100dvh-80px)] max-w-6xl flex-col justify-center px-6 py-12"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
            {identity.location}
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h1 className="mt-4 max-w-3xl font-serif-display text-6xl font-medium leading-[1.05] text-(--color-ink) sm:text-7xl">
            {identity.name}, {identity.headline.toLowerCase()}.
          </h1>
        </motion.div>
        <motion.div variants={item}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-(--color-ink-soft)">
            {identity.summary}
          </p>
        </motion.div>
        <motion.div variants={item}>
          <HeroButtons />
        </motion.div>
      </motion.div>
    </section>
  );
}
