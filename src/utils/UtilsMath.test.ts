import { roundUp } from "./UtilsMath";

describe("UtilsMath", () => {
  it("roundUp - it should be arrount nearest 0.05 ", () => {
    expect(roundUp(2.375)).toEqual(2.4);
  });

  it("roundUp - it should be arrount nearest 0.05", () => {
    expect(roundUp(0.5625)).toEqual(0.6);
  });
});
