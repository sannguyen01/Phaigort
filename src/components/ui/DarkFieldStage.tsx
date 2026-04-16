import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DarkFieldStageProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "full" | "deep" | "medium";
}

export const DarkFieldStage = forwardRef<HTMLElement, DarkFieldStageProps>(function DarkFieldStage(
  { children, className, intensity = "full" },
  ref
) {
  const bg = {
    full: "bg-[#0A0F1D] text-platinum",
    deep: "bg-[#08090D] text-platinum",
    medium: "bg-[#0D0B09] text-platinum",
  }[intensity];

  return (
    <section ref={ref} className={cn(bg, "relative py-16 md:py-20", className)}>
      {children}
    </section>
  );
});

export default DarkFieldStage;
