"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";

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

// ─── Component ────────────────────────────────────────────────────────────────

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const overlayId = useId();
  const prefersReducedMotion = useReducedMotion();

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

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ESC key closes overlay
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Active route check
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ── LAYER 1: PERSISTENT CHROME STRIP ─────────────────────────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] h-[72px] transition-colors duration-[350ms] ease-[cubic-bezier(0,0,0.58,1)]",
          isOpen
            ? "border-b border-transparent bg-royal-navy"
            : "border-b border-royal-navy/[0.07] bg-platinum"
        )}
      >
        {/* Three-element layout: trigger | wordmark | spacer */}
        <div className="relative flex h-full items-center justify-between px-6 md:px-10 lg:px-14">
          {/* LEFT — Menu / Close text trigger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls={overlayId}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className={cn(
              "relative z-10 -ml-2 flex min-h-[44px] min-w-[44px] items-center justify-center px-2",
              "font-brand text-[0.65rem] uppercase tracking-[0.18em]",
              "transition-colors duration-[350ms]",
              isOpen
                ? "text-platinum/70 hover:text-platinum"
                : "text-royal-navy/55 hover:text-royal-navy"
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

          {/* CENTER — Wordmark, absolute-centered in strip */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link
              href="/"
              className={cn(
                "pointer-events-auto font-brand text-[1.1rem] md:text-[1.2rem]",
                "font-medium uppercase tracking-[0.25em]",
                "transition-colors duration-[350ms]",
                isOpen
                  ? "text-platinum hover:text-platinum/80"
                  : "text-royal-navy hover:text-royal-navy/70"
              )}
              onClick={() => setIsOpen(false)}
            >
              {BRAND.name}
            </Link>
          </div>

          {/* RIGHT — Spacer (balances flex layout) */}
          <div className="h-[44px] min-w-[44px]" aria-hidden="true" />
        </div>
      </header>

      {/* ── LAYER 2: FULL-VIEWPORT CURTAIN OVERLAY ───────────────────────── */}
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
            {/* ── NAV CONTENT ──────────────────────────────────────────── */}
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

            {/* FOOTER STRIP — fades in after nav items */}
            <motion.div
              variants={reducedVariants(FOOTER_STRIP_VARIANTS)}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute bottom-0 left-0 right-0",
                "flex items-center justify-between",
                "px-[clamp(24px,4vw,64px)] pb-10 pt-4",
                "border-t border-platinum/[0.08]"
              )}
            >
              <span className="font-brand text-[0.65rem] uppercase tracking-[0.18em] text-platinum/30">
                {BRAND.tagline}
              </span>
              <span className="font-brand text-[0.65rem] uppercase tracking-[0.18em] text-platinum/30">
                Est. Hanoi
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
