import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

// Ghost-only button system — CLAUDE.md design rule:
// Border: 1px solid rgba(250,250,250,0.25) · Background: transparent
// Text: T-12 #FAFAFA · Hover: border-opacity → 50%, no fill change
type ButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
} & (
  | { href: string; type?: never }
  | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
);

export function Button({ children, className, size = "md", ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center",
    "font-ui uppercase tracking-[0.18em]",
    "border transition-all duration-300 ease-out",
    "text-[var(--color-text)] bg-transparent",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    size === "sm"
      ? "px-7 py-[10px] text-[10px]"
      : "px-10 py-[13px] text-[11px]",
    "border-[rgba(250,250,250,0.25)] hover:border-[rgba(250,250,250,0.50)]",
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _, ...buttonProps } = props as { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
