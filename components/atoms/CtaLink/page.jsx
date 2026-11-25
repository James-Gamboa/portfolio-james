"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/components/lib/utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 tablet:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60";

const variants = {
  primary: "bg-white text-black hover:bg-white/85",
  secondary:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

/**
 * Call-to-action link with optional conversion tracking. Plain <a> so
 * downloads and mailto links work without client navigation.
 */
const CtaLink = ({
  href,
  children,
  variant = "secondary",
  event,
  eventProps,
  download = false,
  external = false,
  className,
}) => (
  <a
    href={href}
    className={cn(base, variants[variant], className)}
    onClick={event ? () => trackEvent(event, eventProps) : undefined}
    {...(download ? { download: "" } : {})}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </a>
);

export default CtaLink;
