import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
} & (
    | { href: string; type?: never }
    | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
  );

const variants = {
  primary:
    "bg-coral text-platinum hover:bg-coral/90 active:bg-coral/80",
  secondary:
    "border border-royal-navy/20 text-royal-navy hover:bg-royal-navy/5 active:bg-royal-navy/10",
  ghost:
    "text-royal-navy/70 hover:text-royal-navy hover:bg-royal-navy/5",
} as const;

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center px-8 py-3",
    "font-body text-sm uppercase tracking-widest",
    "transition-all duration-300 ease-out",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
