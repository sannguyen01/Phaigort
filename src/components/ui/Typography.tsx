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
        "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-platinum",
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
        "font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-light tracking-tight text-platinum",
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
        "font-heading text-2xl md:text-3xl font-light tracking-tight text-platinum",
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
        "font-heading text-xl md:text-2xl font-light text-platinum",
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
        "font-heading text-lg md:text-xl font-normal text-platinum",
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
        "font-body text-base md:text-lg leading-relaxed text-platinum/80",
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
        "font-body text-sm uppercase tracking-widest text-silver",
        className
      )}
    >
      {children}
    </span>
  );
}

const Typography = {
  Display, H1, H2, H3, H4, Body, Caption,
};

export default Typography;
