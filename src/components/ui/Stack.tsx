import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type StackSize = "sm" | "md" | "lg" | "xl";

interface StackProps {
  children: ReactNode;
  className?: string;
  gap?: StackSize;
}

const gapMap: Record<StackSize, string> = {
  sm: "gap-4",
  md: "gap-8",
  lg: "gap-16",
  xl: "gap-24",
};

export function Stack({ children, className, gap = "md" }: StackProps) {
  return (
    <div className={cn("flex flex-col", gapMap[gap], className)}>
      {children}
    </div>
  );
}

export default Stack;
