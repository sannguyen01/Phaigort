"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-royal-navy border-b border-platinum/10">
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-brand text-xl md:text-2xl tracking-logo uppercase font-medium text-platinum hover:text-platinum/75 transition-colors duration-300"
        >
          {BRAND.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-body text-[11px] uppercase tracking-widest transition-colors duration-300",
                  isActive
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
          className="md:hidden p-2 text-platinum/70 hover:text-platinum transition-colors"
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
            className="md:hidden overflow-hidden bg-royal-navy border-b border-platinum/10"
          >
            <Container className="flex flex-col gap-6 py-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-body text-sm uppercase tracking-widest transition-colors duration-300",
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
