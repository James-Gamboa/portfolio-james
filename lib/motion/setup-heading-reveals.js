import { gsap, ScrollTrigger } from "@/lib/motion/register-gsap";
import { MOTION } from "@/lib/motion/constants";
import { lineDelays } from "@/lib/motion/lines";
import { splitLines } from "@/lib/motion/splitLines";

const HEADINGS = "h2.section-title";

/**
 * Masked line-by-line heading reveal. Headings inside a [data-reveal] block
 * are skipped (the block already animates). The hidden state is applied here,
 * in JS, so the markup stays fully visible without it. Lines are measured
 * when the heading enters, so resizes before that never leave stale breaks.
 * Must be called inside a gsap context / matchMedia.
 */
export const setupHeadingReveals = () => {
  const viewportBottom = window.innerHeight * 0.88;
  const headings = gsap.utils
    .toArray(HEADINGS)
    .filter(
      (el) =>
        !el.closest("[data-reveal]") &&
        el.getBoundingClientRect().top > viewportBottom,
    );
  if (!headings.length) return () => {};

  const splits = [];
  gsap.set(headings, { opacity: 0 });

  const triggers = headings.map((heading) =>
    ScrollTrigger.create({
      trigger: heading,
      start: MOTION.reveal.start,
      once: true,
      onEnter: () => {
        const split = splitLines(heading);
        if (!split) {
          gsap.to(heading, {
            opacity: 1,
            duration: MOTION.duration.base,
            ease: MOTION.ease,
          });
          return;
        }
        splits.push(split);

        const delays = lineDelays(split.inners.length, 0.09, 0.27);
        gsap.set(split.inners, { yPercent: 110 });
        gsap.set(heading, { opacity: 1 });
        gsap.to(split.inners, {
          yPercent: 0,
          duration: MOTION.duration.slow,
          ease: MOTION.easeHero,
          delay: (i) => delays[i],
          onComplete: () => {
            // Back to plain text so later resizes reflow naturally.
            if (!splits.includes(split)) return;
            split.revert();
            splits.splice(splits.indexOf(split), 1);
          },
        });
      },
    }),
  );

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    splits.forEach((split) => {
      gsap.killTweensOf(split.inners);
      split.revert();
    });
    splits.length = 0;
    gsap.set(headings, { clearProps: "opacity" });
  };
};
