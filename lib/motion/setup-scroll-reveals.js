import { gsap, ScrollTrigger } from "@/lib/motion/register-gsap";
import { MOTION } from "@/lib/motion/constants";

export const setupScrollReveals = () => {
  const targets = gsap.utils.toArray("[data-reveal]");
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
