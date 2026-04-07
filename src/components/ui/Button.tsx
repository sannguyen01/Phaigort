import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onDark?: boolean;
} & (
  | { href: string; type?: never }
  | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
);

const variants = {
  // Light surface: negative-space button — platinum field, navy letter, navy border
  // Dark surface: platinum field, navy letter, no border (background provides contrast)
  primary:
    "bg-platinum text-royal-navy border border-royal-navy/20 hover:bg-royal-navy hover:text-platinum active:bg-royal-navy/90 active:text-platinum",
  primaryOnDark:
    "bg-platinum text-royal-navy border border-transparent hover:bg-platinum/85 active:bg-platinum/70",
  secondary:
    "border border-royal-navy/20 text-royal-navy hover:bg-royal-navy/5 active:bg-royal-navy/10",
  secondaryOnDark:
    "border border-platinum/30 text-platinum hover:bg-platinum/10 active:bg-platinum/20",
  ghost: "text-royal-navy/70 hover:text-royal-navy hover:bg-royal-navy/5",
  ghostOnDark: "text-platinum/60 hover:text-platinum",
} as const;

export function Button({
  children,
  className,
  variant = "primary",
  onDark = false,
  ...props
}: ButtonProps) {
  const variantKey =
    variant === "secondary" && onDark
      ? "secondaryOnDark"
      : variant === "primary" && onDark
        ? "primaryOnDark"
        : variant === "ghost" && onDark
          ? "ghostOnDark"
          : variant;
  const classes = cn(
    "inline-flex items-center justify-center px-10 py-[13px]",
    "font-body text-sm uppercase tracking-widest",
    "transition-all duration-300 ease-out",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variantKey],
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
