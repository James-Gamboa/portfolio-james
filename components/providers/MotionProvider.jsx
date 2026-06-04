"use client";

import {
  createContext,
  useCallback,
  useContext,
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
import { MOBILE_MAX_WIDTH } from "@/lib/motion/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  consumeSavedScrollPosition,
  getCurrentScrollY,
  hasPendingScrollRestore,
  peekSavedScrollPosition,
  registerScrollPositionGetter,
} from "@/lib/utils/localeScroll";

const MotionContext = createContext({
  scrollTo: () => {},
  reducedMotion: false,
  isReady: false,
});

export const useMotion = () => useContext(MotionContext);

const resolveScrollTarget = (target) => {
  if (typeof target === "number") return target;
  if (target instanceof Element) return target;
  if (typeof target === "string") return document.querySelector(target);
  if (target?.current instanceof Element) return target.current;
  return null;
};

const MotionProvider = ({ children }) => {
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

      if (reducedMotion) {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "auto" });
          return;
        }
        if (element instanceof Element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: "auto" });
        }
        return;
      }

      const lenis = lenisRef.current;
      if (!lenis) {
        if (element instanceof Element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
    let cleanupReveals = () => {};

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

    requestAnimationFrame(() => {
      cleanupReveals = setupScrollReveals();
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
      cleanupReveals();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenis?.destroy();
      lenisRef.current = null;
      delete document.documentElement.dataset.motion;
      isReadyRef.current = false;
      setIsReady(false);
    };
  }, [reducedMotion]);

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

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
};

export default MotionProvider;
