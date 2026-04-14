import Link from "next/link";
import { NAV_LINKS, BRAND, SOCIAL } from "@/lib/constants";
import { PhaigortLogoMark } from "@/components/ui/LogoMark";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ground pb-10 pt-14 md:pt-20">
      <div className="mx-auto max-w-content px-[clamp(24px,4vw,64px)]">
        {/* Main row: wordmark + tagline left, nav columns right */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Wordmark + tagline */}
          <div className="space-y-3">
            <Link
              href="/"
              aria-label={BRAND.name}
              className="inline-block transition-opacity duration-300 hover:opacity-60"
            >
              <PhaigortLogoMark variant="light" />
            </Link>
            <p className="max-w-[220px] font-ui text-[13px] leading-relaxed text-muted">
              {BRAND.tagline}
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-14">
            <nav aria-label="Explore">
              <p className="mb-4 font-ui text-[10px] uppercase tracking-[0.15em] text-muted">
                Explore
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-ui text-[13px] text-ink/55 transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Connect">
              <p className="mb-4 font-ui text-[10px] uppercase tracking-[0.15em] text-muted">
                Connect
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-[13px] text-ink/55 transition-colors duration-200 hover:text-ink"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-[13px] text-ink/55 transition-colors duration-200 hover:text-ink"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* 1px divider */}
        <div className="my-10 h-px bg-stone" />

        {/* Copyright */}
        <p className="font-ui text-[12px] text-muted/70">
          &copy; {currentYear} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
