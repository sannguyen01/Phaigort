// src/components/ui/LogoMark.tsx
// Two logo variants:
//   variant="light" — plain wordmark in near-black (#1A1917), for light ground sections
//   variant="dark"  — wordmark inside diamond/rhombus in white, for dark field sections
//
// Legacy navy prop preserved for backward compatibility with Header/Footer callers
// that haven't migrated yet.

interface LogoMarkProps {
  /** @deprecated Use variant instead */
  navy?: boolean;
  variant?: "light" | "dark";
  width?: number;
  height?: number;
}

export function PhaigortLogoMark({ navy, variant, width = 132, height = 46 }: LogoMarkProps) {
  // Resolve effective variant: new prop wins, legacy navy prop as fallback
  const resolved: "light" | "dark" = variant ?? (navy ? "light" : "dark");

  if (resolved === "light") {
    // Plain wordmark — near-black on light ground
    return (
      <svg
        viewBox="0 0 220 36"
        width={width}
        height={height}
        aria-hidden="true"
        className="transition-all duration-[350ms]"
      >
        <text
          x="0"
          y="27"
          fontFamily="var(--font-garet), var(--font-jost), Jost, sans-serif"
          fontSize="17"
          fontWeight="700"
          letterSpacing="5"
          fill="#1A1917"
          textAnchor="start"
        >
          PHAIGORT
        </text>
      </svg>
    );
  }

  // Dark variant — diamond/rhombus form with white wordmark
  return (
    <svg
      viewBox="0 0 300 106"
      width={width}
      height={height}
      aria-hidden="true"
      className="transition-all duration-[350ms]"
    >
      {/* Rhombus outline */}
      <polygon
        points="150,3 297,53 150,103 3,53"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      {/* Subtle fill */}
      <polygon points="150,3 297,53 150,103 3,53" fill="rgba(255,255,255,0.04)" />
      {/* Wordmark */}
      <text
        x="150"
        y="59"
        textAnchor="middle"
        fontFamily="var(--font-garet), var(--font-jost), Jost, sans-serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="4"
        fill="#ffffff"
      >
        PHAIGORT
      </text>
    </svg>
  );
}

export default PhaigortLogoMark;
