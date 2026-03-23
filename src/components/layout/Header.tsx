"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { useActiveSection } from "@/lib/useActiveSection";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const scrollActive = useActiveSection(isHomepage);

  // Scroll-reactive: transparent over dark hero → frosted warm-ivory after 75vh
  useEffect(() => {
    const getThreshold = () => window.innerHeight * 0.75;
    const onScroll = () => setScrolled(window.scrollY > getThreshold());
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-warm-ivory/95 backdrop-blur-md border-b border-royal-navy/[0.08] shadow-sm"
          : "bg-royal-navy border-b border-platinum/10"
      )}
    >
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className={cn(
            "font-brand text-xl md:text-2xl tracking-logo uppercase font-medium transition-colors duration-500",
            scrolled
              ? "text-royal-navy hover:text-royal-navy/70"
              : "text-platinum hover:text-platinum/75"
          )}
        >
          {BRAND.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || scrollActive === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive || undefined}
                className={cn(
                  "nav-link relative font-brand text-[11px] uppercase tracking-widest transition-colors duration-500",
                  scrolled
                    ? isActive
                      ? "font-semibold text-royal-navy"
                      : "text-royal-navy/55 hover:text-royal-navy"
                    : isActive
                    ? "font-semibold text-platinum"
                    : "text-platinum/55 hover:text-platinum"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "md:hidden p-2 transition-colors duration-500",
            scrolled
              ? "text-royal-navy/70 hover:text-royal-navy"
              : "text-platinum/70 hover:text-platinum"
          )}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={cn(
                "block h-px bg-current transition-transform duration-300",
                mobileOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px bg-current transition-opacity duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-px bg-current transition-transform duration-300",
                mobileOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </div>
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-royal-navy border-b border-platinum/10"
          >
            <Container className="flex flex-col gap-6 py-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || scrollActive === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-brand text-sm uppercase tracking-widest transition-colors duration-300",
                      isActive
                        ? "font-semibold text-platinum"
                        : "text-platinum/55 hover:text-platinum"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
