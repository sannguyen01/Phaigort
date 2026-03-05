export const prefersReducedMotion =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" },
    },
};

export const fade = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" },
    },
};

export const stagger = (delay: number = 0.12) => ({
    hidden: {},
    visible: {
        transition: { staggerChildren: prefersReducedMotion ? 0 : delay },
    },
});

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
};

