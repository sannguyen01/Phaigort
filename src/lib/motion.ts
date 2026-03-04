import { type Variants } from "framer-motion";

/**
 * Shared easing curve — custom cubic-bezier for smooth, organic motion.
 * Equivalent to [0.22, 1, 0.36, 1] — fast start, gentle deceleration.
 */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Fade-up animation variant for scroll-triggered reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

/** Stagger children variant for lists/grids. */
export const stagger = (staggerDelay = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

/** Simple fade variant (no Y movement). */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
};
