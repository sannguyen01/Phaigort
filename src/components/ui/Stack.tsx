import { cn } from "@/lib/utils";

type StackGap = "sm" | "md" | "lg" | "xl";

const gaps: Record<StackGap, string> = {
    sm: "gap-4",
    md: "gap-8",
    lg: "gap-16",
    xl: "gap-24",
};

interface StackProps {
    children: React.ReactNode;
    gap?: StackGap;
    className?: string;
}

export function Stack({ children, gap = "md", className }: StackProps) {
    return (
        <div className={cn("flex flex-col", gaps[gap], className)}>
            {children}
        </div>
    );
}

export default Stack;
