"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content/projects";
import { paginate } from "@/lib/pagination";
import { ProjectCard } from "./project-card";
import { PaginationControls } from "./pagination-controls";
import { Reveal } from "./reveal";

const PAGE_SIZE = 10;

export function ProjectsSection() {
  const [page, setPage] = useState(0);
  const { pageItems, totalPages, currentPage } = paginate(projects, PAGE_SIZE, page);
  const shouldReduceMotion = useReducedMotion();
  const pageTransition = { duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" as const };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="font-serif-display text-3xl font-medium text-(--color-ink)">Projects</h2>
        <p className="mt-2 max-w-2xl text-(--color-ink-soft)">
          {projects.length} shipped side projects and experiments — each one a real, working app.
        </p>
      </Reveal>
      <div className="relative mt-10 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
            transition={pageTransition}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {pageItems.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      />
    </section>
  );
}
