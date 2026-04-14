"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND, TREASURE_DOMAINS } from "@/lib/constants";

// ── Constants ─────────────────────────────────────────────────────────────────

// Centre nav: first 3 links. CTA: final link styled as ghost button.
const PRIMARY_LINKS = [NAV_LINKS[0], NAV_LINKS[1], NAV_LINKS[2]] as const;
const CTA_LINK = NAV_LINKS[3]; // "Private Enquiry" → /contact

type TreasureDomain = (typeof TREASURE_DOMAINS)[number];

// ── Animation variants ────────────────────────────────────────────────────────

const DROPDOWN_VARIANTS = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.15, ease: [0.42, 0, 1, 1] } },
} as const;

const DRAWER_VARIANTS = {
  hidden:  { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: "100%", transition: { duration: 0.35, ease: [0.42, 0, 1, 1] } },
} as const;

const DRAWER_LINK_VARIANTS = {
  hidden:  { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
} as const;

// ── Inline wordmark logo ──────────────────────────────────────────────────────
// Self-contained SVG with CSS-animatable fill.
// Using fill transition directly on <text> avoids the flash that occurs when
// swapping two different LogoMark variants (diamond vs plain wordmark).

interface NavLogoProps {
  solid: boolean;
  heightPx?: number;
}

function NavLogo({ solid, heightPx = 20 }: NavLogoProps) {
  // Preserve viewBox 0 0 220 36 aspect ratio
  const widthPx = Math.round((220 / 36) * heightPx);
  return (
    <svg
      viewBox="0 0 220 36"
      width={widthPx}
      height={heightPx}
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <text
        x="0"
        y="27"
        fontFamily="var(--font-garet), 'Jost', sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="5"
        textAnchor="start"
        style={{
          fill: solid ? "var(--color-text)" : "var(--color-text-inverse)",
          transition: "fill 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        PHAIGORT
      </text>
    </svg>
  );
}

// ── Reduced-motion helper ─────────────────────────────────────────────────────

function instant<T extends Record<string, unknown>>(
  variants: T,
  reduced: boolean | null
): T {
  if (!reduced) return variants;
  return Object.fromEntries(
    Object.entries(variants).map(([k, v]) => [
      k,
      { ...(v as object), transition: { duration: 0.01 } },
    ])
  ) as T;
}

// ── Header ────────────────────────────────────────────────────────────────────

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<TreasureDomain>(TREASURE_DOMAINS[0]);
  const pathname = usePathname();
  const overlayId = useId();
  const prefersReducedMotion = useReducedMotion();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll threshold: 80px ─────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 80);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // ── Close on route change ──────────────────────────────────────────────────
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // ── ESC key ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ── Body scroll lock (drawer open) ────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Dropdown hover with 120ms grace period ─────────────────────────────────
  const openDropdown = useCallback((key: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(key);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    return () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); };
  }, []);

  const isActive = (href: string) => pathname === href;

  // Solid = light-bg mode. Transparent = dark-hero mode (homepage top only).
  const isSolid = pathname !== "/" || scrolled || activeDropdown !== null;

  // ── Derived colour helpers ──────────────────────────────────────────────────

  // Default nav link color based on header state
  const linkColor = (active: boolean) =>
    isSolid
      ? active
        ? "text-[var(--color-text)]"
        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      : active
        ? "text-[var(--color-text-inverse)]"
        : "text-[var(--color-text-inverse)]/60 hover:text-[var(--color-text-inverse)]";

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HEADER BAR
      ══════════════════════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-[60] h-14 md:h-16"
        style={{
          backgroundColor: isSolid ? "var(--color-bg)" : "transparent",
          boxShadow: isSolid ? "0 1px 0 var(--color-divider)" : "none",
          transition:
            "background-color 300ms ease, box-shadow 300ms ease",
        }}
      >
        <div
          className="relative mx-auto flex h-full items-center justify-between px-6 md:px-10 lg:px-14"
          style={{ maxWidth: "var(--content-wide)" }}
        >
          {/* ── LEFT: Logo (desktop) / Hamburger (mobile) ──────────────── */}
          <div className="flex items-center">
            {/* Logo — desktop only (left-aligned) */}
            <Link
              href="/"
              aria-label={BRAND.name}
              onClick={() => setIsOpen(false)}
              className="hidden focus:outline-none md:block"
            >
              <NavLogo solid={isSolid} heightPx={20} />
            </Link>

            {/* Hamburger / Close — mobile only */}
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              aria-expanded={isOpen}
              aria-controls={overlayId}
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              className={cn(
                "-ml-2 flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden",
                "transition-colors duration-[180ms]",
                isSolid
                  ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  : "text-[var(--color-text-inverse)]/60 hover:text-[var(--color-text-inverse)]"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                    style={{ display: "flex" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        x1="3" y1="3" x2="17" y2="17"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      />
                      <line
                        x1="17" y1="3" x2="3" y2="17"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                ) : (
                  <motion.span
                    key="burger"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.15 }}
                    style={{ display: "flex" }}
                  >
                    {/* 3-line hamburger, 20×20, currentColor */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        x1="0" y1="4" x2="20" y2="4"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      />
                      <line
                        x1="0" y1="10" x2="20" y2="10"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      />
                      <line
                        x1="0" y1="16" x2="20" y2="16"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ── CENTRE: Primary nav (desktop) / Logo (mobile) ──────────── */}

          {/* Desktop centre nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 md:flex lg:gap-10"
          >
            {/* "The Collection" triggers mega-menu on hover */}
            <button
              type="button"
              onMouseEnter={() => openDropdown("collections")}
              onMouseLeave={scheduleClose}
              aria-expanded={activeDropdown === "collections"}
              aria-haspopup="true"
              className={cn(
                "font-ui uppercase tracking-[0.06em]",
                "text-[var(--text-sm)]",
                "transition-colors duration-[180ms]",
                "focus:outline-none focus-visible:underline",
                linkColor(activeDropdown === "collections" || isActive("/collections"))
              )}
            >
              {NAV_LINKS[0].label}
            </button>

            {PRIMARY_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-ui uppercase tracking-[0.06em]",
                  "text-[var(--text-sm)]",
                  "transition-colors duration-[180ms]",
                  "focus:outline-none focus-visible:underline",
                  linkColor(isActive(link.href))
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile logo — absolute centre, independent of flex children */}
          <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 md:hidden">
            <Link
              href="/"
              aria-label={BRAND.name}
              onClick={() => setIsOpen(false)}
            >
              <NavLogo solid={isSolid} heightPx={18} />
            </Link>
          </div>

          {/* ── RIGHT: CTA button (desktop) / Spacer (mobile) ──────────── */}
          <div className="flex items-center justify-end">
            {/* Ghost CTA — desktop only */}
            <Link
              href={CTA_LINK.href}
              className={cn(
                "hidden items-center justify-center md:inline-flex",
                "min-h-[44px] px-5",
                "border font-ui uppercase tracking-[0.04em]",
                "text-[var(--text-sm)]",
                "bg-transparent",
                "transition-[border-color,color] duration-[180ms]",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
                isSolid
                  ? [
                      "border-[var(--color-border)] text-[var(--color-text)]",
                      "hover:border-[var(--color-text)]",
                      "focus-visible:ring-[var(--color-text)]",
                    ]
                  : [
                      "border-[var(--color-text-inverse)]/30 text-[var(--color-text-inverse)]",
                      "hover:border-[var(--color-text-inverse)]/70",
                      "focus-visible:ring-[var(--color-text-inverse)]",
                    ]
              )}
            >
              {CTA_LINK.label}
            </Link>

            {/* Mobile spacer — mirrors hamburger to keep logo centered */}
            <div
              aria-hidden="true"
              className="min-h-[44px] min-w-[44px] md:hidden"
            />
          </div>
        </div>

        {/* ── MEGA-MENU DROPDOWN (desktop) ────────────────────────────────── */}
        <AnimatePresence>
          {activeDropdown === "collections" && (
            <motion.div
              role="region"
              aria-label="Collection categories"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              variants={instant(DROPDOWN_VARIANTS, prefersReducedMotion)}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute left-0 right-0 top-full",
                "bg-[#0A0F1D] border-b border-platinum/[0.07]",
                "grid min-h-[320px] grid-cols-[1fr_1.8fr]"
              )}
            >
              {/* Left: typographic domain list */}
              <div className="flex flex-col justify-center gap-1 border-r border-platinum/[0.06] px-10 py-10 lg:px-14">
                {TREASURE_DOMAINS.map((domain, i) => (
                  <motion.a
                    key={domain.title}
                    href={domain.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : { delay: i * 0.04, duration: 0.18 }
                    }
                    onMouseEnter={() => setHoveredDomain(domain)}
                    className={cn(
                      "block py-2 font-display text-[1.45rem] font-bold tracking-[0.02em]",
                      "cursor-pointer transition-colors duration-150",
                      hoveredDomain.title === domain.title
                        ? "text-platinum"
                        : "text-platinum/35 hover:text-platinum/70"
                    )}
                  >
                    {domain.title}
                  </motion.a>
                ))}
              </div>

              {/* Right: editorial image crossfade panel */}
              <div className="relative overflow-hidden bg-[#0A1240]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredDomain.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={
                      prefersReducedMotion ? { duration: 0.01 } : { duration: 0.3 }
                    }
                    className="absolute inset-0"
                  >
                    <Image
                      src={hoveredDomain.image}
                      alt={hoveredDomain.imageAlt}
                      fill
                      sizes="(max-width: 1280px) 60vw, 800px"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Depth gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0F1D]/65 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-ui text-[0.72rem] uppercase tracking-[0.18em] text-platinum/55">
                    {hoveredDomain.title}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          DROPDOWN BACKDROP — dims page content behind open mega-menu
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[58] bg-[#0A0F1D]/20"
            style={{ top: "64px" }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE DRAWER BACKDROP — outside-tap closes drawer
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            className="fixed inset-0 z-[64] bg-black/25 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE DRAWER — slides in from right
          Background: --color-bg (warm white). Links: Cardo, dark text.
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={overlayId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={instant(DRAWER_VARIANTS, prefersReducedMotion)}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[65] flex w-full flex-col md:hidden"
            style={{ background: "var(--color-bg)" }}
          >
            {/* Drawer top bar — logo left, close right */}
            <div className="flex h-14 flex-shrink-0 items-center justify-between px-6">
              <Link
                href="/"
                aria-label={BRAND.name}
                onClick={() => setIsOpen(false)}
              >
                {/* Always solid (light bg in drawer) */}
                <NavLogo solid heightPx={18} />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors duration-[180ms] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line
                    x1="3" y1="3" x2="17" y2="17"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  />
                  <line
                    x1="17" y1="3" x2="3" y2="17"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Hairline divider */}
            <div
              aria-hidden="true"
              className="mx-6 h-px flex-shrink-0"
              style={{ background: "var(--color-divider)" }}
            />

            {/* Nav links — Cardo display, left-aligned */}
            <nav
              aria-label="Site navigation"
              className="flex flex-1 flex-col justify-center"
              style={{ padding: "var(--space-8) var(--space-6)" }}
            >
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href} className="overflow-hidden">
                      <motion.div
                        custom={i}
                        variants={instant(DRAWER_LINK_VARIANTS, prefersReducedMotion)}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block py-3 font-display font-bold leading-tight",
                            "transition-colors duration-[180ms]",
                            active
                              ? "text-[var(--color-text)]"
                              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                          )}
                          style={{ fontSize: "var(--text-lg)" }}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer footer */}
            <div
              className="flex flex-shrink-0 items-center px-6 py-5"
              style={{ borderTop: "1px solid var(--color-divider)" }}
            >
              <span
                className="font-ui text-[0.68rem] uppercase tracking-[0.22em]"
                style={{ color: "var(--color-text-faint)" }}
              >
                {BRAND.tagline}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
