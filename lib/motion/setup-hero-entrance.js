import { gsap } from "@/lib/motion/register-gsap";
import { MOTION } from "@/lib/motion/constants";

export const setupHeroEntrance = (lines) => {
  const validLines = lines.filter(Boolean);
  if (!validLines.length) return () => {};

  gsap.set(validLines, {
    opacity: 0,
    y: MOTION.hero.y,
    force3D: true,
  });

  const tween = gsap.to(validLines, {
    opacity: 1,
    y: 0,
    duration: MOTION.duration.slow,
    ease: MOTION.easeHero,
    stagger: MOTION.hero.stagger,
    delay: 0.08,
  });

  return () => tween.kill();
};
