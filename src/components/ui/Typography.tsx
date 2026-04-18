import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Display({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn("font-display leading-[1.05] tracking-[0.02em]", className)}
      style={{ fontSize: "var(--text-hero)", color: "var(--color-text)" }}
    >
      {children}
    </h1>
  );
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn("font-display font-bold leading-[1.1]", className)}
      style={{ fontSize: "var(--text-3xl)", color: "var(--color-text)" }}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn("font-display font-bold leading-[1.2]", className)}
      style={{ fontSize: "var(--text-2xl)", color: "var(--color-text)" }}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn("font-display font-bold leading-[1.3]", className)}
      style={{ fontSize: "var(--text-xl)", color: "var(--color-text)" }}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn("font-display font-bold leading-snug", className)}
      style={{ fontSize: "var(--text-lg)", color: "var(--color-text)" }}
    >
      {children}
    </h4>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={cn("font-ui max-w-prose leading-[1.75]", className)}
      style={{ fontSize: "var(--text-base)", color: "var(--color-text-body)" }}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span
      className={cn("font-ui font-medium uppercase tracking-[0.2em]", className)}
      style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
    >
      {children}
    </span>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <span
      className={cn("font-ui font-medium uppercase tracking-[0.18em]", className)}
      style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
    >
      {children}
    </span>
  );
}

const Typography = { Display, H1, H2, H3, H4, Body, Caption, Label };
export default Typography;
