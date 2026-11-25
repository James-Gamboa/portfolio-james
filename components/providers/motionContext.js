"use client";

import { createContext, useContext } from "react";

const noop = () => {};

/**
 * Light context (no GSAP/Lenis imports) so components can read motion state
 * without pulling the animation engine into their own chunk.
 */
export const MotionContext = createContext({
  scrollTo: noop,
  reducedMotion: false,
  isReady: false,
});

export const useMotion = () => useContext(MotionContext);
