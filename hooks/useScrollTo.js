"use client";

import { useMotion } from "@/components/providers/motionContext";

export const useScrollTo = () => {
  const { scrollTo, reducedMotion, isReady } = useMotion();
  return { scrollTo, reducedMotion, isReady };
};
