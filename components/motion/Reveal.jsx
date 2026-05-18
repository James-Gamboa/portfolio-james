"use client";

import { forwardRef } from "react";
import { cn } from "@/components/lib/utils";

/** SSR-safe scroll reveal — animated via MotionProvider + [data-reveal] */
const Reveal = forwardRef(
  ({ as: Tag = "section", className, children, ...props }, ref) => {
    return (
      <Tag ref={ref} data-reveal="" className={cn(className)} {...props}>
        {children}
      </Tag>
    );
  },
);

Reveal.displayName = "Reveal";

export default Reveal;
