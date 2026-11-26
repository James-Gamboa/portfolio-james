import { gsap, ScrollTrigger } from "@/lib/motion/register-gsap";
import { MOTION } from "@/lib/motion/constants";
import { willChangeWhileActive } from "@/lib/motion/setup-hero-scrub";

const CLIP_HIDDEN = "inset(10% 0% 0% 0% round 24px)";
const CLIP_SHOWN = "inset(0% 0% 0% 0% round 24px)";

/**
 * Project cards: staggered reveal per row (ScrollTrigger.batch) and, when
 * `rich` (tablet and up), a clip-path wipe plus image parallax inside the card
 * frame. Mobile keeps the light opacity/translate reveal only.
 * Must be called inside a gsap context.
 */
export const setupCardMotion = ({ rich }) => {
  const viewportBottom = window.innerHeight * 0.88;
  const cards = gsap.utils
    .toArray("[data-card-reveal]")
    .filter((el) => el.getBoundingClientRect().top > viewportBottom);

  if (cards.length) {
    gsap.set(
      cards,
      rich
        ? { opacity: 0, y: 36, clipPath: CLIP_HIDDEN }
        : { opacity: 0, y: 20 },
    );

    ScrollTrigger.batch(cards, {
      start: MOTION.reveal.start,
      once: true,
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          ...(rich ? { clipPath: CLIP_SHOWN } : {}),
          duration: rich ? MOTION.duration.slow : MOTION.duration.base,
          ease: MOTION.ease,
          stagger: MOTION.reveal.stagger * 1.5,
          overwrite: true,
          // Drop the clip so hover lift and focus rings are never cut off.
          onComplete: () =>
            gsap.set(elements, { clearProps: "clipPath,opacity,transform" }),
        });
      },
    });
  }

  if (!rich) return;

  // Image parallax: the layer is scaled up inside the overflow-hidden frame
  // and drifts vertically, so no edge is ever exposed.
  gsap.utils.toArray("[data-parallax]").forEach((layer) => {
    gsap.fromTo(
      layer,
      { yPercent: -6, scale: 1.14 },
      {
        yPercent: 6,
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: layer.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
          ...willChangeWhileActive(layer, "transform"),
        },
      },
    );
  });
};
