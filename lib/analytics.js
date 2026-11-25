import { track } from "@vercel/analytics";

/** Conversion events tracked with cookie-less Vercel Web Analytics. */
export const EVENTS = {
  cvDownload: "cv_download",
  contact: "contact_click",
  linkedin: "linkedin_click",
  github: "github_click",
};

/** Safe wrapper: analytics must never break a click. */
export function trackEvent(name, props) {
  try {
    track(name, props);
  } catch {
    // Analytics is best effort.
  }
}

/** Map a social link title (from the portfolio data) to its event. */
export function eventForSocial(title) {
  switch (String(title).toLowerCase()) {
    case "linkedin":
      return EVENTS.linkedin;
    case "github":
      return EVENTS.github;
    case "email":
      return EVENTS.contact;
    default:
      return null;
  }
}
