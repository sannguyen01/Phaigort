import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-6 sm:px-8 md:px-12 lg:px-16", className)}>
      {children}
    </div>
  );
}

export default Container;
