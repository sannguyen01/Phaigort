import { cn } from "@/lib/utils";

interface DarkFieldStageProps {
    children: React.ReactNode;
    className?: string;
    intensity?: "full" | "deep" | "medium";
}

export function DarkFieldStage({
    children,
    className,
    intensity = "full",
}: DarkFieldStageProps) {
    const bg = {
        full: "bg-royal-navy",
        deep: "bg-royal-navy/90",
        medium: "bg-royal-navy/75",
    }[intensity];

    return (
        <section
            className={cn(bg, "relative py-24 md:py-32 px-6 md:px-12", className)}
        >
            {children}
        </section>
    );
}

export default DarkFieldStage;
