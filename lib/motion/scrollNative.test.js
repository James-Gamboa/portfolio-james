import { describe, expect, it, vi } from "vitest";
import { scrollNative, smoothBehavior } from "@/lib/motion/scrollNative";

const makeWindow = ({ scrollY = 0, reduced = false } = {}) => ({
  scrollY,
  scrollTo: vi.fn(),
  matchMedia: vi.fn(() => ({ matches: reduced })),
});

const makeElement = (top) => ({ getBoundingClientRect: () => ({ top }) });

describe("smoothBehavior", () => {
  it("is smooth by default", () => {
    expect(smoothBehavior(makeWindow())).toBe("smooth");
  });

  it("is auto when the user prefers reduced motion", () => {
    expect(smoothBehavior(makeWindow({ reduced: true }))).toBe("auto");
  });

  it("is smooth when matchMedia is unavailable", () => {
    expect(smoothBehavior({})).toBe("smooth");
  });
});

describe("scrollNative", () => {
  it("scrolls to a numeric target (no Lenis, mobile)", () => {
    const win = makeWindow();
    expect(scrollNative(480, { behavior: "auto" }, win)).toBe(true);
    expect(win.scrollTo).toHaveBeenCalledWith({ top: 480, behavior: "auto" });
  });

  it("applies the offset to element targets", () => {
    const win = makeWindow({ scrollY: 300 });
    scrollNative(makeElement(200), { offset: -80, behavior: "smooth" }, win);
    expect(win.scrollTo).toHaveBeenCalledWith({ top: 420, behavior: "smooth" });
  });

  it("accepts a ref-like target", () => {
    const win = makeWindow();
    scrollNative({ current: makeElement(100) }, { offset: -10 }, win);
    expect(win.scrollTo).toHaveBeenCalledWith({ top: 90, behavior: "auto" });
  });

  it("does nothing for an unresolved target", () => {
    const win = makeWindow();
    expect(scrollNative(null, {}, win)).toBe(false);
    expect(scrollNative({ current: null }, {}, win)).toBe(false);
    expect(win.scrollTo).not.toHaveBeenCalled();
  });
});
