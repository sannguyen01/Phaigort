"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom diamond cursor — replaces the default cursor on pointer-capable desktops.
 * Small rotated square that trails the mouse with spring physics.
 * Scales up when hovering interactive elements.
 */
export function DiamondCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 600, damping: 35, mass: 0.25 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 35, mass: 0.25 });

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function onMouseEnterInteractive() {
      setHovered(true);
    }

    function onMouseLeaveInteractive() {
      setHovered(false);
    }

    function onDocumentLeave() {
      setVisible(false);
    }

    const interactives = document.querySelectorAll<HTMLElement>(
      "a, button, [role='button'], label, input, select, textarea",
    );

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onDocumentLeave);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onDocumentLeave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [cursorX, cursorY, visible]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovered ? 1.8 : 1,
      }}
      transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 400, damping: 25 } }}
    >
      <div
        className="h-2.5 w-2.5 rotate-45 border border-coral/80 bg-coral/20 shadow-[0_0_10px_rgba(255,107,74,0.35)]"
        style={{ transition: "background 200ms" }}
      />
    </motion.div>
  );
}
