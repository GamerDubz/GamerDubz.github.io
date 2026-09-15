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

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-full bg-(--color-ink) px-4 text-sm font-semibold text-(--color-bg) transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
          >
            Let&apos;s connect
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-(--color-ink) md:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-(--color-line) px-6 py-3 text-sm font-medium text-(--color-ink-soft) md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center hover:text-(--color-ink)"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
