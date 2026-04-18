import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DarkFieldStageProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "full" | "deep" | "medium";
}

// 12-tone mapping — CLAUDE.md §Design System
// deep   → T-01 Void Obsidian #0A0A0A (bg-ground) — deepest void
// full   → T-02 Abyssal Carbon #141414 (bg-t02)   — hero-depth layer
// medium → T-03 Void Ink #1C1C1C (bg-stone)       — elevated surface
export const DarkFieldStage = forwardRef<HTMLElement, DarkFieldStageProps>(function DarkFieldStage(
  { children, className, intensity = "full" },
  ref
) {
  const bg = {
    deep:   "bg-ground",
    full:   "bg-t02",
    medium: "bg-stone",
  }[intensity];

  return (
    <section
      ref={ref}
      className={cn(bg, "relative py-16 md:py-20", className)}
      style={{ color: "var(--color-text)" }}
    >
      {children}
    </section>
  );
});

export default DarkFieldStage;
