import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("gold-line my-16 md:my-24", className)} />;
}

export default Divider;
