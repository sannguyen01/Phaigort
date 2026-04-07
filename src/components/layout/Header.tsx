"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND, TREASURE_DOMAINS } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

type TreasureDomain = (typeof TREASURE_DOMAINS)[number];

// ─── Logo mark ────────────────────────────────────────────────────────────────
// Inline SVG ensures crisp rendering at all DPI levels and full color control
// across transparent (dark hero), solid (platinum), and overlay (royal-navy) states.
// navy=true → deep-navy diamond + white label (on platinum header)
// navy=false → white diamond + deep-navy label (on dark/overlay backgrounds)

function PhaigortLogoMark({ navy }: { navy: boolean }) {
  const diamond = navy ? "#03195e" : "#ffffff";
  const label = navy ? "#ffffff" : "#03195e";
  return (
    <svg
      viewBox="0 0 300 106"
      width={132}
      height={46}
      aria-hidden="true"
      className="transition-all duration-[350ms]"
    >
      <polygon points="150,3 297,53 150,103 3,53" fill={diamond} />
      <text
        x="150"
        y="59"
        textAnchor="middle"
        fontFamily="var(--font-jost), Jost, sans-serif"
        fontSize="23"
        fontWeight="400"
        letterSpacing="3.5"
        fill={label}
      >
        PHAIGORT
      </text>
    </svg>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────

const NAV_ITEM_VARIANTS = {
  hidden: { y: "108%", transition: { duration: 0.3, ease: [0.42, 0, 1, 1] } },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.0, 0.0, 0.3, 1.0],
      delay: 0.18 + i * 0.07,
    },
  }),
  exit: { y: "-108%", transition: { duration: 0.3, ease: [0.42, 0, 1, 1] } },
};

const FOOTER_STRIP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.75, duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const DROPDOWN_VARIANTS = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.42, 0, 1, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<TreasureDomain>(TREASURE_DOMAINS[0]);
  const pathname = usePathname();
  const overlayId = useId();
  const prefersReducedMotion = useReducedMotion();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reduced-motion: collapse all animation durations to imperceptible
  const reducedVariants = <T extends Record<string, unknown>>(variants: T): T =>
    prefersReducedMotion
      ? (Object.fromEntries(
          Object.entries(variants).map(([k, v]) => [
            k,
            { ...(v as object), transition: { duration: 0.01 } },
          ])
        ) as T)
      : variants;

  // Scroll transparency
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll lock — mobile overlay only
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Dropdown hover with 120ms close delay (prevents accidental dismissal)
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

  // Solid state: always solid on subpages (no dark hero guarantees at y=0),
  // or when scrolled / dropdown open on the homepage.
  const isSolid = pathname !== "/" || scrolled || activeDropdown !== null;

  return (
    <>
      {/* ── LAYER 1: PERSISTENT CHROME STRIP ─────────────────────────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] h-[72px]",
          "transition-all duration-[350ms] ease-[cubic-bezier(0,0,0.58,1)]",
          isOpen
            ? "border-b border-transparent bg-royal-navy"
            : isSolid
              ? "border-b border-royal-navy/[0.07] bg-platinum/95 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="relative flex h-full items-center justify-between px-6 md:px-10 lg:px-14">
          {/* ── LEFT: Mobile = Menu/Close | Desktop = Nav links ──────────── */}

          {/* Mobile trigger — hidden on md+ */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls={overlayId}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className={cn(
              "relative z-10 -ml-2 flex min-h-[44px] min-w-[44px] items-center justify-center px-2",
              "font-brand text-[0.72rem] uppercase tracking-[0.18em]",
              "transition-colors duration-[350ms] md:hidden",
              isOpen
                ? "text-platinum/70 hover:text-platinum"
                : isSolid
                  ? "text-royal-navy/55 hover:text-royal-navy"
                  : "text-platinum/70 hover:text-platinum"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  Close
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  Menu
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* ── Desktop left nav: The Collection · Our Story ─────────────── */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 md:flex lg:gap-9"
          >
            {/* The Collection — triggers mega-menu dropdown */}
            <button
              onMouseEnter={() => openDropdown("collections")}
              onMouseLeave={scheduleClose}
              aria-expanded={activeDropdown === "collections"}
              aria-haspopup="true"
              className={cn(
                "relative font-brand text-[0.78rem] uppercase tracking-[0.14em]",
                "transition-colors duration-[350ms]",
                activeDropdown === "collections" || isActive("/collections")
                  ? isSolid
                    ? "text-royal-navy"
                    : "text-platinum"
                  : isSolid
                    ? "text-royal-navy/55 hover:text-royal-navy"
                    : "text-platinum/65 hover:text-platinum"
              )}
            >
              {NAV_LINKS[0].label}
            </button>

            {/* Our Story */}
            <Link
              href={NAV_LINKS[1].href}
              className={cn(
                "relative font-brand text-[0.78rem] uppercase tracking-[0.14em]",
                "transition-colors duration-[350ms]",
                isActive(NAV_LINKS[1].href)
                  ? isSolid
                    ? "text-royal-navy"
                    : "text-platinum"
                  : isSolid
                    ? "text-royal-navy/55 hover:text-royal-navy"
                    : "text-platinum/65 hover:text-platinum"
              )}
            >
              {NAV_LINKS[1].label}
            </Link>
          </nav>

          {/* ── Logo — absolute centre on all viewports ───────────────────── */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link
              href="/"
              className="pointer-events-auto"
              onClick={() => setIsOpen(false)}
              aria-label={BRAND.name}
            >
              <PhaigortLogoMark navy={isSolid && !isOpen} />
            </Link>
          </div>

          {/* ── Desktop right nav: Atelier · Private Enquiry ─────────────── */}
          <nav
            aria-label="Secondary navigation"
            className="hidden items-center gap-7 md:flex lg:gap-9"
          >
            {/* Atelier */}
            <Link
              href={NAV_LINKS[2].href}
              className={cn(
                "relative font-brand text-[0.78rem] uppercase tracking-[0.14em]",
                "transition-colors duration-[350ms]",
                isActive(NAV_LINKS[2].href)
                  ? isSolid
                    ? "text-royal-navy"
                    : "text-platinum"
                  : isSolid
                    ? "text-royal-navy/55 hover:text-royal-navy"
                    : "text-platinum/65 hover:text-platinum"
              )}
            >
              {NAV_LINKS[2].label}
            </Link>

            {/* Private Enquiry */}
            <Link
              href={NAV_LINKS[3].href}
              className={cn(
                "relative font-brand text-[0.78rem] uppercase tracking-[0.14em]",
                "transition-colors duration-[350ms]",
                isActive(NAV_LINKS[3].href)
                  ? isSolid
                    ? "text-royal-navy"
                    : "text-platinum"
                  : isSolid
                    ? "text-royal-navy/55 hover:text-royal-navy"
                    : "text-platinum/65 hover:text-platinum"
              )}
            >
              {NAV_LINKS[3].label}
            </Link>
          </nav>

          {/* Mobile spacer — mirrors Menu button width for logo centering */}
          <div className="h-[44px] min-w-[44px] md:hidden" aria-hidden="true" />
        </div>

        {/* ── DESKTOP MEGA-MENU DROPDOWN ───────────────────────────────────── */}
        <AnimatePresence>
          {activeDropdown === "collections" && (
            <motion.div
              role="region"
              aria-label="Collection categories"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              variants={reducedVariants(DROPDOWN_VARIANTS)}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute left-0 right-0 top-full bg-platinum",
                "border-b border-royal-navy/[0.07]",
                "grid min-h-[320px] grid-cols-[1fr_1.8fr]"
              )}
            >
              {/* Left: typographic domain list */}
              <div className="flex flex-col justify-center gap-1 border-r border-royal-navy/[0.06] px-10 py-10 lg:px-14">
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
                      "block py-2 font-heading text-[1.45rem] font-light tracking-[0.02em]",
                      "cursor-pointer transition-colors duration-150",
                      hoveredDomain.title === domain.title
                        ? "text-royal-navy"
                        : "text-royal-navy/38 hover:text-royal-navy/70"
                    )}
                  >
                    {domain.title}
                  </motion.a>
                ))}
              </div>

              {/* Right: editorial image panel — crossfades on hover */}
              <div className="relative overflow-hidden bg-deep-navy">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredDomain.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.3 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${hoveredDomain.image})` }}
                    role="img"
                    aria-label={hoveredDomain.imageAlt}
                  />
                </AnimatePresence>
                {/* Depth gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-navy/65 via-transparent to-transparent" />
                {/* Domain caption */}
                <div className="absolute bottom-6 left-6">
                  <p className="font-brand text-[0.72rem] uppercase tracking-[0.18em] text-platinum/55">
                    {hoveredDomain.title}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── PAGE DIMMING: desktop dropdown backdrop ──────────────────────────── */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-0 z-[58] bg-royal-navy/20"
            style={{ top: "72px" }}
          />
        )}
      </AnimatePresence>

      {/* ── LAYER 2: FULL-VIEWPORT CURTAIN OVERLAY (mobile) ─────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={overlayId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 1, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : {
                    clipPath: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.01 },
                  }
            }
            className="fixed inset-0 z-[55] flex flex-col bg-royal-navy"
          >
            {/* NAV CONTENT */}
            <div
              className={cn(
                "flex flex-1 flex-col justify-center",
                "pb-[64px] pt-[96px]",
                "px-[clamp(24px,4vw,64px)]"
              )}
            >
              <nav aria-label="Site navigation overlay">
                <ul className="flex flex-col gap-[clamp(8px,2vh,18px)]">
                  {NAV_LINKS.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <li key={link.href} className="overflow-hidden">
                        <motion.div
                          custom={i}
                          variants={reducedVariants(NAV_ITEM_VARIANTS)}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block font-heading font-light leading-[1.15]",
                              "tracking-[0.04em]",
                              "text-[clamp(1.8rem,3.5vw,3.2rem)]",
                              "transition-colors duration-[250ms]",
                              active ? "text-[#F0EBE3]" : "text-platinum/80 hover:text-platinum/45"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Footer strip — fades in after nav items */}
            <motion.div
              variants={reducedVariants(FOOTER_STRIP_VARIANTS)}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute bottom-0 left-0 right-0",
                "flex items-center justify-center",
                "px-[clamp(24px,4vw,64px)] pb-10 pt-4",
                "border-t border-platinum/[0.08]"
              )}
            >
              <span className="font-brand text-[0.72rem] uppercase tracking-[0.18em] text-platinum/30">
                {BRAND.tagline}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
