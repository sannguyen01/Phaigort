import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DarkFieldStageProps {
    children: React.ReactNode;
    className?: string;
    intensity?: "full" | "deep" | "medium";
}

export const DarkFieldStage = forwardRef<HTMLElement, DarkFieldStageProps>(
    function DarkFieldStage({ children, className, intensity = "full" }, ref) {
        const bg = {
            full: "bg-royal-navy text-platinum",
            deep: "bg-deep-navy text-platinum",
            medium: "bg-royal-navy/90 text-platinum",
        }[intensity];

        return (
            <section
                ref={ref}
                className={cn(bg, "relative py-24 md:py-32 px-6 md:px-12", className)}
            >
                {children}
            </section>
        );
    },
);

export default DarkFieldStage;
