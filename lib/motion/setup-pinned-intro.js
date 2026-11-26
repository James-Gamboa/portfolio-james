import { gsap } from "@/lib/motion/register-gsap";

/**
 * Layered intro for the featured projects: as it scrolls through the
 * viewport its layers move at different rates (subtitle rises in, eyebrow and
 * heading drift). It is intentionally NOT pinned: pinning left a near-empty
 * screen under the heading and its pin spacer caused a layout shift (CLS).
 * Desktop only; the caller guards the breakpoint. Must be called inside a gsap
 * context.
 */
export const setupPinnedIntro = () => {
  const intro = document.querySelector("[data-pin-intro]");
  if (!intro) return;

  const eyebrow = intro.querySelector("[data-pin-eyebrow]");
  const title = intro.querySelector("[data-pin-title]");
  const body = intro.querySelector("[data-pin-body]");

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: intro,
      start: "top 85%",
      end: "top 25%",
      scrub: true,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        intro.style.willChange = self.isActive ? "transform, opacity" : "auto";
      },
    },
  });

  if (body) {
    timeline.fromTo(
      body,
      { opacity: 0.15, y: 28 },
      { opacity: 1, y: 0, duration: 0.5 },
      0,
    );
  }
  if (eyebrow) timeline.fromTo(eyebrow, { y: 0 }, { y: -14, duration: 1 }, 0);
  if (title) {
    timeline.fromTo(title, { yPercent: 0 }, { yPercent: -8, duration: 1 }, 0);
  }
};
