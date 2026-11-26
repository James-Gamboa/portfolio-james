import { gsap } from "@/lib/motion/register-gsap";

/** will-change only while the trigger is active, never permanently. */
export const willChangeWhileActive = (el, props = "transform, opacity") => ({
  onToggle: (self) => {
    el.style.willChange = self.isActive ? props : "auto";
  },
});

/**
 * Scroll-scrubbed hero exit: the text block drifts down slower than the page
 * and dims, while the facts panel eases back with a slight scale-down. Nothing
 * is applied until the user scrolls (immediateRender: false), so the LCP text
 * and the first paint are untouched. Must be called inside a gsap context.
 */
export const setupHeroScrub = () => {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  const scrollTrigger = {
    trigger: hero,
    start: "top top",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true,
  };

  gsap.fromTo(
    hero,
    { y: 0, opacity: 1 },
    {
      y: 70,
      opacity: 0.3,
      ease: "none",
      immediateRender: false,
      scrollTrigger: { ...scrollTrigger, ...willChangeWhileActive(hero) },
    },
  );

  const facts = hero.querySelector("[data-hero-facts]");
  if (!facts) return;

  gsap.fromTo(
    facts,
    // No clip-path here: clipping the panel cut its edge figures mid-scroll.
    { scale: 1 },
    {
      scale: 0.96,
      transformOrigin: "50% 0%",
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        ...scrollTrigger,
        ...willChangeWhileActive(facts, "transform"),
      },
    },
  );
};
