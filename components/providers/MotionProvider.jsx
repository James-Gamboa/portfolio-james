"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
} from "@/lib/motion/register-gsap";
import { setupScrollReveals } from "@/lib/motion/setup-scroll-reveals";
import { setupScrollMotion } from "@/lib/motion/setup-scroll-motion";
import { scrollNative, smoothBehavior } from "@/lib/motion/scrollNative";
import { MOBILE_MAX_WIDTH } from "@/lib/motion/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  consumeSavedScrollPosition,
  getCurrentScrollY,
  hasPendingScrollRestore,
  peekSavedScrollPosition,
  registerScrollPositionGetter,
} from "@/lib/utils/localeScroll";

const resolveScrollTarget = (target) => {
  if (typeof target === "number") return target;
  if (target instanceof Element) return target;
  if (typeof target === "string") return document.querySelector(target);
  if (target?.current instanceof Element) return target.current;
  return null;
};

/**
 * Headless animation engine (GSAP + Lenis + ScrollTrigger). Renders nothing;
 * ClientMotionBoundary mounts it lazily and receives its state via onChange.
 */
const MotionProvider = ({ onChange }) => {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef(null);
  const isReadyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    registerScrollPositionGetter(() => {
      const lenis = lenisRef.current;
      if (lenis) return lenis.scroll;
      return window.scrollY ?? document.documentElement.scrollTop ?? 0;
    });

    return () => registerScrollPositionGetter(null);
  }, []);

  const scrollTo = useCallback(
    (target, options = {}) => {
      const element = resolveScrollTarget(target);
      const offset = options.offset ?? 0;

      const lenis = lenisRef.current;
      if (reducedMotion || !lenis) {
        // Reduced motion, or no Lenis (mobile "lite" mode): native scroll that
        // handles numeric targets and honors the offset.
        const behavior =
          reducedMotion || options.immediate ? "auto" : smoothBehavior();
        scrollNative(element ?? target, { offset, behavior });
        return;
      }

      if (typeof target === "number") {
        lenis.scrollTo(target, {
          ...options,
          immediate: options.immediate ?? false,
        });
        return;
      }

      if (element instanceof Element) {
        lenis.scrollTo(element, { offset, ...options });
      }
    },
    [reducedMotion],
  );

  useEffect(() => {
    registerGsapPlugins();

    if (reducedMotion) {
      document.documentElement.dataset.motion = "reduced";
      isReadyRef.current = true;
      setIsReady(true);
      return;
    }

    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_MAX_WIDTH}px)`,
    ).matches;
    document.documentElement.dataset.motion = isMobile ? "lite" : "full";

    let lenis = null;
    let tickerCallback = null;
    let rafId = 0;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
    }

    rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      isReadyRef.current = true;
      setIsReady(true);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenis?.destroy();
      lenisRef.current = null;
      delete document.documentElement.dataset.motion;
      isReadyRef.current = false;
      setIsReady(false);
    };
  }, [reducedMotion]);

  // Reveals are (re)registered whenever the route changes: the provider lives
  // in the shared [lang] layout, so client navigation mounts new [data-reveal]
  // nodes without remounting the engine.
  useEffect(() => {
    if (!isReady || reducedMotion) return undefined;

    let cleanupReveals = () => {};
    let cleanupMotion = () => {};
    const rafId = requestAnimationFrame(() => {
      cleanupReveals = setupScrollReveals();
      cleanupMotion = setupScrollMotion();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupMotion();
      cleanupReveals();
    };
  }, [pathname, isReady, reducedMotion]);

  useLayoutEffect(() => {
    if (!isReady) return undefined;

    const savedScrollY = peekSavedScrollPosition();
    if (savedScrollY === null) return undefined;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 16;

    const restoreScroll = () => {
      if (cancelled) return;

      scrollTo(savedScrollY, { immediate: true });

      const lenis = lenisRef.current;
      lenis?.resize();

      const currentScrollY = getCurrentScrollY();
      const isRestored = Math.abs(currentScrollY - savedScrollY) < 4;

      if (isRestored || attempts >= maxAttempts) {
        consumeSavedScrollPosition();
        ScrollTrigger.refresh();
        return;
      }

      attempts += 1;
      requestAnimationFrame(restoreScroll);
    };

    restoreScroll();

    return () => {
      cancelled = true;
    };
  }, [pathname, isReady, scrollTo]);

  useEffect(() => {
    if (!isReady || reducedMotion) return;

    if (hasPendingScrollRestore()) return;

    const hash = window.location.hash;
    if (!hash) return;

    const element = document.querySelector(hash);
    if (!element) return;

    const timeoutId = window.setTimeout(() => {
      scrollTo(element, { offset: -80 });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [isReady, reducedMotion, scrollTo]);

  const value = useMemo(
    () => ({
      scrollTo,
      reducedMotion,
      isReady,
    }),
    [scrollTo, reducedMotion, isReady],
  );

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return null;
};

export default MotionProvider;
