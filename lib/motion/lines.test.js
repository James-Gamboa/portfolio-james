import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { MOTION_MEDIA } from "@/lib/motion/constants";
import { groupIndicesByLine, lineDelays } from "@/lib/motion/lines";

const require = createRequire(import.meta.url);

describe("groupIndicesByLine", () => {
  it("groups word indices that share a vertical offset", () => {
    expect(groupIndicesByLine([0, 0, 0, 40, 40, 80])).toEqual([
      [0, 1, 2],
      [3, 4],
      [5],
    ]);
  });

  it("tolerates sub-pixel differences within one line", () => {
    expect(groupIndicesByLine([0, 1, 0.5, 38, 39])).toEqual([
      [0, 1, 2],
      [3, 4],
    ]);
  });

  it("returns an empty list for no words", () => {
    expect(groupIndicesByLine([])).toEqual([]);
  });
});

describe("lineDelays", () => {
  it("staggers each line by the step", () => {
    expect(lineDelays(3, 0.1)).toEqual([0, 0.1, 0.2]);
  });

  it("caps the total delay so long headings do not drag", () => {
    expect(lineDelays(10, 0.1, 0.3)).toEqual([
      0, 0.1, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
    ]);
  });

  it("returns no delays for zero lines", () => {
    expect(lineDelays(0, 0.1)).toEqual([]);
  });
});

describe("MOTION_MEDIA", () => {
  it("uses the same breakpoints as tailwind screens", () => {
    const { screens } = require("../../tailwind.config.js").theme;
    expect(MOTION_MEDIA.tablet).toBe(`(min-width: ${screens.tablet})`);
    expect(MOTION_MEDIA.laptop).toBe(`(min-width: ${screens.laptop})`);
  });
});
