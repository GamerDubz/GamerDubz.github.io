"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

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

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();

  // Server render and the client's first render must produce identical
  // markup (hasMounted is false in both), or React logs a hydration
  // mismatch. Rendering a plain, fully-visible div until after mount also
  // means a static export with no JavaScript ships real, visible content
  // instead of an opacity:0 husk. The reveal animation only ever starts
  // once we know we're safely past hydration.
  if (!hasMounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
