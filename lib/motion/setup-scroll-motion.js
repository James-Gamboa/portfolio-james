import { gsap } from "@/lib/motion/register-gsap";
import { MOTION_MEDIA } from "@/lib/motion/constants";
import { setupCardMotion } from "@/lib/motion/setup-card-motion";
import { setupHeadingReveals } from "@/lib/motion/setup-heading-reveals";
import { setupHeroScrub } from "@/lib/motion/setup-hero-scrub";
import { setupPinnedIntro } from "@/lib/motion/setup-pinned-intro";

/**
 * Cinematic scroll effects. Everything lives in one gsap.matchMedia so each
 * tween / ScrollTrigger is reverted when a breakpoint stops matching, when
 * reduced motion turns on, or when the caller cleans up (route change).
 *
 * - all sizes (motion allowed): masked heading reveals, light card reveals
 * - tablet and up: hero scrub, card clip reveals, image parallax
 * - laptop and up: the layered featured-projects intro (no pin)
 *
 * Creation order follows page order.
 */
export const setupScrollMotion = () => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      allowed: "(prefers-reduced-motion: no-preference)",
      tablet: MOTION_MEDIA.tablet,
      laptop: MOTION_MEDIA.laptop,
    },
    (context) => {
      const { allowed, tablet, laptop } = context.conditions;
      if (!allowed) return undefined;

      if (tablet) setupHeroScrub();
      if (laptop) setupPinnedIntro();
      const revertHeadings = setupHeadingReveals();
      setupCardMotion({ rich: tablet });

      return () => revertHeadings();
    },
  );

  return () => mm.revert();
};
