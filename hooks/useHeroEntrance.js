"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/register-gsap";
import { setupHeroEntrance } from "@/lib/motion/setup-hero-entrance";
import { useMotion } from "@/components/providers/MotionProvider";

export const useHeroEntrance = () => {
  const scopeRef = useRef(null);
  const { reducedMotion, isReady } = useMotion();

  useGSAP(
    () => {
      if (!isReady || reducedMotion || !scopeRef.current) return;

      const lines = gsap.utils.toArray("[data-hero-line]", scopeRef.current);
      return setupHeroEntrance(lines);
    },
    { scope: scopeRef, dependencies: [isReady, reducedMotion] },
  );

  return scopeRef;
};
