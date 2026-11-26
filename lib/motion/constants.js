export const MOTION = {
  ease: "power3.out",
  easeHero: "power4.out",
  duration: {
    fast: 0.45,
    base: 0.75,
    slow: 1.05,
  },
  reveal: {
    y: 28,
    stagger: 0.08,
    start: "top 88%",
  },
};

export const MOBILE_MAX_WIDTH = 768;

/** Keep in sync with the tablet/laptop screens in tailwind.config.js. */
export const MOTION_MEDIA = {
  tablet: "(min-width: 768px)",
  laptop: "(min-width: 1024px)",
};
