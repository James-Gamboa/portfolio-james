import { groupIndicesByLine } from "@/lib/motion/lines";

/**
 * Splits a plain-text element into visual lines, each wrapped in an
 * overflow-hidden mask so the inner line can slide up from behind it.
 * Returns null when the element has markup (only text nodes are supported).
 * `revert()` restores the original text exactly.
 */
export const splitLines = (el) => {
  const hasMarkup = Array.from(el.childNodes).some(
    (node) => node.nodeType !== Node.TEXT_NODE,
  );
  const text = el.textContent.trim();
  if (hasMarkup || !text) return null;

  const original = el.textContent;
  const words = text.split(/\s+/);

  // Measure: one inline-block span per word, then group by vertical offset.
  el.textContent = "";
  const wordEls = words.map((word, i) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = word;
    el.append(span);
    if (i < words.length - 1) el.append(" ");
    return span;
  });
  const lines = groupIndicesByLine(wordEls.map((span) => span.offsetTop));

  // Rebuild as masked block lines.
  el.textContent = "";
  const inners = lines.map((indices) => {
    const mask = document.createElement("span");
    mask.setAttribute("aria-hidden", "true");
    mask.style.display = "block";
    mask.style.overflow = "hidden";
    // Padding keeps descenders inside the mask; the negative margin cancels it.
    mask.style.paddingBottom = "0.12em";
    mask.style.marginBottom = "-0.12em";

    const inner = document.createElement("span");
    inner.style.display = "block";
    inner.textContent = indices.map((i) => words[i]).join(" ");
    mask.append(inner);
    el.append(mask);
    return inner;
  });

  el.setAttribute("aria-label", text);

  return {
    inners,
    revert: () => {
      el.removeAttribute("aria-label");
      el.textContent = original;
    },
  };
};
