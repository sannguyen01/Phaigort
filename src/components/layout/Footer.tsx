import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { NAV_LINKS, BRAND, SOCIAL } from "@/lib/constants";
import { Caption } from "@/components/ui/Typography";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32">
      <Divider />
      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-heading text-3xl tracking-wider text-cream hover:text-gold transition-colors duration-300"
            >
              {BRAND.name}
            </Link>
            <p className="font-body text-sm leading-relaxed text-ivory/60 max-w-xs">
              {BRAND.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <Caption>Explore</Caption>
            <nav className="flex flex-col gap-3 mt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-ivory/60 hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <Caption>Connect</Caption>
            <nav className="flex flex-col gap-3 mt-4">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-ivory/60 hover:text-cream transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-ivory/60 hover:text-cream transition-colors duration-300"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="gold-line mt-16 mb-8" />
        <p className="font-body text-xs text-ivory/40 text-center">
          &copy; {currentYear} {BRAND.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
