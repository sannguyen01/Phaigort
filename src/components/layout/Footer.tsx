import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, BRAND, SOCIAL } from "@/lib/constants";
import { Caption } from "@/components/ui/Typography";
import { PhaigortLogoMark } from "@/components/ui/LogoMark";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-navy pb-10 pt-12 text-platinum md:pt-16">
      <Container>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-16">
          {/* Brand column */}
          <div className="space-y-4 py-8 md:py-0">
            <Link
              href="/"
              aria-label={BRAND.name}
              className="inline-block opacity-100 transition-opacity duration-300 hover:opacity-70"
            >
              {/* White logomark on navy background */}
              <PhaigortLogoMark navy={false} />
            </Link>
            <p className="max-w-xs font-body text-sm leading-relaxed text-platinum/60">
              {BRAND.tagline}
            </p>
          </div>

          {/* Mobile divider */}
          <div className="h-px bg-platinum/10 md:hidden" />

          {/* Explore column */}
          <div className="space-y-4 py-8 md:py-0">
            <Caption>Explore</Caption>
            <nav className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-platinum/60 transition-colors duration-300 hover:text-platinum"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile divider */}
          <div className="h-px bg-platinum/10 md:hidden" />

          {/* Connect column */}
          <div className="space-y-4 py-8 md:py-0">
            <Caption>Connect</Caption>
            <nav className="mt-4 flex flex-col gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-platinum/60 transition-colors duration-300 hover:text-platinum"
              >
                Instagram
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-platinum/60 transition-colors duration-300 hover:text-platinum"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="mb-6 mt-10 h-px bg-gradient-to-r from-transparent via-platinum/15 to-transparent" />
        <p className="text-center font-body text-xs text-platinum/40">
          &copy; {currentYear} {BRAND.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
