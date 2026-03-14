import { cn } from "@/lib/utils";

type BridgeDirection = "navy-to-platinum" | "platinum-to-navy";

const gradients: Record<BridgeDirection, string> = {
  "navy-to-platinum": "bg-gradient-to-b from-royal-navy to-platinum",
  "platinum-to-navy": "bg-gradient-to-b from-platinum to-royal-navy",
};

interface SectionBridgeProps {
  direction: BridgeDirection;
  className?: string;
}

export function SectionBridge({ direction, className }: SectionBridgeProps) {
  return (
    <div
      aria-hidden
      className={cn("h-16 md:h-24", gradients[direction], className)}
    />
  );
}

export default SectionBridge;
