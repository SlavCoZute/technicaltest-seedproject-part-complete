import {normalize} from "../utils";


describe("utils", () => {
  describe("normalize", () => {
    const testData = ["Hello", "World"];
    it("should return an array of normalized items, all lowe-case", () => {
      const testFunction = normalize;

      const result = testFunction(testData);

      expect(result).toEqual(["hello", "world"]);

    });
  });
});
