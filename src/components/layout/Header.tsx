"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-platinum/95 border-b border-royal-navy/10">
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-heading text-xl md:text-2xl tracking-logo uppercase font-medium text-royal-navy hover:text-royal-navy/70 transition-colors duration-300"
        >
          {BRAND.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-body text-[11px] uppercase tracking-widest",
                "font-normal tracking-wide text-royal-navy/60",
                "hover:text-royal-navy transition-colors duration-200",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
                "after:bg-coral after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-royal-navy/60 hover:text-royal-navy transition-colors"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className={cn("block h-px bg-current transition-transform duration-300", mobileOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("block h-px bg-current transition-opacity duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block h-px bg-current transition-transform duration-300", mobileOpen && "-translate-y-[7px] -rotate-45")} />
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
            className="md:hidden overflow-hidden bg-platinum border-b border-royal-navy/10"
          >
            <Container className="flex flex-col gap-6 py-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm uppercase tracking-widest text-royal-navy/60 hover:text-royal-navy transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
