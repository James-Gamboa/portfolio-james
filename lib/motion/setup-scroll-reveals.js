import { gsap, ScrollTrigger } from "@/lib/motion/register-gsap";
import { MOTION } from "@/lib/motion/constants";

export const setupScrollReveals = () => {
  // Elements already on screen stay visible: hiding them after first paint
  // would flash content that is part of the initial view.
  const viewportBottom = window.innerHeight * 0.88;
  const targets = gsap
    .utils.toArray("[data-reveal]")
    .filter((el) => el.getBoundingClientRect().top > viewportBottom);
  if (!targets.length) return () => {};

  gsap.set(targets, {
    opacity: 0,
    y: MOTION.reveal.y,
    force3D: true,
  });

  const batch = ScrollTrigger.batch(targets, {
    start: MOTION.reveal.start,
    once: true,
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: MOTION.duration.base,
        ease: MOTION.ease,
        stagger: MOTION.reveal.stagger,
        overwrite: true,
      });
    },
  });

  return () => {
    batch.forEach((trigger) => trigger.kill());
    gsap.set(targets, { clearProps: "opacity,transform" });
  };
};
