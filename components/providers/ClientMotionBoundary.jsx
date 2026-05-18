"use client";

import { useEffect, useState } from "react";

/**
 * Mounts MotionProvider only after hydration so GSAP/Lenis
 * are never required from a missing .next/server vendor chunk.
 */
const ClientMotionBoundary = ({ children }) => {
  const [MotionProvider, setMotionProvider] = useState(null);

  useEffect(() => {
    let cancelled = false;

    import("@/components/providers/MotionProvider").then((mod) => {
      if (!cancelled) {
        setMotionProvider(() => mod.default);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!MotionProvider) {
    return children;
  }

  return <MotionProvider>{children}</MotionProvider>;
};

export default ClientMotionBoundary;
