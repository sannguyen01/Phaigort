"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND, TREASURE_DOMAINS } from "@/lib/constants";

// ── Link groups ────────────────────────────────────────────────────────────────
// Left side: The Collection + Our Story
// Right side: Atelier + Private Enquiry
const LEFT_LINKS = [NAV_LINKS[0], NAV_LINKS[1]] as const;
const RIGHT_LINKS = [NAV_LINKS[2], NAV_LINKS[3]] as const;

type TreasureDomain = (typeof TREASURE_DOMAINS)[number];

// ── Animation variants ────────────────────────────────────────────────────────

const DROPDOWN_VARIANTS = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: [0.42, 0, 1, 1] } },
} as const;

const DRAWER_VARIANTS = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: "100%", transition: { duration: 0.35, ease: [0.42, 0, 1, 1] } },
} as const;

const DRAWER_LINK_VARIANTS = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
} as const;

// ── PNG logo with scroll-state crossfade ─────────────────────────────────────
// • !solid (transparent, dark hero) → wordmark only (Logo White, inverted to white)
// • solid (scrolled, dark header)   → diamond mark  (Logo Dark,  inverted to white diamond)
// Both PNGs have white backgrounds; filter:invert(1) makes the white bg black → disappears on dark field.

interface NavLogoProps {
  solid: boolean;
}

function NavLogo({ solid }: NavLogoProps) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "clamp(160px, 16vw, 210px)", height: "clamp(64px, 6vw, 80px)" }}
      aria-label="Phaigort"
    >
      {/* Wordmark — fades in when header is transparent (top of page) */}
      <Image
        src="/brand/phaigort-logo-white.png"
        alt="Phaigort"
        fill
        sizes="144px"
        className="object-contain object-left"
        style={{
          filter: "invert(1)",
          opacity: solid ? 0 : 1,
          transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        priority
      />
      {/* Diamond mark — fades in when header is solid (scrolled) */}
      <Image
        src="/brand/phaigort-logo-dark.png"
        alt=""
        aria-hidden={true}
        fill
        sizes="144px"
        className="object-contain object-left"
        style={{
          filter: "invert(1)",
          opacity: solid ? 1 : 0,
          transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        priority
      />
    </div>
  );
}

// ── Reduced-motion helper ─────────────────────────────────────────────────────

function instant<T extends Record<string, unknown>>(variants: T, reduced: boolean | null): T {
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

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const isActive = (href: string) => pathname === href;

  // Solid = scrolled or off homepage. Transparent = dark-hero top of homepage.
  const isSolid = pathname !== "/" || scrolled || activeDropdown !== null;

  const linkCls = (active: boolean) =>
    cn(
      "font-ui text-[11px] uppercase tracking-[0.1em] transition-colors duration-[180ms]",
      "focus:outline-none focus-visible:underline",
      isSolid
        ? active
          ? "text-[var(--color-text)]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        : active
          ? "text-platinum"
          : "text-platinum/55 hover:text-platinum"
    );

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HEADER BAR — symmetric split nav · logo absolute center
      ══════════════════════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-[60] h-[80px] md:h-[88px]"
        style={{
          backgroundColor: isSolid ? "var(--color-bg)" : "transparent",
          boxShadow: isSolid ? "0 1px 0 var(--color-divider)" : "none",
          transition: "background-color 300ms ease, box-shadow 300ms ease",
        }}
      >
        {/* ── LOGO — absolute centre ──────────────────────────────────── */}
        <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" aria-label={BRAND.name} onClick={() => setIsOpen(false)}>
            <NavLogo solid={isSolid} />
          </Link>
        </div>

        <div
          className="relative mx-auto flex h-full items-center justify-between px-6 md:px-10 lg:px-14"
          style={{ maxWidth: "var(--content-wide)" }}
        >
          {/* ── LEFT NAV (desktop) / Hamburger (mobile) ─────────────── */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Mobile hamburger */}
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
                  : "text-platinum/55 hover:text-platinum"
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <line
                        x1="3"
                        y1="3"
                        x2="17"
                        y2="17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="17"
                        y1="3"
                        x2="3"
                        y2="17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <line
                        x1="0"
                        y1="4"
                        x2="20"
                        y2="4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="0"
                        y1="10"
                        x2="20"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="0"
                        y1="16"
                        x2="20"
                        y2="16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop left links: The Collection + Our Story */}
            <nav
              aria-label="Primary navigation left"
              className="hidden items-center gap-7 md:flex lg:gap-9"
            >
              {/* "The Collection" → mega-menu trigger */}
              <button
                type="button"
                onMouseEnter={() => openDropdown("collections")}
                onMouseLeave={scheduleClose}
                aria-expanded={activeDropdown === "collections"}
                aria-haspopup="true"
                className={linkCls(activeDropdown === "collections" || isActive("/collections"))}
              >
                {NAV_LINKS[0].label}
              </button>

              <Link href={NAV_LINKS[1].href} className={linkCls(isActive(NAV_LINKS[1].href))}>
                {NAV_LINKS[1].label}
              </Link>
            </nav>
          </div>

          {/* ── RIGHT NAV (desktop) / Spacer (mobile) ───────────────── */}
          <nav aria-label="Primary navigation right" className="flex items-center gap-7 md:gap-9">
            {/* Desktop right links: Atelier + Private Enquiry */}
            {RIGHT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(linkCls(isActive(link.href)), "hidden md:inline")}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile spacer — mirrors hamburger to keep logo centred */}
            <div aria-hidden="true" className="min-h-[44px] min-w-[44px] md:hidden" />
          </nav>
        </div>

        {/* ── MEGA-MENU DROPDOWN (desktop) ──────────────────────────────── */}
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
                "border-b border-platinum/[0.07] bg-ground",
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
              <div className="relative overflow-hidden bg-t02">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredDomain.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.3 }}
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground/65 via-transparent to-transparent" />
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
          DROPDOWN BACKDROP
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[58] bg-[#0D0B09]/20"
            style={{ top: "88px" }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE DRAWER BACKDROP
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
          MOBILE DRAWER
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
            {/* Drawer top bar */}
            <div className="flex h-14 flex-shrink-0 items-center justify-between px-6">
              <Link href="/" aria-label={BRAND.name} onClick={() => setIsOpen(false)}>
                <NavLogo solid />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[var(--color-text-muted)] transition-colors duration-[180ms] hover:text-[var(--color-text)]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line
                    x1="3"
                    y1="3"
                    x2="17"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="17"
                    y1="3"
                    x2="3"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div
              aria-hidden="true"
              className="mx-6 h-px flex-shrink-0"
              style={{ background: "var(--color-divider)" }}
            />

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
