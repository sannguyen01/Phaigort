import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Display({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-display text-6xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("font-display text-4xl font-bold leading-snug md:text-5xl", className)}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("font-display text-3xl font-bold leading-snug", className)}>{children}</h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn("font-display text-xl font-bold leading-snug md:text-2xl", className)}>
      {children}
    </h4>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p className={cn("max-w-prose font-ui text-base leading-relaxed", className)}>{children}</p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-ui text-[11px] font-medium uppercase tracking-[0.2em] text-silver",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <span className={cn("font-ui text-[11px] font-medium uppercase tracking-widest", className)}>
      {children}
    </span>
  );
}

const Typography = {
  Display,
  H1,
  H2,
  H3,
  H4,
  Body,
  Caption,
  Label,
};

export default Typography;
