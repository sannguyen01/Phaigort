import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { NAV_LINKS, BRAND, SOCIAL } from "@/lib/constants";
import { Caption } from "@/components/ui/Typography";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-navy text-platinum">
      <Divider />
      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <Link
              href="/"
              className="font-brand text-2xl tracking-logo uppercase font-medium text-platinum hover:text-coral transition-colors duration-300"
            >
              {BRAND.name}
            </Link>
            <p className="font-body text-sm leading-relaxed text-platinum/60 max-w-xs">
              {BRAND.tagline}
            </p>
          </div>
          <div className="space-y-4">
            <Caption>Explore</Caption>
            <nav className="flex flex-col gap-3 mt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-platinum/60 hover:text-platinum transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <Caption>Connect</Caption>
            <nav className="flex flex-col gap-3 mt-4">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-platinum/60 hover:text-platinum transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-platinum/60 hover:text-platinum transition-colors duration-300"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
        <div className="gold-line mt-16 mb-8" />
        <p className="font-body text-xs text-platinum/40 text-center">
          &copy; {currentYear} {BRAND.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
