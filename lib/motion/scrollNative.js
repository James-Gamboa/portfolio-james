const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** "auto" when the user prefers reduced motion, "smooth" otherwise. */
export function smoothBehavior(win = window) {
  return win.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ? "auto" : "smooth";
}

const resolveElement = (target) => {
  const candidate = target?.current ?? target;
  return typeof candidate?.getBoundingClientRect === "function"
    ? candidate
    : null;
};

/**
 * Native (no Lenis) scroll for a number, an element or a ref. The offset is
 * applied to element targets, like Lenis does. Returns true when it scrolled.
 */
export function scrollNative(
  target,
  { offset = 0, behavior = "auto" } = {},
  win = window,
) {
  if (typeof target === "number") {
    win.scrollTo({ top: target, behavior });
    return true;
  }

  const element = resolveElement(target);
  if (!element) return false;

  const top = element.getBoundingClientRect().top + win.scrollY + offset;
  win.scrollTo({ top, behavior });
  return true;
}
