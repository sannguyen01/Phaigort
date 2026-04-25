// src/components/ui/LogoMark.tsx
// Diamond logo — solid-filled rhombus matching brand reference images.
// Two display variants:
//   "dark"  — dark fill (#141414), white text — transparent header / footer on dark ground
//   "light" — white fill (#FAFAFA), void-black text — solid light header
// "wordmark-white" maps to "dark" for backward compatibility.
//
// SVG viewBox 0 0 420 222 gives ~2.10:1 aspect ratio matching the brand mark.
// Diamond points: top-center (210,14), right (414,111), bottom-center (210,208), left (6,111).
// fontWeight 400 (regular) matches the reference brand assets exactly.

interface LogoMarkProps {
  /** @deprecated Use variant instead */
  navy?: boolean;
  variant?: "light" | "dark" | "wordmark-white";
  width?: number;
  height?: number;
  className?: string;
}

// Diamond proportions: wide flat rhombus, 2.10:1 (width:height) — matches brand PNG assets.
const DIAMOND = "210,14 414,111 210,208 6,111";

export function PhaigortLogoMark({
  navy,
  variant,
  width = 140,
  height = 67,
  className,
}: LogoMarkProps) {
  const resolved: "light" | "dark" = variant === "light" ? "light" : "dark"; // wordmark-white and dark → dark diamond

  const _ = navy; // suppress unused-var lint (legacy prop, no longer drives rendering)

  const diamondFill = resolved === "light" ? "#FAFAFA" : "#141414";
  const textFill = resolved === "light" ? "#0A0A0A" : "#FAFAFA";

  return (
    <svg
      viewBox="0 0 420 222"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Solid diamond fill */}
      <polygon points={DIAMOND} fill={diamondFill} />

      {/* Wordmark — Garet regular, centered inside diamond */}
      <text
        x="210"
        y="111"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Garet, Inter, system-ui, sans-serif"
        fontSize="32"
        fontWeight="400"
        letterSpacing="3"
        fill={textFill}
      >
        PHAIGORT
      </text>
    </svg>
  );
}

export default PhaigortLogoMark;
