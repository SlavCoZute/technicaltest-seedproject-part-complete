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
    sut.state.productFilters = ["tv", "broadband"];

    const result = sut.deals;

    expect(result).toHaveLength(4);
  });

  it("should return 1 broadband and mobile only deals", () => {
    sut.state.productFilters = ["mobile", "broadband"];

    const result = sut.deals;

    expect(result).toHaveLength(1);
  });

  it("should return 1 deal from Sky provider", () => {
    sut.state.productFilters = [];
    sut.setProviderFilter(1);

    const result = sut.deals;

    expect(result).toHaveLength(1);
  });

  it("should return 2 deals from BT provider for broadband and tv only", () => {
    sut.state.productFilters = ["broadband", "tv"];
    sut.setProviderFilter(3);

    const result = sut.deals;

    expect(result).toHaveLength(2);
  })
});
