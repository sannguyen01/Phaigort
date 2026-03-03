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
    "bg-gold text-obsidian hover:bg-gold/90 active:bg-gold/80",
  secondary:
    "border border-gold/40 text-gold hover:bg-gold/10 active:bg-gold/20",
  ghost:
    "text-ivory/80 hover:text-cream hover:bg-ivory/5",
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
