import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  // Arrange
  const sut = new Store();
  sut.setDeals(mockData.deals);

  it("should return all deals when no filters applied", () => {


    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  it("should return 4 broadband only deals", () => {
    sut.setProductFilter("broadband");

    const result = sut.deals;

    expect(result).toHaveLength(4)
  });

  it("should return 4 broadband and tv only deals", () => {
    sut.setProductFilter("tv");

    const result = sut.deals;

    expect(result).toHaveLength(4);
  });

  it("should return 1 broadband and mobile only deals", () => {
    sut.setProductFilter("tv");
    sut.setProductFilter("mobile");

    const result = sut.deals;

    expect(result).toHaveLength(1);
  });
});
