"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Monogram } from "./monogram";
import { identity } from "@/lib/content/identity";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// The drawer's own bottom CTA already reaches #contact, so the drawer's
// link list drops the separate "Contact" entry — the desktop nav keeps
// all six, since it doesn't have a duplicate CTA sitting next to it.
const DRAWER_LINKS = NAV_LINKS.filter((link) => link.href !== "#contact");

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-(--color-line) bg-(--color-surface)/95 backdrop-blur">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-(--color-ink) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-(--color-bg)"
        >
          Skip to content
        </a>
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
            href="#contact"
            className="hidden min-h-11 items-center rounded-full bg-(--color-ink) px-4 text-sm font-semibold text-(--color-bg) transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90 md:inline-flex"
          >
            Let&apos;s connect
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-(--color-ink) md:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Off-canvas mobile drawer, slides in from the right. Rendered as a
          sibling of <header> rather than inside it — header's
          backdrop-blur creates a new containing block for fixed-position
          descendants, which would shrink this drawer to the header's own
          height instead of the full viewport. Kept mounted (not
          conditionally rendered) so the CSS transform transition has
          something to animate from/to; visibility and interactivity are
          toggled instead. */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-(--color-ink)/40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className={`absolute top-0 right-0 flex h-full w-72 max-w-[80%] flex-col bg-(--color-surface) px-6 py-5 shadow-xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="#top"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 font-serif-display text-base font-medium text-(--color-ink)"
            >
              <Monogram className="h-7 w-7 text-(--color-ink)" />
              {identity.name}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-(--color-ink)"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flex flex-1 flex-col gap-1 text-base font-medium text-(--color-ink-soft)">
            {DRAWER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center hover:text-(--color-ink)"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--color-ink) px-4 text-sm font-semibold text-(--color-bg)"
          >
            Let&apos;s connect
          </a>
        </nav>
      </div>
    </>
  );
}
