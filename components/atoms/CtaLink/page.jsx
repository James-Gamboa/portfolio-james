"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/components/lib/utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,filter,transform] duration-200 tablet:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

const variants = {
  primary: "bg-white text-ink hover:bg-white/85",
  // Brand gradient: reserved for the main conversion action (Download CV).
  brand:
    "bg-brand-gradient font-semibold text-ink shadow-[0_8px_30px_-8px_rgb(var(--brand-pink)/0.55)] hover:brightness-110 motion-safe:hover:-translate-y-0.5",
  secondary:
    "border border-white/20 bg-white/[0.03] text-content hover:border-white/45 hover:bg-white/10",
  ghost: "text-content-muted hover:text-content",
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
