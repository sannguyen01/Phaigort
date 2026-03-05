export const prefersReducedMotion =
    typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

export const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" },
    },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
};
