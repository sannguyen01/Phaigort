// src/components/ui/LogoMark.tsx
// Diamond logo — solid-filled rhombus matching brand reference images.
// Two display variants:
//   "dark"  — dark fill (#141414), white text — transparent header / footer on dark ground
//   "light" — white fill (#FAFAFA), void-black text — solid light header
// "wordmark-white" maps to "dark" for backward compatibility.
//
// SVG viewBox 0 0 420 162 gives ~2.59:1 aspect ratio matching the brand mark.
// All text uses textAnchor="middle" so the diamond is always visually centered.

interface LogoMarkProps {
  /** @deprecated Use variant instead */
  navy?: boolean;
  variant?: "light" | "dark" | "wordmark-white";
  width?: number;
  height?: number;
  className?: string;
}

// Diamond proportions: wide flat rhombus, 2.59:1 (width:height).
// Points: top-center, right, bottom-center, left.
const DIAMOND = "210,6 414,81 210,156 6,81";

export function PhaigortLogoMark({
  navy,
  variant,
  width = 164,
  height = 63,
  className,
}: LogoMarkProps) {
  const resolved: "light" | "dark" =
    variant === "light" ? "light" : "dark"; // wordmark-white and dark → dark diamond

  const _ = navy; // suppress unused-var lint (legacy prop, no longer drives rendering)

  const diamondFill = resolved === "light" ? "#FAFAFA" : "#141414";
  const textFill = resolved === "light" ? "#0A0A0A" : "#FAFAFA";

  return (
    <svg
      viewBox="0 0 420 162"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Solid diamond fill */}
      <polygon points={DIAMOND} fill={diamondFill} />

      {/* Wordmark — Garet, centered inside diamond */}
      <text
        x="210"
        y="90"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Garet, Inter, system-ui, sans-serif"
        fontSize="22"
        fontWeight="600"
        letterSpacing="5"
        fill={textFill}
      >
        PHAIGORT
      </text>
    </svg>
  );
}

export default PhaigortLogoMark;
