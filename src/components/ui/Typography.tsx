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
        "font-heading text-5xl md:text-7xl font-bold tracking-tight leading-none",
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
        "font-heading text-4xl md:text-5xl font-semibold tracking-tight leading-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl md:text-4xl font-semibold leading-snug",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "font-heading text-2xl font-semibold leading-snug",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "font-heading text-lg md:text-xl font-semibold leading-snug",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "font-body text-base md:text-lg leading-relaxed max-w-prose",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-body text-sm leading-relaxed text-royal-navy/70",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-body text-xs uppercase tracking-widest font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

const Typography = {
  Display, H1, H2, H3, H4, Body, Caption, Label,
};

export default Typography;
