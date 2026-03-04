import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type Intensity = "full" | "deep" | "medium";

interface DarkFieldStageProps {
  children: ReactNode;
  className?: string;
  intensity?: Intensity;
  as?: "section" | "div";
}

const intensityMap: Record<Intensity, string> = {
  full: "bg-royal-navy",
  deep: "bg-deep-navy",
  medium: "bg-royal-navy/90",
};

export function DarkFieldStage({
  children,
  className,
  intensity = "full",
  as: Tag = "section",
}: DarkFieldStageProps) {
  return (
    <Tag
      className={cn(
        intensityMap[intensity],
        "text-platinum",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export default DarkFieldStage;
