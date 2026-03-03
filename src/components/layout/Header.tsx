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
    <header className="fixed inset-x-0 top-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-slate-stone/20">
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl tracking-wider text-cream hover:text-gold transition-colors duration-300"
        >
          {BRAND.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-body text-xs uppercase tracking-widest text-ivory/70",
                "hover:text-cream transition-colors duration-300",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
                "after:bg-gold after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-ivory/70 hover:text-cream transition-colors"
          aria-label="Toggle navigation"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-obsidian border-b border-slate-stone/20"
          >
            <Container className="flex flex-col gap-6 py-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm uppercase tracking-widest text-ivory/70 hover:text-cream transition-colors duration-300"
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
