import Link from "next/link";
import { NAV_LINKS, BRAND, SOCIAL } from "@/lib/constants";
import { PhaigortLogoMark } from "@/components/ui/LogoMark";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="pb-10 pt-14 text-platinum md:pt-20"
      style={{ background: "var(--color-bg)" }}
    >
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
              <PhaigortLogoMark variant="dark" />
            </Link>
            <p className="max-w-[220px] font-ui text-[13px] leading-relaxed text-platinum/40">
              {BRAND.tagline}
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-14">
            <nav aria-label="Explore">
              <p className="mb-4 font-ui text-[10px] uppercase tracking-[0.15em] text-platinum/35">
                Explore
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-ui text-[13px] text-platinum/50 transition-colors duration-200 hover:text-platinum"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Connect">
              <p className="mb-4 font-ui text-[10px] uppercase tracking-[0.15em] text-platinum/35">
                Connect
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-[13px] text-platinum/50 transition-colors duration-200 hover:text-platinum"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-[13px] text-platinum/50 transition-colors duration-200 hover:text-platinum"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* 1px divider */}
        <div className="my-10 h-px bg-platinum/10" />

        {/* Copyright */}
        <p className="font-ui text-[12px] text-platinum/30">
          &copy; {currentYear} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
