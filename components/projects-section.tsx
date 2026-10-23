"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content/projects";
import { paginate } from "@/lib/pagination";
import { ProjectCard } from "./project-card";
import { PaginationControls } from "./pagination-controls";
import { SectionShell } from "./section-shell";

const PAGE_SIZE = 10;

export function ProjectsSection() {
  const [page, setPage] = useState(0);
  const { pageItems, totalPages, currentPage } = paginate(projects, PAGE_SIZE, page);
  const shouldReduceMotion = useReducedMotion();
  const pageTransition = { duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" as const };

  return (
    <SectionShell
      id="projects"
      title="Projects"
      intro={`${projects.length} shipped side projects and experiments — each one a real, working app.`}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
            transition={pageTransition}
            drag="x"
            dragElastic={0.15}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_event, info) => {
              if (info.offset.x < -60) {
                setPage((p) => Math.min(p + 1, totalPages - 1));
              } else if (info.offset.x > 60) {
                setPage((p) => Math.max(0, p - 1));
              }
            }}
            className="grid gap-x-10 md:grid-cols-2"
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
    </SectionShell>
  );
}
