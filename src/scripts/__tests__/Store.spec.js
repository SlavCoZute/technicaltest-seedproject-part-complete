import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  it("should return all deals when no filters applied", () => {
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  it("should return 4 broadband only deals", () => {
    const sut = new Store();
    sut.setDeals(mockData.deals);
    sut.setProductFilter("broadband");

    const result = sut.deals;

    expect(result).toHaveLength(4)
  })
});
