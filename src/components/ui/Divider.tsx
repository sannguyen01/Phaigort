import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("gold-line my-8 md:my-12", className)} />;
}

export default Divider;
