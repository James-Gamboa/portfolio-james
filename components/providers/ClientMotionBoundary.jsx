"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionContext } from "@/components/providers/motionContext";

const initialMotion = { reducedMotion: false, isReady: false };

/** Native smooth scroll used until the animation engine has loaded. */
const nativeScrollTo = (target, options = {}) => {
  const element = target?.current ?? target;
  if (typeof element === "number") {
    window.scrollTo({ top: element, behavior: "smooth" });
    return;
  }
  if (!(element instanceof Element)) return;
  const top =
    element.getBoundingClientRect().top +
    window.scrollY +
    (options.offset ?? 0);
  window.scrollTo({ top, behavior: "smooth" });
};

/**
 * Keeps the page tree stable and loads the GSAP/Lenis engine (MotionProvider)
 * only after the page has loaded and the browser is idle, so the animation
 * libraries never compete with first paint / LCP. The engine renders nothing
 * and publishes its state through this boundary's context.
 */
const ClientMotionBoundary = ({ children }) => {
  const [Engine, setEngine] = useState(null);
  const [engineState, setEngineState] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    let idleId;

    const load = () => {
      import("@/components/providers/MotionProvider").then((mod) => {
        if (!cancelled) setEngine(() => mod.default);
      });
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(load, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(load, 1200);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      window.clearTimeout(timeoutId);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollTo: nativeScrollTo,
      ...initialMotion,
      ...engineState,
    }),
    [engineState],
  );

  return (
    <MotionContext.Provider value={value}>
      {Engine ? <Engine onChange={setEngineState} /> : null}
      {children}
    </MotionContext.Provider>
  );
};

export default ClientMotionBoundary;
