// src/components/ui/LogoMark.tsx
// Shared Phaigort diamond logomark SVG — used in Header and Footer.
//
// navy=true  → deep-navy diamond + white label  (on platinum/light backgrounds)
// navy=false → white diamond + deep-navy label  (on dark/navy backgrounds)

interface LogoMarkProps {
  navy: boolean;
  width?: number;
  height?: number;
}

export function PhaigortLogoMark({ navy, width = 132, height = 46 }: LogoMarkProps) {
  const diamond = navy ? "#03195e" : "#ffffff";
  const label = navy ? "#ffffff" : "#03195e";
  return (
    <svg
      viewBox="0 0 300 106"
      width={width}
      height={height}
      aria-hidden="true"
      className="transition-all duration-[350ms]"
    >
      <polygon points="150,3 297,53 150,103 3,53" fill={diamond} />
      <text
        x="150"
        y="59"
        textAnchor="middle"
        fontFamily="var(--font-jost), Jost, sans-serif"
        fontSize="23"
        fontWeight="400"
        letterSpacing="3.5"
        fill={label}
      >
        PHAIGORT
      </text>
    </svg>
  );
}

export default PhaigortLogoMark;
