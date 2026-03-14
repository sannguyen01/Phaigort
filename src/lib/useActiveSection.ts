"use client";

import { useState, useEffect } from "react";

const SECTION_NAV_MAP: Record<string, string> = {
  story: "/our-story",
  collections: "/collections",
};

export function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const ids = Object.keys(SECTION_NAV_MAP);
    const observers: IntersectionObserver[] = [];

    const visible = new Map<string, boolean>();
    ids.forEach((id) => visible.set(id, false));

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting);
          const firstVisible = ids.find((sId) => visible.get(sId));
          setActive(firstVisible ? SECTION_NAV_MAP[firstVisible] : null);
        },
        { rootMargin: "-30% 0px -30% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [enabled]);

  return active;
}
