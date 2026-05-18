import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export const registerGsapPlugins = () => {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
};

export { gsap, ScrollTrigger, useGSAP };
