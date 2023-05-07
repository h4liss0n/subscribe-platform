import { arroundNumber } from "./UtilsMath";

describe("arroundNumber", () => {
  it("arroundNumber - ", () => {   
    expect(arroundNumber(2.375)).toEqual(2.4);
  });

  it("arroundNumber - ", () => {   
    expect(arroundNumber(0.5625)).toEqual(0.6);
  });
  

});
