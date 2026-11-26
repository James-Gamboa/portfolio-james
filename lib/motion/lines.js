/**
 * Groups word indices into visual lines from each word's vertical offset.
 * Words whose offsets differ by less than `tolerance` px share a line.
 */
export const groupIndicesByLine = (tops, tolerance = 2) => {
  const lines = [];
  let lineTop = null;

  tops.forEach((top, index) => {
    if (lineTop === null || Math.abs(top - lineTop) > tolerance) {
      lines.push([index]);
      lineTop = top;
    } else {
      lines[lines.length - 1].push(index);
    }
  });

  return lines;
};

/** Per-line start delays (seconds), capped so long headings never drag. */
export const lineDelays = (count, step, max = Infinity) =>
  Array.from({ length: count }, (_, i) => Math.min(i * step, max));
