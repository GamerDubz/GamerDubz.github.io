"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { identity } from "@/lib/content/identity";

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

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  // When reduced motion is preferred, start already in the "show" state —
  // initial and animate are then identical, so framer-motion renders the
  // final state directly with no visible transition. This keeps every
  // element as a real motion.div (no tag-swapping, no prop-shape branching)
  // while still fully honoring the user's preference.
  const initialState = shouldReduceMotion ? "show" : "hidden";

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
      <motion.div variants={container} initial={initialState} animate="show">
        <motion.div variants={item}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
            {identity.location}
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h1 className="mt-4 max-w-3xl font-serif-display text-5xl font-medium leading-[1.05] text-(--color-ink) sm:text-6xl">
            {identity.name}, {identity.headline.toLowerCase()}.
          </h1>
        </motion.div>
        <motion.div variants={item}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-ink-soft)">
            {identity.summary}
          </p>
        </motion.div>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
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
        </motion.div>
      </motion.div>
    </section>
  );
}
